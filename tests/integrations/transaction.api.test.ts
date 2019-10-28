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
