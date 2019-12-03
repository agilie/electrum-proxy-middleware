import {CoinType} from '../../src/service/wallet/types/coin.type';

const historyHandler = require('../../src/history');

describe('getHistoryHandler method', function() {
    it('return valid ', async function() {
        const mockReq = {
            query: {address: 'n2xmNu2fQvYkuSFtDtG4XU2f2m6vwEkWSL', coinType: CoinType.BTC},
            locals: {
                ecl: {
                    blockchainScripthash_getHistory: () => 'test',
                    blockchainTransaction_get: () => Promise.resolve('010000000156fb6e22304b6d542' +
                        'e5d8ca5ad40352f00b664b7142e2cfbdbcb16b4e4b300b2000000006b483045022100975e5872' +
                        '56f91d50f719364024a978d3df0248374061c97bfe4560ec1beab67402206cd1b231430a613392c1' +
                        '3bff9e996285577a68d48fa94c769bb6df7c021f3e6b012103e4182a36fb4efa245069e1e68d2492d6acd' +
                        '33c7583eacbde863e91af08d16029ffffffff0200451a00000000001976a9144a7eb59b84666dad56622a8519e' +
                        '2c22d0ecb824888ac10270000000000001976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac00000000'),
                    close: () => {},
                },
            }
        };

        let actual: any = {};

        const moqRes = {
            json: (data: any) => {
                actual = data;
            }
        };

        const expected = {
            status: 'success',
            result:
                [{
                    hash: undefined,
                    value: '-0.0001',
                    timestamp: 1000,
                    fee: '-0.0001',
                    status: 'incompleted'
                },
                    {
                        hash: undefined,
                        value: '-0.0001',
                        timestamp: 1000,
                        fee: '-0.0001',
                        status: 'incompleted'
                    },
                    {
                        hash: undefined,
                        value: '-0.0001',
                        timestamp: 1000,
                        fee: '-0.0001',
                        status: 'incompleted'
                    },
                    {
                        hash: undefined,
                        value: '-0.0001',
                        timestamp: 1000,
                        fee: '-0.0001',
                        status: 'incompleted'
                    }]
        };

        await historyHandler.getHistoryHandler(mockReq, moqRes);

        expect(actual.status).toEqual(expected.status);
        expect(actual.result).toEqual(expected.result);
    });
});

