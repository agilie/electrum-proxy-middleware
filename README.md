# README

# Electrum Proxy Middleware

ExpressJS middleware to add functionality for proxying requests to Electrum servers

## Requirements

Node >= 7.x

## Installing

```
npm install github:agilie/electrum-proxy-middleware
```

```
const electrum = require('electrum-proxy-middleware');

app.use(electrum.router);
```

## Running the tests

```
npm test
```

## Examples
 Here are some basic examples. For more details, refer to the ElectrumX Protocol Methods 
 [docs](https://electrumx.readthedocs.io/en/latest/protocol-methods.html).

  
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
    **Content:** 
    <pre>{
        "status":"success","result":["ElectrumX 1.13.0","1.4"]
    }</pre>
 
* **Error Response:**

  * **Code:** 409 <br />
    **Content:** 
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

* **URL**

  <_/history/get_history?address=1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa&coinType=btc&page=1&pageSize=2_>

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
    **Content:** 
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
    **Content:** 
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

