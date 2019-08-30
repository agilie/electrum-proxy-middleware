
// tslint:disable-next-line:no-var-requires
import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {CoinMap, CoinType} from "./wallet/types/coin.type";

const cache = require('nativescript-cache');
// tslint:disable-next-line:no-var-requires
require('nativescript-websockets');

@Injectable({
    providedIn: 'root',
})
export class PriceProviderService {
    KRAKEN_SOCKET_URL = 'wss://ws.kraken.com';
    CACHE_NAME = 'priceCache';
    UPDATE_INTERVAL = 15 * 60 * 1000; // 15min

    price$ = new BehaviorSubject<CoinMap<number>>(this._readCached());

    private _apiCodes = {
        3: [CoinType.BTC],
        94: [CoinType.ETH],
        68: [CoinType.LTC],
        588: [CoinType.DASH],
        367: [CoinType.ZEC],
    };

    private _socket: WebSocket;

    private _expectedData: number[];

    constructor() {}

    watchForPrice(): void {
        this._expectedData = Object.keys(this._apiCodes).map(k => Number(k));

        this._socket = new WebSocket(this.KRAKEN_SOCKET_URL);
        this._socket.onopen = this._subscribeForPrices.bind(this);
        this._socket.onclose = this._handleClose.bind(this);
        this._socket.onmessage = this._handleMessage.bind(this);
        this._socket.onerror = this._handleError.bind(this);
    }

    private _readCached(): CoinMap<number> {
        let priceCache: CoinMap<number>;

        try {
            const priceJson = cache.get(this.CACHE_NAME);
            priceCache = JSON.parse(priceJson);
        } catch (e) {
            console.log('read cache error', e);
        }

        const defaultValues = {
            [CoinType.ETH]: 0,
            [CoinType.BTC]: 0,
            [CoinType.LTC]: 0,
            [CoinType.DASH]: 0,
            [CoinType.ZEC]: 0,
        };

        return priceCache || defaultValues;
    }

    private _closeChannel(): void {
        try {
            this._socket.close();
            this._socket = null;
        } catch (e) {
            console.log('close socket error', e);
        }
        setTimeout(this.watchForPrice.bind(this), this.UPDATE_INTERVAL);
    }

    private _subscribeForPrices(): void {
        const priceSubscribeMessage: SubscribeForPriceEvent = {
            event: 'subscribe',
            pair: [
                'BTC/USD', //
                'ETH/USD',
                'LTC/USD',
                'DASH/USD',
                'ZEC/USD',
            ],
            subscription: {
                name: 'spread',
            },
        };

        this._socket.send(JSON.stringify(priceSubscribeMessage));
    }

    private _handleMessage(event: MessageEvent): void {
        try {
            const data = JSON.parse(event.data);
            //
            if (this._isPriceValid(data)) {
                const currency = data[0];
                const price = data[1][0];

                if (!this._expectedData.includes(currency)) {
                    return; // no reason to handle something we didn't expect
                }

                const currencyName = this._apiCodes[currency];

                const prices = this.price$.getValue();
                prices[currencyName] = Number(price);
                this.price$.next(prices);

                this._updateCache();

                this._expectedData = this._expectedData.filter(v => v !== currency);

                if (this._expectedData.length === 0) {
                    this._closeChannel(); // after we receive all prices => unsubscribe
                }
            }
        } catch (e) {
            console.log('***** err *****');
            console.log('***** err *****');
            console.log('***** err *****');
            console.log('Received data seems to be incorrect');
            console.log(event.data, e);
            console.log('***** err *****');
            console.log('***** err *****');
            console.log('***** err *****');
        }
    }

    private _handleError(error: Event): void {
        console.log('socket error', error);
        this._closeChannel();
    }

    // for debug only
    private _handleClose(event: CloseEvent): void {
        // if (event.wasClean) {
        //     console.log('Connection closed');
        // } else {
        //     console.log('Connection terminated');
        // }
        // console.log('Code:', event.code, 'Reason:', event.reason);
    }

    private _updateCache(): void {
        cache.set(this.CACHE_NAME, JSON.stringify(this.price$.getValue()));
    }

    private _isPriceValid(data: any): boolean {
        return (
            data[1] && // TODO add tests
            data[1][0] &&
            !Number.isNaN(data[1][0]) &&
            data[1][0] > 0
        );
    }
}

interface SubscribeForPriceEvent {
    event: string;
    pair: string[];
    subscription: {
        name: string;
    };
}
