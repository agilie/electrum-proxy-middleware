import request from 'supertest';
import express from 'express';
import {router} from '../../src';

const app: any = express();
const {ElectrumClient, overrideClient} = require('../../src/electrum-client/electrum_client');
let originalElectrumClient = ElectrumClient;

class MockElectrumClient {

    connect() {
        return;
    }

    close() {
        return;
    }

    blockchainTransaction_get() {
        return Promise.resolve('0100000001a64a43a90cc604a09f2b82fbaa' +
            '7792c9d747063f21c56d924c43ec13e07e69ca05000000' +
            '6b483045022100955b61c1731a1e996558462124f9da29c6c' +
            'e1ab6d71f73e872524e783ef6e9402207b0ecc9130bc385d2e88f29' +
            'b1095135ae76e581a2e855de763455797f8e483480121039fe71e7c19502' +
            '5b193f0255f5c5555be7eab8c6dac66dbfb3c2dff90bbe6565dffffffff0550c' +
            '30000000000001976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac50c3' +
            '0000000000001976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac50c30000' +
            '000000001976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac50c30000000000001' +
            '976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac40c84c00000000001976a9142d' +
            '37ceaf73a2d831a550d06d03ffa4f5c53fade188ac00000000');
    }

    blockchainTransaction_getMerkle() {
        return Promise.resolve({
            'merkle':
                [
                    '713d6c7e6ce7bbea708d61162231eaa8ecb31c4c5dd84f81c20409a90069cb24',
                    '03dbaec78d4a52fbaf3c7aa5d3fccd9d8654f323940716ddf5ee2e4bda458fde',
                    'e670224b23f156c27993ac3071940c0ff865b812e21e0a162fe7a005d6e57851',
                    '369a1619a67c3108a8850118602e3669455c70cdcdb89248b64cc6325575b885',
                    '4756688678644dcb27d62931f04013254a62aeee5dec139d1aac9f7b1f318112',
                    '7b97e73abc043836fd890555bfce54757d387943a6860e5450525e8e9ab46be5',
                    '61505055e8b639b7c64fd58bce6fc5c2378b92e025a02583303f69930091b1c3',
                    '27a654ff1895385ac14a574a0415d3bbba9ec23a8774f22ec20d53dd0b5386ff',
                    '5312ed87933075e60a9511857d23d460a085f3b6e9e5e565ad2443d223cfccdc',
                    '94f60b14a9f106440a197054936e6fb92abbd69d6059b38fdf79b33fc864fca0',
                    '2d64851151550e8c4d337f335ee28874401d55b358a66f1bafab2c3e9f48773d'
                ],
            'block_height': 450538,
            'pos': 710
        });
    }

    blockchainTransaction_idFromPos(){
        return Promise.resolve({
            "tx_hash": "fc12dfcb4723715a456c6984e298e00c479706067da81be969e8085544b0ba08",
            "merkle":
                [
                    "928c4275dfd6270349e76aa5a49b355eefeb9e31ffbe95dd75fed81d219a23f8",
                    "5f35bfb3d5ef2ba19e105dcd976928e675945b9b82d98a93d71cbad0e714d04e",
                    "f136bcffeeed8844d54f90fc3ce79ce827cd8f019cf1d18470f72e4680f99207",
                    "6539b8ab33cedf98c31d4e5addfe40995ff96c4ea5257620dfbf86b34ce005ab",
                    "7ecc598708186b0b5bd10404f5aeb8a1a35fd91d1febbb2aac2d018954885b1e",
                    "a263aae6c470b9cde03b90675998ff6116f3132163911fafbeeb7843095d3b41",
                    "c203983baffe527edb4da836bc46e3607b9a36fa2c6cb60c1027f0964d971b29",
                    "306d89790df94c4632d652d142207f53746729a7809caa1c294b895a76ce34a9",
                    "c0b4eff21eea5e7974fe93c62b5aab51ed8f8d3adad4583c7a84a98f9e428f04",
                    "f0bd9d2d4c4cf00a1dd7ab3b48bbbb4218477313591284dcc2d7ca0aaa444e8d",
                    "503d3349648b985c1b571f59059e4da55a57b0163b08cc50379d73be80c4c8f3"
                ]
        });
    }
}

describe('Transaction methods', function() {

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
            coinType: 'btc',
            ...params
        };
    }

    it('return a histogram of the fee rates paid by transactions in the memory pool, weighted by transaction size', async function() {
        const expected: any = {
            'status': 'success',
            'result': '0100000001a64a43a90cc604a09f2b82fbaa' +
                '7792c9d747063f21c56d924c43ec13e07e69ca05000000' +
                '6b483045022100955b61c1731a1e996558462124f9da29c6c' +
                'e1ab6d71f73e872524e783ef6e9402207b0ecc9130bc385d2e88f29' +
                'b1095135ae76e581a2e855de763455797f8e483480121039fe71e7c19502' +
                '5b193f0255f5c5555be7eab8c6dac66dbfb3c2dff90bbe6565dffffffff0550c' +
                '30000000000001976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac50c3' +
                '0000000000001976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac50c30000' +
                '000000001976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac50c30000000000001' +
                '976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac40c84c00000000001976a9142d' +
                '37ceaf73a2d831a550d06d03ffa4f5c53fade188ac00000000'
        };

        await request(app)
            .get('/transaction/get')
            .query(options({tx_hash: '871af2528c83ba90bd7b3fbfeac703cbd20f204f1b800ba4ec748842fcac0c9b'}))
            .expect(200)
            .expect(expected);

    });

    it('return the merkle branch to a confirmed transaction given its hash and height.', async function() {
        const expected: any = {
            'status': 'success',
            'result': {
                'merkle':
                    [
                        '713d6c7e6ce7bbea708d61162231eaa8ecb31c4c5dd84f81c20409a90069cb24',
                        '03dbaec78d4a52fbaf3c7aa5d3fccd9d8654f323940716ddf5ee2e4bda458fde',
                        'e670224b23f156c27993ac3071940c0ff865b812e21e0a162fe7a005d6e57851',
                        '369a1619a67c3108a8850118602e3669455c70cdcdb89248b64cc6325575b885',
                        '4756688678644dcb27d62931f04013254a62aeee5dec139d1aac9f7b1f318112',
                        '7b97e73abc043836fd890555bfce54757d387943a6860e5450525e8e9ab46be5',
                        '61505055e8b639b7c64fd58bce6fc5c2378b92e025a02583303f69930091b1c3',
                        '27a654ff1895385ac14a574a0415d3bbba9ec23a8774f22ec20d53dd0b5386ff',
                        '5312ed87933075e60a9511857d23d460a085f3b6e9e5e565ad2443d223cfccdc',
                        '94f60b14a9f106440a197054936e6fb92abbd69d6059b38fdf79b33fc864fca0',
                        '2d64851151550e8c4d337f335ee28874401d55b358a66f1bafab2c3e9f48773d'
                    ],
                'block_height': 450538,
                'pos': 710
            }
        };

        await request(app)
            .get('/transaction/get-merkle')
            .query(options({tx_hash: '871af2528c83ba90bd7b3fbfeac703cbd20f204f1b800ba4ec748842fcac0c9b', height: 1}))
            .expect(200)
            .expect(expected);
    });

    it('return a transaction hash and optionally a merkle proof, given a block height and a position in the block', async function() {
        const expected: any = {
            'status': 'success',
            'result': {
                "tx_hash": "fc12dfcb4723715a456c6984e298e00c479706067da81be969e8085544b0ba08",
                "merkle":
                    [
                        "928c4275dfd6270349e76aa5a49b355eefeb9e31ffbe95dd75fed81d219a23f8",
                        "5f35bfb3d5ef2ba19e105dcd976928e675945b9b82d98a93d71cbad0e714d04e",
                        "f136bcffeeed8844d54f90fc3ce79ce827cd8f019cf1d18470f72e4680f99207",
                        "6539b8ab33cedf98c31d4e5addfe40995ff96c4ea5257620dfbf86b34ce005ab",
                        "7ecc598708186b0b5bd10404f5aeb8a1a35fd91d1febbb2aac2d018954885b1e",
                        "a263aae6c470b9cde03b90675998ff6116f3132163911fafbeeb7843095d3b41",
                        "c203983baffe527edb4da836bc46e3607b9a36fa2c6cb60c1027f0964d971b29",
                        "306d89790df94c4632d652d142207f53746729a7809caa1c294b895a76ce34a9",
                        "c0b4eff21eea5e7974fe93c62b5aab51ed8f8d3adad4583c7a84a98f9e428f04",
                        "f0bd9d2d4c4cf00a1dd7ab3b48bbbb4218477313591284dcc2d7ca0aaa444e8d",
                        "503d3349648b985c1b571f59059e4da55a57b0163b08cc50379d73be80c4c8f3"
                    ]
            }
        };

        await request(app)
            .get('/transaction/id-from-pos')
            .query(options({height: 5, txPos: 1, merkle: true}))
            .expect(200)
            .expect(expected);
    });

});
