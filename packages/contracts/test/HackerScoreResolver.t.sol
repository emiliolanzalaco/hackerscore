// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Test} from "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import {HackerScoreResolver} from "../src/HackerScoreResolver.sol";
import {IEAS, AttestationRequest, AttestationRequestData, Attestation} from "eas-contracts/IEAS.sol";
import {Registration, Cred} from "../src/types/Attestations.sol";

contract HackerResolverTest is Test {
    HackerScoreResolver public hackerScoreResolver;
    IEAS public eas = IEAS(0x4200000000000000000000000000000000000021);
    bytes32 public registrationSchemaUID;
    bytes32 public hackerCredSchemaUID;
    address public user1 = vm.addr(1);
    address public user2 = vm.addr(2);

    error InvalidAttestation();

    function setUp() public {
        hackerScoreResolver = new HackerScoreResolver(address(eas));
        registrationSchemaUID = hackerScoreResolver.registrationSchemaUID();
        hackerCredSchemaUID = hackerScoreResolver.hackerCredSchemaUID();
    }

    function test_onRegister_validatesWorldIDProof() public {}

    function test_onRegister_canRegisterNewAddress() public {}

    function test_onRegister_revertsWhenInvalidWorldIDProof() public {}

    function test_onCred() public {
        uint256 score = 10;
        _attestRegistration(user1, address(0), bytes32("1"));
        _attestRegistration(user2, address(0), bytes32("1"));

        _attestCred(user1, user2, score, "is a 10x dev");

        assertEq(hackerScoreResolver.hackerScores(user2), score);
    }

    function test_onCred_revertsIfNotRegistered() public {
        vm.expectRevert(abi.encodeWithSelector(HackerScoreResolver.NotRegistered.selector, (user1)));
        _attestCred(user1, user2, 10, "is a 10x dev");
    }

    /// helpers

    function _attestCred(address attester, address recipient, uint256 score, string memory description) private {
        AttestationRequest memory request = AttestationRequest({
            schema: hackerCredSchemaUID,
            data: _makeAttestationData(recipient, abi.encode(Cred(score, description)))
        });

        vm.prank(attester);
        eas.attest(request);
    }

    function _attestRegistration(address attester, address recipient, bytes32 nullifierHash) private {
        AttestationRequest memory request = AttestationRequest({
            schema: registrationSchemaUID,
            data: _makeAttestationData(recipient, abi.encode(Registration(nullifierHash)))
        });
        vm.prank(attester);
        eas.attest(request);
    }

    function _makeAttestationData(address recipient, bytes memory data)
        private
        pure
        returns (AttestationRequestData memory)
    {
        return AttestationRequestData({
            data: data,
            value: 0,
            recipient: recipient,
            refUID: bytes32(0),
            revocable: true,
            expirationTime: type(uint64).max
        });
    }
}
