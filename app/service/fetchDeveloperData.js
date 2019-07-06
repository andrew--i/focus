const DATA_DIR = __dirname + '/../docker/data';
const REGIONS_DIR = DATA_DIR + '/regions';
const BUILDERS_DIR = DATA_DIR + '/builders';
const BUILDERS_INFO_DIR = DATA_DIR + '/builders_info';
const fs = require('fs');
const parser = require('xml2json');
const axios = require('axios');


if (!fs.existsSync(DATA_DIR))
  fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(REGIONS_DIR))
  fs.mkdirSync(REGIONS_DIR);
if (!fs.existsSync(BUILDERS_DIR))
  fs.mkdirSync(BUILDERS_DIR);
if (!fs.existsSync(BUILDERS_INFO_DIR))
  fs.mkdirSync(BUILDERS_INFO_DIR);

async function grabRegions() {
  let files = fs.readdirSync(REGIONS_DIR);
  if (files.length > 0)
    return;

  let buildings = await getData('https://erzrf.ru/erz-rest/api/v1/global/dictionary?type=buildings_regions');
  fs.writeFileSync([REGIONS_DIR, 'regions.json'].join('/'), JSON.stringify(buildings));
}


async function grabBuilders() {

  let regions = JSON.parse(fs.readFileSync([REGIONS_DIR, 'regions.json'].join('/')));

  let regionsSize = regions.length;
  let index = 0;
  for (const region of regions) {
    index++;
    if (region.disabled)
      continue;
    await grabBuilder(region);
    console.log(`process ${index}/${regionsSize}`);
  }
}

async function grabBuilder(region) {

  let buildersPath = [BUILDERS_DIR, region.id + '.json'].join('/');
  if (fs.existsSync(buildersPath))
    return;

  let id = region.id;
  let itemsPerPage = 100;
  let page = 0;

  let builders = [];

  while (true) {
    let min = 1 + page * itemsPerPage;
    let max = (1 + page) * itemsPerPage;
    let url = `https://erzrf.ru/erz-rest/api/v1/brand/join?regionKey=${id}&costType=1&min=${min}&max=${max}`;

    let data = await getData(url);

    if (data) {
      let jsonData;
      if (data.list) {
        jsonData = {
          BrandsWithSeo: {
            list: data
          }
        }
      } else {
        jsonData = JSON.parse(parser.toJson(data.toString()));
      }

      let result = [];
      try {
        result = jsonData.BrandsWithSeo.list.list;
      } catch (e) {
        console.log('could not find builders for region ' + region.id)
      }
      if (result.pop) {
        for (const item of result) {
          builders.push(item);
        }
        if (result.length < itemsPerPage)
          break;
      } else {
        builders.push(result);
        break
      }
      page++;
      fs.writeFileSync(buildersPath, JSON.stringify(builders));
    } else {
      console.log('could not find builders for region ' + region.id);
      break;
    }
  }
}

async function grabBuildersInfo() {

  let files = fs.readdirSync(BUILDERS_DIR);
  let uris = [];

  for (const file of files) {

    let regionBuilders = JSON.parse(fs.readFileSync([BUILDERS_DIR, file].join('/')));

    for (const builder of regionBuilders) {
      if (!builder.urlId) {
        console.log('could not get urlId for builder with id ' + builder.id);
        continue;
      }
      if (builder.urlId.indexOf('-') === 0)
        builder.urlId = builder.urlId.substring(1);
      uris.push(builder.urlId)
    }
  }

  for (const uri of uris) {
    await grabBuilderInfo(uri);
  }
}

async function grabBuilderInfo(uri) {
  let path = [BUILDERS_INFO_DIR, uri].join('/') + '.json';
  if (fs.existsSync(path))
    return;

  let url = `https://erzrf.ru/erz-rest/api/v1/brand/${uri}`;
  let data = await getData(url);

  if (data == null) {
    console.log('could not get builder info ' + uri);
    return;
  }
  let jsonData;
  if (data.address) {
    jsonData = {
      Brand: data
    }
  } else
    jsonData = JSON.parse(parser.toJson(data.toString()));
  fs.writeFileSync(path, JSON.stringify(jsonData.Brand));
}

async function getData(url) {
  let response = await axios.get(url);
  return response.data;
}

async function main() {
  await grabRegions();
  await grabBuilders();
  await grabBuildersInfo();
}


main().then(console.log);
