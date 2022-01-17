//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";

contract BlockSummaryBase is Ownable, IERC165 {
  // IERC165
  mapping(bytes4 => bool) internal supportedInterfaces;
  
  constructor() {
    // adding ERC165 data
    supportedInterfaces[type(IERC165).interfaceId] = true;
    supportedInterfaces[type(Ownable).interfaceId] = true;
  }

  function supportsInterface(bytes4 _interfaceId) external view override returns (bool) {
      return supportedInterfaces[_interfaceId];
  }
}