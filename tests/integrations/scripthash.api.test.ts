import request from 'supertest';
import express from 'express';
import {router} from '../../src';

const app: any = express();

describe('Scripthash methods', function() {

    beforeAll(function() {
        app.use(router);
    });

    function options(params = {}) {
        return {
            coinType: 'btc',
            scripthash: '20b360e68b4fe6d1eb460e45434f756fa1582ed687167898f9a716435ecd737f',
            ...params
        };
    }

    it('return the confirmed and unconfirmed balances of a script hash', async function() {
        let result: any = await request(app)
            .get('/scripthash/balance').query(options());

        expect(result.statusCode).toBe(200);
        let data = result.body;
        expect(data.status).toEqual('success');
        expect(data.result).not.toBeNull();
        expect(data.result).toHaveProperty('confirmed');
        expect(data.result).toHaveProperty('unconfirmed');
    });

    it('return an ordered list of UTXOs sent to a script hash', async function() {
        let result: any = await request(app)
            .get('/scripthash/listunspent').query(options());

        expect(result.statusCode).toBe(200);
        let data = result.body;
        expect(data.status).toEqual('success');
        expect(data.result).not.toBeNull();
    });

    it('return the unconfirmed transactions of a script hash.', async function() {
        let result: any = await request(app)
            .get('/scripthash/get_mempool').query(options());

        expect(result.statusCode).toBe(200);
        let data = result.body;
        expect(data.status).toEqual('success');
        expect(data.result).not.toBeNull();
    });
});
