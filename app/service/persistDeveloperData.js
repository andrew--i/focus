let axios = require('axios');

async function main() {
  // define needed columns
  // await makeQuery('create table dfs.focus.developer as select * from dfs.focus.`builders`');
  // await makeQuery('create table dfs.focus.developer_info as select * from dfs.focus.`builders_info`');
  // await makeQuery('create table dfs.focus.regions as select * from dfs.focus.`regions` where disabled=false\n');
}

async function makeQuery(query) {
  await axios.post('http://localhost:8047/query.json', {
    queryType: 'SQL',
    query: query
  })
}

main().then(console.log);
