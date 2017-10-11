/**
 * Atomic swap class
 * 
 * @author Djenad Razic
 * @company Altcoin Exchange, Inc.
 */
var AtomicSwap = function (configuration, appConfiguration) {
    this.config = configuration;
    this.appConfig = appConfiguration;
    this.web3 = null;
    this.contract = null;
    var Web3 = require("web3");

    this.construct = function() {
        this.web3 = new Web3(new Web3.providers.HttpProvider(this.appConfig.rpchost));
        this.contract = new this.web3.eth.Contract(this.config, this.appConfig.contractAddress);
    };

    this.construct();

    /**
     * Initiate atomic swap transfer
     * @param address - Participant address
     * @param amount - Amount to transfer
     * @constructor
     */
    this.Initiate = function(refundTime, secret, address) 
    {

    };

    /**
     * Participate to atomic swap transfer
     * @param address - Initiator address
     * @param amount - Amount to transfer
     * @param secret - Secret hash
     */
    this.Participate = function (address, amount, secret) 
    {

    };

    /**
     *
     * Secret: secret
     */

    /**
     * Redeem funds with given secret
     * @param secret - Secret hash
     */
    this.Redeem = function (secret) 
    {
        
    };

    /**
     * Refund contract transaction
     * @param secret - Secret hash
     */
    this.Refund = function (secret) 
    {

    };

    /**
     * Extract secret from initiator's redemption transaction
     * Secret: secret
     * @param secret - Secret hash
     */
    this.ExtractSecret = function(secret)
    {

    };

    /**
     * Inspect contract
     * @oaram secret - Secret hash
     */
    this.AuditContract = function(secret) 
    {
        
    }        
};

module.exports = AtomicSwap;