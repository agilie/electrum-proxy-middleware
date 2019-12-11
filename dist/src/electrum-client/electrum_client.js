var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Client = require("./client");
var _ElectrumClient = /** @class */ (function (_super) {
    __extends(_ElectrumClient, _super);
    function _ElectrumClient(port, host, protocol, options) {
        return _super.call(this, port, host, protocol, options) || this;
    }
    _ElectrumClient.prototype.onClose = function () {
        var _this = this;
        _super.prototype.onClose.call(this);
        var list = [
            'server.peers.subscribe',
            'blockchain.numblocks.subscribe',
            'blockchain.headers.subscribe',
            'blockchain.address.subscribe'
        ];
        list.forEach(function (event) { return _this.subscribe.removeAllListeners(event); });
    };
    _ElectrumClient.prototype.server_version = function (client_name, protocol_version) {
        return this.request('server.version', [client_name, protocol_version]);
    };
    _ElectrumClient.prototype.server_features = function () {
        return this.request('server.features', []);
    };
    _ElectrumClient.prototype.server_banner = function () {
        return this.request('server.banner', []);
    };
    _ElectrumClient.prototype.server_ping = function () {
        return this.request('server.ping', []);
    };
    _ElectrumClient.prototype.server_addPeer = function (features) {
        return this.request('server.add_peer', [features]);
    };
    _ElectrumClient.prototype.serverDonation_address = function () {
        return this.request('server.donation_address', []);
    };
    _ElectrumClient.prototype.serverPeers_subscribe = function () {
        return this.request('server.peers.subscribe', []);
    };
    _ElectrumClient.prototype.blockchainAddress_getProof = function (address) {
        return this.request('blockchain.address.get_proof', [address]);
    };
    _ElectrumClient.prototype.blockchainScripthash_getBalance = function (scripthash) {
        return this.request('blockchain.scripthash.get_balance', [scripthash]);
    };
    _ElectrumClient.prototype.blockchainScripthash_getHistory = function (scripthash) {
        return this.request('blockchain.scripthash.get_history', [scripthash]);
    };
    _ElectrumClient.prototype.blockchainScripthash_getMempool = function (scripthash) {
        return this.request('blockchain.scripthash.get_mempool', [scripthash]);
    };
    _ElectrumClient.prototype.blockchainScripthash_listunspent = function (scripthash) {
        return this.request('blockchain.scripthash.listunspent', [scripthash]);
    };
    _ElectrumClient.prototype.blockchainScripthash_subscribe = function (scripthash) {
        return this.request('blockchain.scripthash.subscribe', [scripthash]);
    };
    _ElectrumClient.prototype.blockchainScripthash_unsubscribe = function (scripthash) {
        return this.request('blockchain.scripthash.unsubscribe', [scripthash]);
    };
    _ElectrumClient.prototype.blockchainBlock_getHeader = function (height, protocolVersion) {
        return this.request(protocolVersion && Number(protocolVersion) === 1.4 ? 'blockchain.block.header' : 'blockchain.block.get_header', [height]);
    };
    _ElectrumClient.prototype.blockchainBlock_headers = function (start_height, count) {
        return this.request('blockchain.block.headers', [start_height, count]);
    };
    _ElectrumClient.prototype.blockchainEstimatefee = function (number) {
        return this.request('blockchain.estimatefee', [number]);
    };
    _ElectrumClient.prototype.blockchainHeaders_subscribe = function () {
        return this.request('blockchain.headers.subscribe', []);
    };
    _ElectrumClient.prototype.blockchain_relayfee = function () {
        return this.request('blockchain.relayfee', []);
    };
    _ElectrumClient.prototype.blockchainTransaction_broadcast = function (rawtx) {
        return this.request('blockchain.transaction.broadcast', [rawtx]);
    };
    _ElectrumClient.prototype.blockchainTransaction_get = function (tx_hash, verbose) {
        return this.request('blockchain.transaction.get', [tx_hash, verbose ? verbose : false]);
    };
    _ElectrumClient.prototype.blockchainTransaction_getMerkle = function (tx_hash, height) {
        return this.request('blockchain.transaction.get_merkle', [tx_hash, height]);
    };
    _ElectrumClient.prototype.blockchainTransaction_idFromPos = function (tx_hash, height, merkle) {
        return this.request('blockchain.transaction.id_from_pos', [tx_hash, height, merkle]);
    };
    _ElectrumClient.prototype.mempool_getFeeHistogram = function () {
        return this.request('mempool.get_fee_histogram', []);
    };
    // ---------------------------------
    // protocol 1.1 deprecated method
    // ---------------------------------
    _ElectrumClient.prototype.blockchainUtxo_getAddress = function (tx_hash, index) {
        return this.request('blockchain.utxo.get_address', [tx_hash, index]);
    };
    _ElectrumClient.prototype.blockchainNumblocks_subscribe = function () {
        return this.request('blockchain.numblocks.subscribe', []);
    };
    // ---------------------------------
    // protocol 1.2 deprecated method
    // ---------------------------------
    _ElectrumClient.prototype.blockchainBlock_getChunk = function (index) {
        return this.request('blockchain.block.get_chunk', [index]);
    };
    _ElectrumClient.prototype.blockchainAddress_getBalance = function (address) {
        return this.request('blockchain.address.get_balance', [address]);
    };
    _ElectrumClient.prototype.blockchainAddress_getHistory = function (address) {
        return this.request('blockchain.address.get_history', [address]);
    };
    _ElectrumClient.prototype.blockchainAddress_getMempool = function (address) {
        return this.request('blockchain.address.get_mempool', [address]);
    };
    _ElectrumClient.prototype.blockchainAddress_listunspent = function (address) {
        return this.request('blockchain.address.listunspent', [address]);
    };
    _ElectrumClient.prototype.blockchainAddress_subscribe = function (address) {
        return this.request('blockchain.address.subscribe', [address]);
    };
    return _ElectrumClient;
}(Client));
//module.exports = _ElectrumClient;
var client = _ElectrumClient;
module.exports = {
    get ElectrumClient() {
        return client;
    },
    overrideClient: function (override) {
        client = override;
    }
};
