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
    "initiate <refundTime> <hashedSecret> <participantAddress> <amount> \n" +
    "participate <refundTime> <hashedSecret> <initiatorAddress> <amount> \n" +
    "redeem <secret> <hashedSecret> \n" +
    "refund <hashedSecret> \n";

// Available commands
var _commands = ["initiate", "participate", "redeem", "refund"];

argv._[0] = argv._[0].toLowerCase();

// Check for available commands
if (_commands.indexOf(argv._[0]) == -1) {
    console.log(help);
    return;
}

try {
    var swap = new AtomicSwap(AbiConfig, AppConfig.hosts[0]);
    if (argv._[0] == "initiate")
        swap.Initiate(argv._[1], argv._[2], argv._[3], argv._[4], argv._[5]).then(function(result) {
            console.log("Initiated with transaction number: " + result);
        });
    else if (argv._[0] == "participate")
        swap.Participate(argv._[1], argv._[2], argv._[3], argv._[4], argv._[5]).then(function(result) {
            console.log("Participated with transaction number: " + result);
        });
    else if (argv._[0] == "redeem")
        swap.Redeem(argv._[1], argv._[2], argv._[3]).then(function(result) {
            console.log("Redeemed with transaction number: " + result);
        });
    else if (argv._[0] == "refund")
        swap.Refund(argv._[1], argv._[2]).then(function(result) {
            console.log("Refunded with transaction number: " + result);
        });

} catch (e) {
    console.log(e);
}
