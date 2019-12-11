import {Netmode} from '../../src/electrum-client/types/netmode';
import {CoinType} from '../../src/service/wallet/types/coin.type';
import {_getElectrumConfig} from  '../../src/electrum-client/electrum-config';
import {ProtocolTypeEnum} from '../../src/electrum-client/types/protocol.type.enum';

describe('_getElectrumConfig method', function() {
    it('return valid ElectrumConfig data', async function() {
        const options = await _getElectrumConfig(CoinType.BTC, Netmode.MAINNET, ProtocolTypeEnum.SSL);

        expect(options).toHaveProperty('host');
        expect(options).toHaveProperty('port');
        expect(options).toHaveProperty('connectionType');
        expect(options).toHaveProperty('version');
    });
});
