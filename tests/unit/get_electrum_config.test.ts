import {Netmode} from '../../src/electrum-client/types/netmode';
import {CoinType} from '../../src/service/wallet/types/coin.type';
import {getElectrumConfig} from  '../../src/electrum-client/electrum-config';

describe('getElectrumConfig method', function() {
    it('return valid ElectrumConfig data', async function() {
        const options = await getElectrumConfig(CoinType.BTC, Netmode.MAINNET);

        expect(options).toHaveProperty('host');
        expect(options).toHaveProperty('port');
        expect(options).toHaveProperty('connectionType');
        expect(options).toHaveProperty('version');
    });
});
