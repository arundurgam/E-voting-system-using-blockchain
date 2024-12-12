// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;

    event VoteEvent(uint indexed candidateId);

    constructor() {
        addCandidate("BJP");
        addCandidate("Congress");
        //change names to addCandidate("justin"); 
        //change names to addCandidate("gundu mani"); 
    }

    function addCandidate(string memory name) public {
        candidates[candidatesCount] = Candidate(name, 0);
        candidatesCount++;
    }

    function vote(uint candidateId) public {
        require(candidateId >= 0 && candidateId < candidatesCount, "Invalid candidate");

        candidates[candidateId].voteCount++;
        emit VoteEvent(candidateId);
    }

    function getCandidateNames() public view returns (string[] memory) {
        string[] memory names = new string[](candidatesCount);
        for (uint i = 0; i < candidatesCount; i++) {
            names[i] = candidates[i].name;
        }
        return names;
    }

    function uintToString(uint v) internal pure returns (string memory) {
        if (v == 0) {
            return "0";
        }
        uint temp = v;
        uint digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (v != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + v % 10));
            v /= 10;
        }
        return string(buffer);
    }

    function getCandidateVotes() public view returns (string[] memory) {
        string[] memory votes = new string[](candidatesCount);
        for (uint i = 0; i < candidatesCount; i++) {
            votes[i] = uintToString(candidates[i].voteCount);
        }
        return votes;
    }
}
