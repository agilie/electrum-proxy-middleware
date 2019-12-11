import {ProtocolTypeEnum} from '../../../electrum-client/types/protocol.type.enum';

export interface RequestedElectrumConfig {
    ip: string
    host: string;
    port: number;
    connectionType: ProtocolTypeEnum;
    version: number;
    tcpPort: number;
    sslPort: number;
}
