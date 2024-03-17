// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

struct Registration {
    bytes32 nullifierHash;
}

struct Cred {
    uint256 score;
    bytes32 description;
}
