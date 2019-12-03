import request from 'supertest';
import express from 'express';
import {router} from '../../src';
import {CoinType} from '../../src/service/wallet/types/coin.type';

const app: any = express();
const {ElectrumClient, overrideClient} = require('../../src/electrum-client/electrum_client');
const originalElectrumClient = ElectrumClient;

class MockElectrumClient {

    connect() {
        return;
    }

    close() {
        return;
    }

    blockchainEstimatefee(number: number) {
        return Promise.resolve(0.000201);
    }

    blockchain_relayfee() {
        return Promise.resolve(0.00001);
    }

}

describe('Blockchain methods', function() {

    beforeAll(function() {
        app.use(router);
    });

    beforeEach(function() {
        overrideClient(MockElectrumClient);
    });

    afterAll(function() {
        overrideClient(originalElectrumClient);
    });

    function options(params = {}) {
        return {
            coinType: CoinType.BTC,
            ...params
        };
    }

    it('return the estimated transaction fee per kilobyte for a transaction to be confirmed within a certain number of blocks', async function() {
        await request(app).get('/blockchain/estimatefee')
            .query(options({blocks: 5}))
            .expect(200)
            .expect({'status': 'success', 'result': 0.000201});
    });

    it('return the minimum fee a low-priority transaction must pay in order to be accepted to the daemon’s memory pool', async function() {
        await request(app).get('/blockchain/relayfee')
            .query(options({blocks: 5}))
            .expect(200)
            .expect({'status': 'success', 'result': 0.00001});
    });

});
