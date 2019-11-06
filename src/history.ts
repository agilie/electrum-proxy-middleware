import {WalletBtc} from './service/wallet/wallet.btc';
import {WalletCreateOptionsInterface} from './service/wallet/common/wallet-create-options.interface';
import {WalletLtc} from './service/wallet/wallet.ltc';
import {WalletDash} from './service/wallet/wallet.dash';
import {WalletZec} from './service/wallet/wallet.zec';
import {WalletLike} from './service/wallet/common/wallet.interface';
import {CoinType} from './service/wallet/types/coin.type';

import {AsyncRouter} from 'express-async-router';
import {HistoryReqDTO} from './electrum-client/types/history-req-dto';
import {plainToClass} from 'class-transformer';
import {validateOrReject} from 'class-validator';
const asyncRouter = AsyncRouter();

asyncRouter.get('/get_history', async (req: any, res: any) => {
    return await getHistoryHandler(req, res);
});

async function getHistoryHandler(req: any, res: any) {
    const historyReqDTO: HistoryReqDTO = plainToClass(HistoryReqDTO, req.query);
    await validateOrReject(historyReqDTO);

    const options : WalletCreateOptionsInterface = getHistoryOptions(historyReqDTO);
    const wallet = getWallet(historyReqDTO.coinType, options);
    const {result, executionTime} = await getHistory(wallet, historyReqDTO.page, historyReqDTO.pageSize, req);

    return res.json({
        status: 'success',
        result: result,
        time: executionTime.time,
    });
}

function getHistoryOptions(historyReqDTO: HistoryReqDTO) : WalletCreateOptionsInterface {
    return {
        userString: '',
        netMode: historyReqDTO.netMode,
        type: historyReqDTO.coinType,
        bitcore: null,
    };
}

function getWallet(coinType: string, options: WalletCreateOptionsInterface): WalletLike {
    let wallet: WalletLike;
    switch (coinType) {
        case CoinType.BTC: {
            wallet = new WalletBtc(options);
            break;
        }
        case CoinType.LTC: {
            wallet = new WalletLtc(options);
            break;
        }
        case CoinType.DASH: {
            wallet = new WalletDash(options);
            break;
        }
        case CoinType.ZEC: {
            wallet = new WalletZec(options);
            break;
        }
    }
    return wallet;
}

async function getHistory(wallet: WalletLike, page: number, pageSize: number, req: any) {
    const perf = require('execution-time')();
    perf.start();
    const result = await wallet.getHistory(page, pageSize, req);
    const timeResult = perf.stop();
    return {result, executionTime: timeResult};
}

const router = asyncRouter;
export {router, getHistoryHandler};

