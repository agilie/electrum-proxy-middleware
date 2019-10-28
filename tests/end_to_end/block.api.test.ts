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

    blockchainBlock_getHeader(height: number, protocolVersion: number) {
        return Promise.resolve(
            '0100000085144a84488ea8' +
            '8d221c8bd6c059da090e88f8a2c99690ee55dbba4e00000000e11c48fecdd9e7251' +
            '0ca84f023370c9a38bf91ac5cae88019bee94d24528526344c36649ffff001d1d03e477'
        );
    }

    blockchainBlock_headers(start_height: number, count: number) {
        return Promise.resolve({

            'hex': '01000000' +
                '85144a84488ea88d221c8bd6c059da090e88f8a2c9969' +
                '0ee55dbba4e00000000e11c48fecdd9e72510ca84f023370' +
                'c9a38bf91ac5cae88019bee94d24528526344c36649ffff001d1d03e477', 'count': 1, 'max': 2016

        });
    }

}

describe('Block methods', function() {

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

    it('return the block header at the given height', async function() {
        await request(app)
            .get('/block/header')
            .query(options({height: 5}))
            .expect(200)
            .expect({
                'status': 'success', 'result': '0100000085144a84488ea8' +
                    '8d221c8bd6c059da090e88f8a2c99690ee55dbba4e00000000e11c48fecdd9e7251' +
                    '0ca84f023370c9a38bf91ac5cae88019bee94d24528526344c36649ffff001d1d03e477'
            });
    });

    it('return a concatenated chunk of block headers from the main chain.', async function() {
        await request(app)
            .get('/block/headers')
            .query(options({start_height: 5, count: 1}))
            .expect(200)
            .expect({
                'status': 'success', 'result': {
                    'hex': '01000000' +
                        '85144a84488ea88d221c8bd6c059da090e88f8a2c9969' +
                        '0ee55dbba4e00000000e11c48fecdd9e72510ca84f023370' +
                        'c9a38bf91ac5cae88019bee94d24528526344c36649ffff001d1d03e477', 'count': 1, 'max': 2016
                }
            });
    });

});
