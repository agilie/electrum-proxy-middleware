import {ProtocolTypeEnum} from '../../../electrum-client/types/protocol.type.enum';

export interface ElectrumConfig {
    host: string;
    port: number;
    connectionType: ProtocolTypeEnum;
    version: number;
}
