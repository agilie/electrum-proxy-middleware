import request from 'supertest';
import express from 'express';
import {router} from '../../src';

const app: any = express();
const {ElectrumClient, overrideClient} = require('../../src/electrum-client/electrum_client');
let originalElectrumClient = ElectrumClient;
class MockElectrumClient {

    connect(){
        return
    }

    close(){
        return
    }
    mempool_getFeeHistogram() {
        return Promise.resolve([[99,121398],
            [98,128245],[59,141390],
            [45,92447],[36,136348],
            [30,166493],[25,205960],
            [23,176537],[19,318423],
            [18,175663],[16,230282],
            [14,284033],[11,813726],
            [10,133802],[9,528720],
            [8,74020],[5,779732],
            [4,179452],[2,1712676],[1,1946317]]);
    }

}


describe('Mempool methods', function() {

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
            coinType: 'btc',
            ...params
        };
    }

    it('return a histogram of the fee rates paid by transactions in the memory pool, weighted by transaction size', async function() {
        await request(app)
            .get('/mempool/get_fee_histogram')
            .query(options())
            .expect(200)
            .expect(    {"status":"success","result":[[99,121398],[98,128245],[59,141390],[45,92447],[36,136348],
                    [30,166493],[25,205960],[23,176537],[19,318423],[18,175663],[16,230282],[14,284033],
                    [11,813726],[10,133802],[9,528720],[8,74020],[5,779732],[4,179452],[2,1712676],[1,1946317]]});
    });
});



