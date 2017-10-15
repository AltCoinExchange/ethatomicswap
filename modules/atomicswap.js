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
    this.clone = require("clone");

    var Web3 = require("web3");

    var getFunctionAbi = function(abi, name) {
        for (var i = 0; i < abi.length; i++) {
            if (abi[i].name == name)
                return abi[i];
        }
    };

    /**
     * Call contract function
     * @param name
     * @param address
     * @param params
     * @param generalParams
     */
    this.callFunction = function(name, address, params, generalParams) {

        var functionAbi = this.clone(getFunctionAbi(this.config, name));
        var contract = new this.web3.eth.Contract(this.config, this.appConfig.contractAddress);

        var funcObj = {};

        funcObj._method = functionAbi;
        funcObj._parent = contract;
        funcObj.encodeABI = contract._encodeMethodABI.bind(funcObj);
        funcObj.arguments = params;

        return new Promise(function (resolve, reject) {
            contract._executeMethod.call(funcObj, 'send', generalParams, function (err, result) {
                if (err)
                    reject(err);
                else
                    resolve(result);
            })
            .on('receipt', function(result){
                console.log(result);
                resolve(result);
            }).catch(function(err) {
                console.log(err);
                reject(err);
            });
        });

        //return deploy;
    };

    this.construct = function() {
        this.web3 = new Web3(new Web3.providers.HttpProvider(this.appConfig.rpchost));
        this.web3.defaultAccount = this.appConfig.defaultWallet;
        // Need to init first since it is throwing exception
        this.contract = new this.web3.eth.Contract(this.config, this.appConfig.contractAddress);
    };

    this.construct();

    /**
     * Initiate atomic swap transfer
     * @param refundTime
     * @param secret - Secret hash
     * @param address - Participant address
     * @param amount - Amount to transfer
     * @param gasPrice - Maximum GAS to spend
     * @constructor
     */
    this.Initiate = function(refundTime, secret, address, amount, gasPrice)
    {
        return this.callFunction("initiate", address,
            [refundTime, secret, address],
            // TODO: Parse values
            {from: this.appConfig.defaultWallet, gasPrice: gasPrice, value: this.web3.utils.toWei(amount, 'milliether') }
            );
    };

    /**
     * Participate to atomic swap transfer
     * @param refundTime
     * @param secret - Secret hash
     * @param address - Participant address
     */
    this.Participate = function (refundTime, secret, address)
    {
        return this.callFunction("participate", address,
            [refundTime, secret, address],
            // TODO: Parse values
            {from: this.appConfig.defaultWallet});
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