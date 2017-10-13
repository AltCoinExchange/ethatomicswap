/**
 * Ethereum atomic swaps
 *
 * @author Djenad Razic
 * @company Altcoin Exchange, Inc.
 */

var AbiConfig = require("../abi/atomicswap");
var AppConfig = require("../config");
var AtomicSwap = require("../modules/atomicswap");

// Get arguments
var argv = require('minimist')(process.argv.slice(2), opts={string:"_"});

var help = "Usage: ethatomicswap [cmd] [params] \n\n" +
    "initiate <refundTime> <hashedSecret> <participantAddress> <amount> <gasPrice> \n" +
    "participate <secret> <initiatorAddress> \n" +
    "redeem <secret> <hashedSecret> \n" +
    "refund <hashedSecret> \n";

// Available commands
var _commands = ["initiate", "participate", "redeem", "refund"];

// Check for available commands
if (_commands.indexOf(argv._[0]) == -1) {
    console.log(help);
    return;
}

try {
    var swap = new AtomicSwap(AbiConfig, AppConfig);
    if (argv._[0] == "initiate")
        swap.Initiate(argv._[1], argv._[2], argv._[3], argv._[4], argv._[5]);

} catch (e) {
    console.log(e);
}
