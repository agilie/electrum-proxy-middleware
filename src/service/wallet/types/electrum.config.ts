export interface ElectrumConfig {
    ip: string;
    port: number;
    connectionType: 'tcp' | 'ssl';
    version: number;
}
