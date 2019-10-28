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

    blockchainScripthash_getBalance() {
        return Promise.resolve({
            'confirmed': '1.03873966',
            'unconfirmed': '0.236844'
        });
    }

    blockchainScripthash_listunspent() {
        return Promise.resolve([
            {
                'tx_pos': 0,
                'value': 45318048,
                'tx_hash': '9f2c45a12db0144909b5db269415f7319179105982ac70ed80d76ea79d923ebf',
                'height': 437146
            },
            {
                'tx_pos': 0,
                'value': 919195,
                'tx_hash': '3d2290c93436a3e964cfc2f0950174d8847b1fbe3946432c4784e168da0f019f',
                'height': 441696
            }
        ]);
    }

    blockchainScripthash_getMempool() {
        return Promise.resolve([
            {
                'tx_hash': '45381031132c57b2ff1cbe8d8d3920cf9ed25efd9a0beb764bdb2f24c7d1c7e3',
                'height': 0,
                'fee': 24310
            }
        ]);
    }
}

describe('Scripthash methods', function() {

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
            scripthash: '20b360e68b4fe6d1eb460e45434f756fa1582ed687167898f9a716435ecd737f',
            ...params
        };
    }

    it('return the confirmed and unconfirmed balances of a script hash', async function() {
        await request(app)
            .get('/scripthash/balance')
            .query(options())
            .expect(200)
            .expect({
                'status': 'success', 'result': {
                    'confirmed': '1.03873966',
                    'unconfirmed': '0.236844'
                }
            });
    });

    it('return an ordered list of UTXOs sent to a script hash', async function() {
        await request(app)
            .get('/scripthash/listunspent')
            .query(options())
            .expect(200)
            .expect({
                status: 'success', result: [
                    {
                        'tx_pos': 0,
                        'value': 45318048,
                        'tx_hash': '9f2c45a12db0144909b5db269415f7319179105982ac70ed80d76ea79d923ebf',
                        'height': 437146
                    },
                    {
                        'tx_pos': 0,
                        'value': 919195,
                        'tx_hash': '3d2290c93436a3e964cfc2f0950174d8847b1fbe3946432c4784e168da0f019f',
                        'height': 441696
                    }
                ]
            });
    });

    it('return the unconfirmed transactions of a script hash.', async function() {
        await request(app)
            .get('/scripthash/get_mempool')
            .query(options())
            .expect(200)
            .expect({
                status: 'success', result: [
                    {
                        'tx_hash': '45381031132c57b2ff1cbe8d8d3920cf9ed25efd9a0beb764bdb2f24c7d1c7e3',
                        'height': 0,
                        'fee': 24310
                    }
                ]
            });
    });
});
