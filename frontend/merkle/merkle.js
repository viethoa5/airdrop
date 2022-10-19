import config from "config";
import keccak256 from "keccak256"; // Keccak256 hashing
import MerkleTree from "merkletreejs"; // MerkleTree.js
import { ethers } from "ethers"; 
function generateLeaf(address, value) {
    return Buffer.from(
      // Hash in appropriate Merkle format
      ethers.utils
        .solidityKeccak256(["address", "uint256"], [address, value])
        .slice(2),
      "hex"
    );
}
export const mymerkleTree = new MerkleTree(
    // Generate leafs
    Object.entries(config.airdrop).map(([address, tokens]) =>
      generateLeaf(
        ethers.utils.getAddress(address),
        ethers.utils.parseUnits(tokens.toString(), config.decimals).toString()
      )
     ),
    // Hashing function
    keccak256,
    { sortPairs: true }
);
