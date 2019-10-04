import {CoinType} from '../service/wallet/types/coin.type';

export class ElectrumConfigValidator {
    errors: Array<String>;
    params: any;

    constructor(params: any) {
        this.params = params;
        this.errors = [];
    }

    validateInitRequiredParams() {
        const coinType = this.params.coinType;
        if (coinType) {
            this.validateCoinType();
        }
        if (this.someServerParamPresent()) {
            this.validateRequiredServerParams();
        }
        if (this.allParamsMissing()) {
            this.errors.push('Configuration params or coin type is missing');
        }
    }

    private validateCoinType() {
        const coinType = this.params.coinType;
        if (!Object.values(CoinType).includes(coinType)) {
            this.errors.push('Coin Type is not supported');
        }
    }

    private validateRequiredServerParams() {
        if (!this.params.port) {
            this.errors.push('port is missing');
        }
        if (!this.params.host) {
            this.errors.push('host is missing');
        }
        if (!this.params.protocol) {
            this.errors.push('protocol is missing');
        }
        if (!this.params.version) {
            this.errors.push('version is missing');
        }
    }

    private someServerParamPresent() {
        return [this.params.port,
            this.params.host,
            this.params.protocol,
            this.params.version].some(elem => elem);
    }

    private allParamsMissing(): boolean {
        return [this.params.port,
            this.params.host,
            this.params.protocol,
            this.params.version,
            this.params.coinType].every(elem => !elem);
    }
}

