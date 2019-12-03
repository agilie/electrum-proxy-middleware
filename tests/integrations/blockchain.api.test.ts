import request from 'supertest';
import express from 'express';
import {router} from '../../src';
import {CoinType} from '../../src/service/wallet/types/coin.type';

const app: any = express();

describe('Blockchain methods', function() {

    beforeAll(function() {
        app.use(router);
    });

    function options(params = {}) {
        return {
            coinType: CoinType.BTC,
            ...params
        };
    }

    it('return the estimated transaction fee per kilobyte for a transaction to be confirmed within a certain number of blocks', async function() {
        let result: any = await request(app)
            .get('/blockchain/estimatefee').query(options({blocks: 5}));

        expect(result.statusCode).toBe(200);
        let data = result.body;
        expect(data.status).toEqual('success');
        expect(data.result).not.toBeNull();
    });

    it('return the minimum fee a low-priority transaction must pay in order to be accepted to the daemon’s memory pool', async function() {
        let result: any = await request(app)
            .get('/blockchain/relayfee').query(options());

        expect(result.statusCode).toBe(200);
        let data = result.body;
        expect(data.status).toEqual('success');
        expect(data.result).not.toBeNull();
    });

});
