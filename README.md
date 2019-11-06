# README

# Electrum Proxy Middleware

ExpressJS middleware to add functionality for proxying requests to Electrum servers

## Requirements

Node >= 7.x

### Installing

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

## Example
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
    **Content:** `{"status":"success","result":["ElectrumX 1.13.0","1.4"]}`
 
* **Error Response:**

  * **Code:** 409 <br />
    **Content:** `{"error":[{"target":{"netMode":"mainnet","coinType":"etc"},"value":"etc","property":"coinType","children":[],"constraints":{"isEnum":"coinType must be a valid enum value"}}]}`

