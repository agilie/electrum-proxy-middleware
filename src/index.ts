import 'reflect-metadata';
import {AsyncRouter} from 'express-async-router';

const defineElectrumClient = require('./electrum-client/define-electrum-client');

const asyncRouter = AsyncRouter();

asyncRouter.use(defineElectrumClient);

asyncRouter.use('/server', require('./server'));
asyncRouter.use('/transaction', require('./transaction'));
asyncRouter.use('/address', require('./address'));
asyncRouter.use('/block', require('./block'));
asyncRouter.use('/blockchain', require('./blockchain'));
asyncRouter.use('/scripthash', require('./scripthash'));
asyncRouter.use('/mempool', require('./mempool'));
asyncRouter.use('/history', require('./history'));

export const router = asyncRouter;
