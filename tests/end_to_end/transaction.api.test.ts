import request from 'supertest';
import express from 'express';
import {router} from '../../src';

const app: any = express();
const {ElectrumClient, overrideClient} = require('../../src/electrum-client/electrum_client');
let originalElectrumClient = ElectrumClient;

class MockElectrumClient {

    connect() {
        return;
    }

    close() {
        return;
    }

    blockchainTransaction_get() {
        return Promise.resolve('0100000001a64a43a90cc604a09f2b82fbaa' +
            '7792c9d747063f21c56d924c43ec13e07e69ca05000000' +
            '6b483045022100955b61c1731a1e996558462124f9da29c6c' +
            'e1ab6d71f73e872524e783ef6e9402207b0ecc9130bc385d2e88f29' +
            'b1095135ae76e581a2e855de763455797f8e483480121039fe71e7c19502' +
            '5b193f0255f5c5555be7eab8c6dac66dbfb3c2dff90bbe6565dffffffff0550c' +
            '30000000000001976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac50c3' +
            '0000000000001976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac50c30000' +
            '000000001976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac50c30000000000001' +
            '976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac40c84c00000000001976a9142d' +
            '37ceaf73a2d831a550d06d03ffa4f5c53fade188ac00000000');
    }
}

describe('Transaction methods', function() {

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
            raw_tx: '010000000156fb6e22304b6d542e5d8ca5ad40352f00b66' +
                '4b7142e2cfbdbcb16b4e4b300b2000000006b483045022100975e587' +
                '256f91d50f719364024a978d3df0248374061c97bfe4560ec1beab67402206cd1b' +
                '231430a613392c13bff9e996285577a68d48fa94c769bb6df7c021f3e6b012103e4182a3' +
                '6fb4efa245069e1e68d2492d6acd33c7583eacbde863e91af08d16029ffffffff0200451a0' +
                '0000000001976a9144a7eb59b84666dad56622a8519e2c22d0ecb824888ac10270000000000' +
                '001976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac00000000',
            ...params
        };
    }

    it('return a histogram of the fee rates paid by transactions in the memory pool, weighted by transaction size', async function() {
        await request(app)
            .get('/transaction/get')
            .query(options())
            .expect(200)
            .expect({
                'status': 'success',
                'result': '0100000001a64a43a90cc604a09f2b82fbaa' +
                    '7792c9d747063f21c56d924c43ec13e07e69ca05000000' +
                    '6b483045022100955b61c1731a1e996558462124f9da29c6c' +
                    'e1ab6d71f73e872524e783ef6e9402207b0ecc9130bc385d2e88f29' +
                    'b1095135ae76e581a2e855de763455797f8e483480121039fe71e7c19502' +
                    '5b193f0255f5c5555be7eab8c6dac66dbfb3c2dff90bbe6565dffffffff0550c' +
                    '30000000000001976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac50c3' +
                    '0000000000001976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac50c30000' +
                    '000000001976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac50c30000000000001' +
                    '976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac40c84c00000000001976a9142d' +
                    '37ceaf73a2d831a550d06d03ffa4f5c53fade188ac00000000'
            });

    });

});
