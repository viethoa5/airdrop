import keccak256 from "keccak256"; // Keccak256 hashing
import MerkleTree from "merkletreejs"; // MerkleTree.js
import fs from "fs";
import path from "path";
import {mymerkleTree} from "merkle/merkle";
import { ethers } from "ethers"; 
var airdrops;
export default async function handler(req, res) {
  const configPath = path.join(__dirname, "../../../../data.json");
    airdrops = req.body;
await fs.writeFileSync(
  // Output to merkle.json
  configPath,
  // Root + full tree
  JSON.stringify({
    airdrops : airdrops,
  })
);
res.status(200).json({ message: "Success!" });
} 