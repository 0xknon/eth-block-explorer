//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "./BlockSummaryBase.sol";


contract BlockSummary is BlockSummaryBase {
    struct Summary {
        uint256 timestamp;
        uint16 totalNumOfBlocks;
        uint256 totalGasSpent;
    }

    Summary[] public summaries;

    function getSummaries() public view returns (Summary[] memory) {
        return summaries;
    }

    function addSummary(uint256 _timestamp, uint16 _totalNumOfBlocks, uint256 _totalGasSpent) public onlyOwner {
        Summary memory _summary = Summary(_timestamp, _totalNumOfBlocks, _totalGasSpent);
        summaries.push(_summary);
    }
}
