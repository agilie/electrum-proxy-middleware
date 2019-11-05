import {WalletLike} from './wallet.interface';
import {CoinType} from '../types/coin.type';
import {WalletCreateOptionsInterface} from './wallet-create-options.interface';
import {TransactionLike} from '../types/transaction.type';
import {Address, PrivateKey, Script} from 'bitcore-lib';
import {NetmodeTypeEnum} from '../../../electrum-client/types/netmode.type.enum';

export abstract class WalletBitcoreAbstract implements WalletLike {
    readonly address: string;
    readonly type: CoinType;
    protected readonly netMode: NetmodeTypeEnum;
    private readonly _bitcore: any;

    private readonly _scriptHash: string;
    private readonly _scriptHEX: string;

    protected constructor(options: WalletCreateOptionsInterface) {
        this._bitcore = options.bitcore;
        this.type = options.type;
        this.netMode = options.netMode;
        const privateKey = this._getPrivateKey(options.userString);
        this.address = privateKey.toAddress().toString();

        const script = this._getScript(privateKey.toAddress());
        this._scriptHEX = script.toHex();
        this._scriptHash = this._getScriptHash(script);
    }

    async getHistory(page: number, pageSize: number, req: any): Promise<TransactionLike[]> {
        let transactions = await req.locals.ecl.blockchainScripthash_getHistory(this._scriptHash);

        if (page && pageSize && Number(page) && page > 0) {
            transactions = transactions.slice(Number(page - 1) * pageSize, (page * pageSize));
        }

        const result: TransactionLike[] = [];

        for (let i = 0; i < transactions.length; i++) {
            const tx = transactions[i];
            const txRaw = await req.locals.ecl.blockchainTransaction_get(tx.tx_hash,
                req.query.verbose && req.query.verbose === 'true' ? true : null, null);

            const txObj: ParsedTx = new this._bitcore.Transaction(txRaw).toObject();
            const txData = await this._getTxData(txObj, req);

            let timestamp;
            if (tx.height && tx.height > 0) {
                const blockHeader = await req.locals.ecl.blockchainBlock_getHeader(tx.height, req.locals.ecl.version);

                if (typeof blockHeader === 'string') {
                    timestamp = new this._bitcore.BlockHeader.fromString(blockHeader as string).timestamp;
                } else {
                    timestamp = blockHeader.timestamp;
                }
            } else {
                timestamp = 1;
            }

            const appTx: TransactionLike = {
                hash: tx.txid,
                value: +txData.value / 1e8 + '',
                timestamp: timestamp * 1000,
                fee: +txData.fee / 1e8 + '',
                status: tx.height > 0 ? 'completed' : 'incompleted',
            };

            result.push(appTx);
        }

        req.locals.ecl.close();
        return result;
    }

    // prettier-ignore
    private async _getTxData(txObjext: ParsedTx, req: any): Promise<{ value: string, fee: string }> {
        if (txObjext.inputs.length > 20 || (txObjext.inputs.length <= 0 && txObjext.outputs.length <= 0)) {
            // too match inputs to calculate
            return {
                value: '...',
                fee: '...',
            };
        }

        const inputs = await this._parseCoreInputs(txObjext, req);

        const totalOut = txObjext.outputs.reduce((acc, out) => acc + Number(out.satoshis), 0);
        const myIn = txObjext.outputs //
            .filter(out => out.script === this._scriptHEX)
            .reduce((acc, out) => acc + Number(out.satoshis), 0);

        const totalIn = inputs.reduce((acc, out) => acc + Number(out.satoshis), 0);
        const myOut = inputs //
            .filter(out => out.script === this._scriptHEX)
            .reduce((acc, out) => acc + Number(out.satoshis), 0);

        const fee = totalIn - totalOut;

        return {
            fee: fee + '',
            value: myIn - myOut + fee + '',
        };
    }

    private _parseCoreInputs(txObjext: ParsedTx, req: any): Promise<Array<{ satoshis: number; script: string }>> {
        const result: Promise<{ satoshis: number; script: string }>[] = [];
        txObjext.inputs
            .forEach(input => {
                const txPromise = req.locals.ecl.blockchainTransaction_get(input.prevTxId, null, null).then(
                    (rawTx: string) => {
                        const txObj: ParsedTx = new this._bitcore.Transaction(rawTx).toObject();
                        return txObj.outputs[input.outputIndex];
                    }
                );
                result.push(txPromise);
            });

        return Promise.all(result);
    }

    private _getScript(address: Address): Script {
        return this._bitcore.Script.buildPublicKeyHashOut(address);
    }

    private _getScriptHash(script: Script): string {
        const bitcore = this._bitcore;

        const scriptBuffer = script.toBuffer();
        const scriptHash = bitcore.crypto.Hash.sha256(scriptBuffer);
        const reversedHash = Buffer.from(scriptHash.reverse());

        return reversedHash.toString('hex');
    }

    private _getPrivateKey(userString: string): PrivateKey {
        const bitcore = this._bitcore;

        const buf = Buffer.from(userString);
        const hashBuffer = bitcore.crypto.Hash.sha256(buf);
        const bn = bitcore.crypto.BN.fromBuffer(hashBuffer);

        return new bitcore.PrivateKey(bn, this._getNetConfig());
    }

    private _getNetConfig(): BitcoreNetworkLike {
        if (this.netMode == NetmodeTypeEnum.TESTNET) {
            return this._bitcore.Networks.testnet;
        }
        return this._bitcore.Networks.mainnet;
    }

}

interface BitcoreNetworkLike {
    name: string;
    alias: string;
    pubkeyhash: number;
    privatekey: number;
    scripthash: number;
    xpubkey: number;
    xprivkey: number;
    networkMagic: number;
    port: number;
    dnsSeeds: string[];
}

interface ParsedTx {
    hash: string;
    version: number;
    inputs: Array<{
        prevTxId: string;
        outputIndex: number;
        sequenceNumber: number;
        script: string;
        scriptString: string;
    }>;
    outputs: Array<{
        satoshis: number;
        script: string;
    }>;
    nLockTime: number;
}
