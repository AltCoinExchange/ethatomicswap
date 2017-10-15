
var AbiConfig = require("../abi/atomicswap");
var AppConfig = require("../config");
var AtomicSwap = require("../modules/atomicswap");
var Common = require("../modules/common");

var secret = (new Common()).GenerateSecret();

// Init
var atomicSwap = new AtomicSwap(AbiConfig, AppConfig.hosts[0]);
// TODO: create full transaction
//var atomicSwap2 = new AtomicSwap(AbiConfig, AppConfig.hosts[1]);

try {
    atomicSwap.Initiate(7200, "0x" + secret.hashedSecret, AppConfig.hosts[0].defaultWallet, 0, 7000).then(function (result) {
        console.log("Generated initial transaction: " + result);
    });
    atomicSwap.Participate(7200, "0x" + secret.hashedSecret, AppConfig.hosts[1].defaultWallet).then(function (result) {
        console.log("Participated with transaction number: " + result);
    }).catch(function(err) {
        console.log(err);
    });
} catch (e) {
    console.log(e);
}

