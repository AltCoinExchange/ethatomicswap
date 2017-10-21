
var AbiConfig = require("../abi/atomicswap");
var AppConfig = require("../config");
var AtomicSwap = require("../modules/atomicswap");
var Common = require("../modules/common");

var secret = (new Common()).GenerateSecret();

// Init
var atomicSwap = new AtomicSwap(AbiConfig, AppConfig.hosts[0]);
try {
    atomicSwap.Initiate(7200, "0x" + secret.hashedSecret, AppConfig.hosts[1].defaultWallet, 10, 2000000).then(function (result) {
        console.log("Generated initial transaction: " + result);
    });

    atomicSwap.Participate(7200, "0x" + secret.hashedSecret, AppConfig.hosts[1].defaultWallet, 10, 2000000).then(function (result) {
        console.log("Participated with transaction number: " + result);
    }).catch(function(err) {
        console.log(err);
    });
} catch (e) {
    console.log(e);
}

