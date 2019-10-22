import request from 'supertest';
import express from 'express';
import {router} from '../../src';

const app: any = express();

describe('Mempool methods', function() {

    beforeAll(function() {
        app.use(router);
    });

    function options(params = {}) {
        return {
            coinType: 'btc',
            ...params
        };
    }

    it('return a histogram of the fee rates paid by transactions in the memory pool, weighted by transaction size |', async function() {
        let result: any = await request(app)
            .get('/mempool/get_fee_histogram').query(options());

        expect(result.statusCode).toBe(200);
        let data = result.body;
        expect(data.status).toEqual('success');
        expect(data.result).not.toBeNull();
    });
});



