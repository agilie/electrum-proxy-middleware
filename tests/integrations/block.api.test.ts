import request from 'supertest';
import express from 'express';
import {router} from '../../src';
import {CoinType} from '../../src/service/wallet/types/coin.type';

const app: any = express();

describe('Block methods', function() {

    beforeAll(function() {
        app.use(router);
    });

    function options(params = {}) {
        return {
            coinType: CoinType.BTC,
            ...params
        };
    }

    it('return the block header at the given height', async function() {
        let result: any = await request(app)
            .get('/block/header').query(options({height: 5}));

        expect(result.statusCode).toBe(200);
        let data = result.body;
        expect(data.status).toEqual('success');
        expect(data.result).not.toBeNull();
        expect(data.result.length).toBeGreaterThan(10);
    });

    it('return a concatenated chunk of block headers from the main chain.', async function() {
        let result: any = await request(app)
            .get('/block/headers').query(options({start_height: 5, count: 1}));

        expect(result.statusCode).toBe(200);
        let data = result.body;
        expect(data.status).toEqual('success');
        expect(data.result).not.toBeNull();
        expect(data.result).toHaveProperty('hex');
        expect(data.result).toHaveProperty('count');
        expect(data.result).toHaveProperty('max');
    });
});
