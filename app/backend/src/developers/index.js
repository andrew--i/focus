'use strict';

let repository = require('./../repository/repository');


exports.findDevelopers = async (req, res, next) => {
  let developerName = req.query.developer;
  let limit = getLimit(req.query.limit);

  let id = req.query.regionId;
  if (!id || id.trim().length === 0)
    res.status(400);
  else {
    let developers = await repository.getDevelopers(id, developerName, limit, req.query.best);
    res.status(200).json({developers: developers});
  }
};

function getLimit(queryLimit) {
  let limit = 8;
  if (queryLimit)
    try {
      limit = parseInt(queryLimit)
    } catch (e) {

    }
  if (limit > 16)
    limit = 16;
  return limit;
}
