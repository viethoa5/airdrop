import fs from "fs"; // Filesystem
import path from "path"; // Path routing
import data from "data"; //
import MerkleTree from "merkletreejs";
const airdrops: Record<string, number> = {};
// Types
type IConfig = {
  decimals: number;
  airdrop: Record<string, number>;
  tree : MerkleTree;
};
const config: IConfig = {
  decimals: 18,
  airdrop: data.airdrops,
  tree : data.tree,
};
// Export config
export default config;
