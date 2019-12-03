import {Netmode} from '../../src/electrum-client/types/netmode';
import {CoinType} from '../../src/service/wallet/types/coin.type';
const electrumClient = require('../../src/electrum-client/define-electrum-client');

describe('_getElectrumConfig method', function() {
    it('return valid ElectrumConfig data', async function() {
        const options = await electrumClient._getElectrumConfig(CoinType.BTC, Netmode.TESTNET);

        expect(options).toHaveProperty('host');
        expect(options).toHaveProperty('port');
        expect(options).toHaveProperty('connectionType');
        expect(options).toHaveProperty('version');
    });
});
