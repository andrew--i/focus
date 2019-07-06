let axios = require('axios');

async function makeQuery(query) {
  let response = await axios.post('http://localhost:8047/query.json', {
    queryType: 'SQL',
    query: query
  });
  return response.data
}


async function getRegions() {
  let regions = await makeQuery('select * from dfs.focus.`regions`');
  return regions.rows;
}


module.exports = {
  getRegions: getRegions
};
