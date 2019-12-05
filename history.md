### Getting history
#### [GET] /history/get_history 

Return the confirmed and unconfirmed history of a script hash.

Param | Description
------------ | -------------
**coinType** (required) |   [supported coin types](https://github.com/agilie/electrum-proxy-middleware/blob/master/src/service/wallet/types/coin.type.ts)
**address** (required) |  donation address
**page** |  number of page
**pageSize** |  transactions per page

```
curl -X GET 'http://localhost:3000/history/get_history?address=1BWwXJH3q6PRsizBkSGm2Uw4Sz1urZ5sCj&coinType=btc&page=1&pageSize=3''
> {"status":"success","result":[{"value":"0.01006206","timestamp":1476531663000,"fee":"0.00006206","status":"completed"},{"value":"0.01254679","timestamp":1476538487000,"fee":"0.00024679","status":"completed"},{"value":"0.47066022","timestamp":1476610485000,"fee":"0.00011628","status":"completed"}],"time":582.656917}
```

or

Param | Value
------------ | -------------
**coinType** (required) |   [supported coin types](https://github.com/agilie/electrum-proxy-middleware/blob/master/src/service/wallet/types/coin.type.ts)
**host** (required) | e.g. **tn.not.fyi**
**port** (required)| e.g. **55002**
**connectionType** (required) | **ssl** or **tcp**
**version** (required) | e.g **1.4**
**netMode** | **mainnet** (by default) or **testnet**
**page** |  number of page
**pageSize** |  transactions per page

```
curl -X GET 'http://localhost:3000/history/get_history?port=55002&host=tn.not.fyi&connectionType=ssl&version=1.4&address=1BWwXJH3q6PRsizBkSGm2Uw4Sz1urZ5sCj&coinType=btc'
```

