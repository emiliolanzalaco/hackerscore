// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import {Script} from "forge-std/Script.sol";
import {IEAS} from "eas-contracts/IEAS.sol";
import {HackerScoreResolver} from "../src/HackerScoreResolver.sol";

contract Deploy is Script {
    function run() external {
        new HackerScoreResolver(0x4200000000000000000000000000000000000021);
    }
}
