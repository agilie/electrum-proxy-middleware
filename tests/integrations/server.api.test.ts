import request from 'supertest';
import express from 'express';
import {router} from '../../src';
import {CoinType} from '../../src/service/wallet/types/coin.type';

const app: any = express();

describe('Server methods', function() {

    beforeAll(function() {
        app.use(router);
    });

    function options(params = {}) {
        return {
            coinType: CoinType.BTC,
            ...params
        };
    }

    it('identify the client to the server and negotiate the protocol version', async function() {
        let result: any = await request(app)
            .get('/server/version').query(options());

        expect(result.statusCode).toBe(200);
        let data = result.body;
        expect(data.status).toEqual('success');
        expect(data.result).not.toBeNull();
    });

    it('return a list of features and services supported by the server', async function() {
        let result: any = await request(app)
            .get('/server/features').query(options());

        expect(result.statusCode).toBe(200);
        let data = result.body;
        expect(data.status).toEqual('success');
        expect(data.result).not.toBeNull();
    });

    it('return a server donation address', async function() {
        let result: any = await request(app)
            .get('/server/donation-address').query(options());

        expect(result.statusCode).toBe(200);
        let data = result.body;
        expect(data.status).toEqual('success');
        expect(data.result).not.toBeNull();
    });

    it('a newly-started server uses this call to get itself into other servers’ peers lists', async function() {
        let result: any = await request(app)
            .get('/server/add_peer').query(options());

        expect(result.statusCode).toBe(200);
        let data = result.body;
        expect(data.status).toEqual('success');
    });

    it('return a list of peer servers', async function() {
        let result: any = await request(app)
            .get('/server/get-peers').query(options());

        expect(result.statusCode).toBe(200);
        let data = result.body;
        expect(data.status).toEqual('success');
    });

    it('ping the server to ensure it is responding, and to keep the session alive.', async function() {
        let result: any = await request(app)
            .get('/server/ping').query(options());

        expect(result.statusCode).toBe(200);
        let data = result.body;
        expect(data.status).toEqual('success');
    });

});
