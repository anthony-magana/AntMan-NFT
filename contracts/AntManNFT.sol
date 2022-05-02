//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract AntManNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public maxSupply;
    uint256 public totalSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenURI;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721('AntMan', 'AM') {
        mintPrice = 0.02 ether;
        maxSupply = 1000;
        totalSupply = 0;
        maxPerWallet = 3;
        // set withdrawWallet address
        withdrawWallet = payable(0xF515BEa6249a56a3bdC48A48aEF7EC0C1e485345);
    }

    function setIsPublicMintEnabled(bool _isPublicMintEnabled) external onlyOwner {
        isPublicMintEnabled = _isPublicMintEnabled;
    }

    function setBaseTokenURI(string calldata _baseTokenURI) external onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        require(_exists(tokenId_), 'Token does not exist');
        return string(abi.encodePacked(baseTokenURI, Strings.toString(tokenId_), ".json"));
    }

    function withdraw() external onlyOwner {
        (bool success,) = withdrawWallet.call{value: address(this).balance}('');
        require(success, 'Withdraw failed');
    }

    function mint(uint256 quantity_) public payable {
        require(isPublicMintEnabled, 'Public minting is not enabled');
        require(msg.value == quantity_ * mintPrice, 'Minting failed');
        require(totalSupply + quantity_ <= maxSupply, 'Sold Out');
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, 'Exceed max wallet');

        for(uint256 i = 0; i < quantity_; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
    }
}


