import request from 'supertest';
import express from 'express';
import {router} from '../../src';
import {CoinType} from '../../src/service/wallet/types/coin.type';
const app: any = express();
const {ElectrumClient, overrideClient} = require('../../src/electrum-client/electrum_client');
const originalElectrumClient = ElectrumClient;

class MockElectrumClient {

    connect() {
        return;
    }

    close() {
        return;
    }

    server_version(client_name: string, protocol_version: string) {
        return Promise.resolve(['ElectrumX 1.13.0', '1.4']);
    }

    server_features() {
        return Promise.resolve({
            'hosts': {}, 'pruning': null,
            'server_version': 'ElectrumX 1.13.0',
            'protocol_min': '1.4', 'protocol_max': '1.4.2',
            'genesis_hash': '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f',
            'hash_function': 'sha256', 'services': []
        });
    }

    server_banner() {
        return Promise.resolve('You are connected to an ElectrumX 1.13.0 server.');
    }

    serverDonation_address() {
        return Promise.resolve('1BWwXJH3q6PRsizBkSGm2Uw4Sz1urZ5sCj');
    }

    server_addPeer() {
        return Promise.resolve(false);
    }

    serverPeers_subscribe() {
        return Promise.resolve(['107.150.45.210',
            'e.anonyhost.org',
            ['v1.0', 'p10000', 't', 's995']]);
    }

    server_ping() {
        return Promise.resolve(null);
    }

}

describe('Server methods', function() {
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
            coinType: CoinType.BTC,
            ...params
        };
    }

    it('identify the client to the server and negotiate the protocol version', async function() {
        const expected: any = {status: 'success', result: ['ElectrumX 1.13.0', '1.4']};

        await request(app)
            .get('/server/version')
            .query(options())
            .expect(200)
            .expect(expected);
    });

    it('return a list of features and services supported by the server', async function() {
        const expected: any = {
            'status': 'success',
            'result': {
                'hosts': {}, 'pruning': null,
                'server_version': 'ElectrumX 1.13.0',
                'protocol_min': '1.4', 'protocol_max': '1.4.2',
                'genesis_hash': '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f',
                'hash_function': 'sha256', 'services': []
            }
        };

        await request(app)
            .get('/server/features')
            .query(options())
            .expect(200)
            .expect(expected);
    });

    it('return a server banner', async function() {
        await request(app)
            .get('/server/banner')
            .query(options())
            .expect(200)
            .expect('You are connected to an ElectrumX 1.13.0 server.');
    });

    it('return a server donation address', async function() {
        await request(app)
            .get('/server/donation-address')
            .query(options())
            .expect(200)
            .expect({status: 'success', result: '1BWwXJH3q6PRsizBkSGm2Uw4Sz1urZ5sCj'});
    });

    it('a newly-started server uses this call to get itself into other servers’ peers lists', async function() {
        await request(app)
            .get('/server/add_peer')
            .query(options())
            .expect(200)
            .expect({status: 'success', result: false});
    });

    it('return a list of peer servers', async function() {
        const expected: any = {
            status: 'success', result: ['107.150.45.210',
                'e.anonyhost.org',
                ['v1.0', 'p10000', 't', 's995']]
        };
        await request(app)
            .get('/server/get-peers')
            .query(options())
            .expect(200)
            .expect(expected);
    });

    it('ping the server to ensure it is responding, and to keep the session alive.', async function() {
        await request(app)
            .get('/server/ping')
            .query(options())
            .expect(200)
            .expect({status: 'success', result: null});
    });

});
