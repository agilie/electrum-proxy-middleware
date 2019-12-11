import {RequestedElectrumConfig} from './requested-electrum.config';

export interface RequestedServer {
    currency: string
    peers: RequestedElectrumConfig[];
}
