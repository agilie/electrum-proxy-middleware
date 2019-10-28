import request from 'supertest';
import express from 'express';
import {router} from '../../src';

const app: any = express();

describe('Transaction methods', function() {

    beforeAll(function() {
        app.use(router);
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
        let result: any = await request(app)
            .get('/transaction/get').query(options({tx_hash: '871af2528c83ba90bd7b3fbfeac703cbd20f204f1b800ba4ec748842fcac0c9b'}));

        expect(result.statusCode).toBe(200);
        let data = result.body;
        expect(data.status).toEqual('success');
        expect(data.result).not.toBeNull();
    });

});
