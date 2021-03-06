import {CoinType} from '../../../src/service/wallet/types/coin.type';

const electrumClient = require('../../../src/electrum-client/define-electrum-client');

describe('getOptions method', function() {
    describe('with CoinType param', function() {
        describe('with valid CoinType param', function() {
            it('return valid ElectrumConfig data', async function() {
                const query = {coinType: CoinType.BTC};
                const options = await electrumClient.getOptions(query);

                expect(options).toHaveProperty('host');
                expect(options).toHaveProperty('port');
                expect(options).toHaveProperty('connectionType');
                expect(options).toHaveProperty('version');
            });
        });

        describe('with invalid CoinType param', function() {
            it('return warning', async function() {
                const query = {coinType: 'etc'};
                try {
                    await electrumClient.getOptions(query);
                } catch (error) {
                    const warning = error[0].constraints;
                    expect(warning).toHaveProperty('isEnum');
                    expect(warning.isEnum).toEqual(expect.stringContaining('coinType must be a valid enum value'));
                }
            });
        });

        describe('with invalid netMode param', function() {
            it('return warning', async function() {
                const query = {coinType: CoinType.BTC, netMode: 'test'};
                try {
                    await electrumClient.getOptions(query);
                } catch (error) {
                    const warning = error[0].constraints;
                    expect(warning).toHaveProperty('isEnum');
                    expect(warning.isEnum).toEqual(expect.stringContaining('netMode must be a valid enum value'));
                }
            });
        });
    });
});
