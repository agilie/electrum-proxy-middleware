import request from 'supertest';
import express from 'express';
import {router} from '../../src';
import {CoinType} from '../../src/service/wallet/types/coin.type';

const app: any = express();

describe('History methods', function() {

    beforeAll(function() {
        app.use(router);
    });

    function options(params = {}) {
        return {
            coinType: CoinType.BTC,
            ...params
        };
    }

    it('return the confirmed and unconfirmed history of a script hash', async function() {
        let result: any = await request(app)
            .get('/history/get_history').query(options({address:'n2xmNu2fQvYkuSFtDtG4XU2f2m6vwEkWSL'}));

        expect(result.statusCode).toBe(200);
        let data = result.body;
        expect(data.status).toEqual('success');
        expect(data.result).not.toBeNull();
        if (data.result.length > 0) {
            let first_value = data.result[0];
            expect(first_value).toHaveProperty('value');
            expect(first_value).toHaveProperty('timestamp');
            expect(first_value).toHaveProperty('fee');
            expect(first_value).toHaveProperty('status');
        }
    });
});
