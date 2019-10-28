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
        return Promise.resolve('010000000156fb6e22304b6d542' +
            'e5d8ca5ad40352f00b664b7142e2cfbdbcb16b4e4b300b2000000006b483045022100975e5872' +
            '56f91d50f719364024a978d3df0248374061c97bfe4560ec1beab67402206cd1b231430a613392c1' +
            '3bff9e996285577a68d48fa94c769bb6df7c021f3e6b012103e4182a36fb4efa245069e1e68d2492d6acd' +
            '33c7583eacbde863e91af08d16029ffffffff0200451a00000000001976a9144a7eb59b84666dad56622a8519e' +
            '2c22d0ecb824888ac10270000000000001976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac00000000');
    }

    blockchainBlock_getHeader(height: number, protocolVersion: number) {
        return Promise.resolve(
            '0100000085144a84488ea8' +
            '8d221c8bd6c059da090e88f8a2c99690ee55dbba4e00000000e11c48fecdd9e7251' +
            '0ca84f023370c9a38bf91ac5cae88019bee94d24528526344c36649ffff001d1d03e477'
        );
    }

    blockchainScripthash_getHistory(address: string) {
        return Promise.resolve([{
            tx_hash: '66dff43cd32a898592ba294b3b99cdd7aa60773faccf3b426fb4171a1e7336a1',
            height: 299254
        },
            {
                tx_hash: '3604bd8ac5c600e9d835991e46cbf8baa420c8692f88d83a3e7b4adc44f11e01',
                height: 299254
            },
            {
                tx_hash: 'f807e5b5254ec6eeb9c2ac9d7754be9ed941a06b2d31f7b9f79c7050b52ad66a',
                height: 299254
            },
            {
                tx_hash: 'e19cd13add23c9eb437f3a02a81d9c4a1520bd731f1c2fa363c38ea671ceaa06',
                height: 299254
            }]);
    }

}

describe('History methods', function() {

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

    it('return the confirmed and unconfirmed history of a script hash', async function() {

        const expected: any = {
            status: 'success',
            result:
                [{
                    value: '0',
                    timestamp: 1231471428000,
                    fee: '-0.0001',
                    status: 'completed'
                },
                    {
                        value: '0',
                        timestamp: 1231471428000,
                        fee: '-0.0001',
                        status: 'completed'
                    },
                    {
                        value: '0',
                        timestamp: 1231471428000,
                        fee: '-0.0001',
                        status: 'completed'
                    }],
            time: 6.884237
        }

        await request(app).get('/history/get_history')
            .query(options())
            .expect(200)
            .expect(function(res) {
                res.body.time = 6.884237;
                res.body.result = [{
                    value: '0',
                    timestamp: 1231471428000,
                    fee: '-0.0001',
                    status: 'completed'
                },
                    {
                        value: '0',
                        timestamp: 1231471428000,
                        fee: '-0.0001',
                        status: 'completed'
                    },
                    {
                        value: '0',
                        timestamp: 1231471428000,
                        fee: '-0.0001',
                        status: 'completed'
                    }];
            })
            .expect(expected);

    });
});
