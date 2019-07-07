let axios = require('axios');

async function makeQuery(query) {
  let response = await axios.post('http://localhost:8047/query.json', {
    queryType: 'SQL',
    query: query
  });
  return response.data
}


async function getRegions() {
  try {
    let response = await makeQuery('select id,text from dfs.focus.`regions` where disabled=false');
    return response.rows;
  }catch (e) {
    return [];
  }
}

async function getDevelopers(id, developers, limit, best) {
  let query = 'select id, name, ' +
    'coalesce(rating,0.0) rating, ' +
    'minApartmentCostM2 minPriceM2, ' +
    'foundationYear,' +
    'shareRegionPercent regionPercent ' +
    'from dfs.focus.`/builders/' + id + '.json`';

  if (developers && developers.trim().length > 0) {
    query += " where lower(name) like '%" + developers + "%'";
  }
  if(best)
    query += " order by coalesce(rating,0.0) desc ";
  else
    query += " order by coalesce(rating,0.0) ";

  query += ", shareRegionPercent desc limit " + limit;
  let response = await makeQuery(query);

  return response.rows;
}


module.exports = {
  getRegions: getRegions,
  getDevelopers: getDevelopers
};
