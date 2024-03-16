// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {SchemaResolver} from "eas-contracts/resolver/SchemaResolver.sol";
import {ISchemaResolver} from "eas-contracts/resolver/ISchemaResolver.sol";
import {ISchemaRegistry} from "eas-contracts/ISchemaRegistry.sol";
import {IEAS, Attestation} from "eas-contracts/IEAS.sol";
import {Registration, Cred} from "./types/Attestations.sol";
import {console} from "forge-std/console.sol";

contract HackerScoreResolver is SchemaResolver {
    mapping(address => uint256) public hackerScores;
    mapping(address => bytes32) public nullifierHashes;
    bytes32 public immutable registrationSchemaUID;
    bytes32 public immutable hackerCredSchemaUID;
    IEAS public immutable eas;

    error NotRegistered(address user);
    error InvalidSchemaUID();

    constructor(address eas_) SchemaResolver(IEAS(eas_)) {
        registrationSchemaUID = ISchemaRegistry(0x4200000000000000000000000000000000000020).register(
            "bytes32 nullifierHash", ISchemaResolver(address(this)), true
        );
        hackerCredSchemaUID = ISchemaRegistry(0x4200000000000000000000000000000000000020).register(
            "uint256 score, string description", ISchemaResolver(address(this)), true
        );
    }

    function onAttest(Attestation calldata attestation, uint256) internal override returns (bool) {
        if (attestation.schema == registrationSchemaUID) {
            _onRegistration(attestation);
            return true;
        } else if (attestation.schema == hackerCredSchemaUID) {
            _onCred(attestation);
            return true;
        } else {
            revert InvalidSchemaUID();
        }
    }

    function onRevoke(Attestation calldata attestation, uint256) internal override returns (bool) {}

    function _onRegistration(Attestation calldata attestation) private {
        Registration memory registration = abi.decode(attestation.data, (Registration));

        // verify the world ID proof
        nullifierHashes[attestation.attester] = registration.nullifierHash;
    }

    function _onCred(Attestation calldata attestation) private {
        Cred memory cred = abi.decode(attestation.data, (Cred));
        if (!isRegistered(attestation.attester)) {
            revert NotRegistered(attestation.attester);
        }
        if (!isRegistered(attestation.recipient)) {
            revert NotRegistered(attestation.recipient);
        }
        hackerScores[attestation.recipient] += cred.score;
    }

    function isRegistered(address user) public view returns (bool) {
        return nullifierHashes[user] != bytes32(0);
    }
}
