'use strict';

let repository = require('./../repository/repository');

exports.getAll = async (req, res, next) => {
  let regions = await repository.getRegions();
  res.status(200).json({regions: regions});
};

exports.getDevelopers = async (req, res, next) => {
  let developerName = req.query.developer;
  let limit = getLimit(req.query.limit);

  let id = req.params.id;
  if (!id)
    res.status(400);
  else {
    let developers = await repository.getRegion(id, developerName, limit, req.query.best);
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
