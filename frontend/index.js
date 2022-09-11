const express = require('express');
const next = require("next");
const fs = require('fs');
const path = require('path');
const { MerkleTree } = require('merkletreejs')
const { ethers } = require("ethers");
const keccak256 = require('keccak256');
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const configPath = path.join(__dirname, "./data.json");
const app = next({ dev });
const handle = app.getRequestHandler();
var XLSX = require('xlsx');
var airdrops = {};
var workbook = XLSX.readFile("./Book1.xlsx");
let worksheet = workbook.Sheets[workbook.SheetNames[0]];
  for (let i = 1; i < 3; i++) {
    const address = worksheet[`A${i}`].v;
    const money  = worksheet[`B${i}`].v;
    var amount = money;
    airdrops[address] = amount;
}
function generateLeaf(address, value) {
  return Buffer.from(
    // Hash in appropriate Merkle format
    ethers.utils
      .solidityKeccak256(["address", "uint256"], [address, value])
      .slice(2),
    "hex"
  );
}
const merkleTree = new MerkleTree(
  // Generate leafs
  Object.entries(airdrops).map(([address, tokens]) =>
    generateLeaf(
      ethers.utils.getAddress(address),
      ethers.utils.parseUnits(tokens.toString(), 18).toString()
    )
  ),
  // Hashing function
  keccak256,
  { sortPairs: true }
);
const root = merkleTree.getRoot().toString('hex');
fs.writeFileSync(
  // Output to merkle.json
  configPath,
  // Root + full tree
  JSON.stringify({
    airdrops})
);
app.prepare().then(() => {
  const server = express();
  const router = express.Router();
  var bodyParser = require('body-parser');
  router.use(bodyParser.urlencoded({ extended: false }));
  router.get('/admin/manage', (req, res) => {
    const link = "/admin/manage";
    return server.render(req, res, link);
 });
  router.get('/admin/login', (req, res) => {
    const admin = "/admin/login";
    return server.render(req, res, admin);
  });
  server.get('*',(req, res) => {
    return handle(req, res);
  });
  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on ${PORT}`);
  });
}).catch(ex => {
  console.error(ex.stack);
  process.exit(1);
});


