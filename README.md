# README

# Electrum Proxy Middleware

ExpressJS middleware to add functionality for proxying requests to Electrum servers

## Agenda
Web applications can't communicate with electrum servers. This package provide ability to make requests to them.

- [Requirements](#requirements)
- [Getting started](#getting_started)
- [Running the tests](#running_test)
- [Supported calls](#supported_calls)
    - [Server methods](#server_methods)
    - [Getting history](https://github.com/agilie/electrum-proxy-middleware/blob/master/history.md)
    - [Blockchain methods](#blockchain_methods)
    - [Getting history](#getting_history)
    - [Mempool methods](#mempool_methods)
    - [Scripthash methods](#scripthash_methods)
    - [Transaction methods](#transaction_methods)

- [Examples](#examples)

- [License](#license)

<a name="requirements"></a>
## Requirements

Node >= 7.x

<a name="getting_started"></a> 
## Getting started

```
npm install @agilie/electrum-proxy-middleware
```

```
const electrum = require('@agilie/electrum-proxy-middleware');

app.use(electrum.router);

app.listen(3000)
```

```
curl -X GET http://localhost:3000/server/version?coinType=btc
> {"status":"success","result":["ElectrumX 1.13.0","1.4"]}

or

curl -X GET 'http://localhost:3000/server/version?port=55002&host=tn.not.fyi&connectionType=ssl&version=1.4'
> {"status":"success","result":["ElectrumX 1.13.0","1.4"]}
```

<a name="running_test"></a> 
## Running the tests

```
npm test
```

<a name="supported_calls"></a> 
## Supported calls

All calls are required to have a coinType param or at least host, port, connectionType and version params.


Param | Value
------------ | -------------
**coinType** (required) | [supported coin types](https://github.com/agilie/electrum-proxy-middleware/blob/master/src/service/wallet/types/coin.type.ts)
**netMode** | **mainnet**(by default) or **testnet**

or

Param | Value
------------ | -------------
**host** (required) | e.g. **tn.not.fyi**
**port** (required)| e.g. **55002**
**connectionType** (required) | **ssl** or **tcp**
**version** (required) | e.g **1.4**
**netMode** | **mainnet** (by default) or **testnet**

<a name="server_methods"></a> 
### Server methods
#### [GET] /server/version eq. to server.version
#### [GET] /server/features eq. to server.features
#### [GET] /server/banner eq. to server.banner
#### [GET] /server/donation-address eq. to server.donation_address
#### [GET] /server/add_peer eq. to server.add_peer
#### [GET] /server/get-peers eq. to server.peers.subscribe
#### [GET] /server/ping eq. to server.ping
**Example:** */server/version?coinType=btc*

<a name="blockchain_methods"></a> 
### Blockchain methods
#### [GET] /block/header eq. to blockchain.block.header
Additional params:

Param  | Type | Description
------------ | ------------- | -------------
version | Float | server version
height | non-negative integer | the height of the block

**Example:** */block/header?coinType=btc&height=5*
#### [GET] /block/headers eq. to blockchain.block.headers
Additional params: start_height - the height of the first header requested, count - the number of headers requested.  
**Example:** */block/headers?&coinType=btc&start_height=5&count=1*
#### [GET] /blockchain/estimatefee eq. to blockchain.estimatefee
Additional params:

Param | Description
------------ | -------------
blocks |  the number of blocks to target for confirmation

**Example:** */blockchain/estimatefee?coinType=btc&blocks=1*
#### [GET] /blockchain/relayfee eq. to blockchain.relayfee
Example: */blockchain/relayfee?coinType=btc*

<a name="mempool_methods"></a>
### Mempool methods
#### [GET] /mempool/get_fee_histogram eq. to mempool.get_fee_histogram
**Example:** */mempool/get_fee_histogram?coinType=btc*

<a name="scripthash_methods"></a>
### Scripthash methods

Param | Type | Description
------------ | ------------- | -------------
scripthash |hexadecimal string |  script hash 

#### [GET] /scripthash/balance eq. to blockchain.scripthash.get_balance
#### [GET] /scripthash/listunspent eq. to blockchain.scripthash.listunspent
#### [GET] /scripthash/get_history eq. to blockchain.scripthash.get_history
#### [GET] /scripthash/get_mempool eq. to blockchain.scripthash.get_mempool
**Example:** */scripthash/balance?scripthash=20b360e68b4fe6d1eb460e45434f756fa1582ed687167898f9a716435ecd737f&coinType=btc*

<a name="transaction_methods"></a>
### Transaction methods
#### [POST] /transaction/broadcast eq. to blockchain.transaction.broadcast
Additional params:

Param | Type | Description
------------ | ------------- | -------------
raw_tx |  hexadecimal string | raw transaction

#### [GET] /transaction/get eq. to blockchain.transaction.get
Additional params: 

Param | Type | Description
------------ | ------------- | -------------
tx_hash | hexadecimal string | transaction hash
 verbose | boolean | whether a verbose coin-specific response is required
 
**Example:** */transaction/get?tx_hash=871af2528c83ba90bd7b3fbfeac703cbd20f204f1b800ba4ec748842fcac0c9b&coinType=btc*
#### [GET] /transaction/get-merkle eq. to blockchain.transaction.get_merkle
Additional params:

Param | Type | Description
------------ | ------------- | -------------
tx_hash | hexadecimal string | raw transaction
height | integer | the height at which it was confirmed

#### [GET] /transaction/id-from-pos eq. to blockchain.transaction.id_from_pos
Additional params:

Param | Type | Description
------------ | ------------- | -------------
height |  non-negative integer | the main chain block height
tx_pos | integer | a zero-based index of the transaction in the given block
merkle | boolean | whether a merkle proof should also be returned

### Getting history
 [Getting history](https://github.com/agilie/electrum-proxy-middleware/blob/master/history.md) docs.

<br/>

For more details, refer to the [ElectrumX Protocol Methods](https://electrumx.readthedocs.io/en/latest/protocol-methods.html) docs.

<a name="examples"></a>
## Examples
 Here are some basic examples. 

#### Protocol version
  
* **URL**

  <_/server/version?coinType=btc_>

* **Method:**

  `GET`
  
*  **URL Params**


   **Required:**
 
   `coinType=[CoinType]`

   **Optional:**
 
   `netMode=[Netmode]`

* **Success Response:**
  
  * **Code:** 200 <br />
  *  **Content:** 
    <pre>  {
        "status":"success","result":["ElectrumX 1.13.0","1.4"]
    }</pre>
 
* **Error Response:**

  * **Code:** 409 <br />
  *  **Content:** 
    <pre>{
        "error": [{
            "target": {
                "netMode": "mainnet",
                "coinType": "etc"
            },
            "value": "etc",
            "property": "coinType",
            "children": [],
            "constraints": {
                "isEnum": "coinType must be a valid enum value"
            }
        }]
    }</pre>


Or you can specify electrum server:

  
* **URL**

  <_/server/version?port=55002&host=tn.not.fyi&connectionType=ssl&version=1.4_>

* **Method:**

  `GET`
  
*  **URL Params**


   **Required:**
 
   `port=[integer]`
   
   `host=[string]`
   
   `connectionType=[ssl | tcp]`
   
   `version=[server version]`

   **Optional:**
 
   `netMode=[testnet | mainnet]`


#### Confirmed and unconfirmed history of a script hash.

* **URL**

  <_/history/get_history?address=1BWwXJH3q6PRsizBkSGm2Uw4Sz1urZ5sCj&coinType=btc&page=1&pageSize=2_>

* **Method:**

  `GET`
  
*  **URL Params**


   **Required:**
 
   `coinType=[CoinType]`
   
   `address=[string]`

   **Optional:**
 
   `netMode=[Netmode]`
   
   `page=[number]`
   
   `pageSize=[number]`

* **Success Response:**
  
  * **Code:** 200 <br />
  *  **Content:** 
    <pre>
    {
      "status": "success",
      "result": [{
          "value": "0.0002",
          "timestamp": 1399325126000,
          "fee": "0.0001",
          "status": "completed"
      }, {
          "value": "0.00011",
          "timestamp": 1399325126000,
          "fee": "0.0001",
          "status": "completed"
      }],
       "time": 336.57917699999996
    }</pre>
 
* **Error Response:**

  * **Code:** 409 <br />
  *  **Content:** 
    <pre>{
        "error": [{
            "target": {
                "netMode": "test",
                "address": "8b01df4e368ea28f8dc0423bcf77a4923e3a12d307c875e47a0cfbf90b5c39161",
                "coinType": "btc",
                "page": "1",
                "pageSize": "2"
            },
            "value": "test",
            "property": "netMode",
            "children": [],
            "constraints": {
                "isEnum": "netMode must be a valid enum value"
            }
        }]
    }</pre>

<a name="license"></a>
## License
The MIT License (MIT). Full license text is available in [LICENSE](https://github.com/agilie/electrum-proxy-middleware/blob/master/LICENSE.md).
