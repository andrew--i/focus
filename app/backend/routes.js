'use strict';

const router = require('express').Router();
const middleware = require('./src/middleware');
const errors = require('./src/errors');
const healthRouter = require('./src/health/router');

// Wire up middleware
router.use(middleware.doSomethingInteresting);

// Wire up routers
router.use('/health', healthRouter);
router.use('/tasks', require('./src/regions/router'));

// Wire up error-handling middleware
router.use(errors.errorHandler);
router.use(errors.nullRoute);

// Export the router
module.exports = router;
