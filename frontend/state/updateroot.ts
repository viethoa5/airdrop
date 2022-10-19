import { eth } from "state/eth"; // ETH state provider
import { ethers } from "ethers"; // Ethers
import keccak256 from "keccak256"; // Keccak256 hashing
import MerkleTree from "merkletreejs"; // MerkleTree.js
import { useEffect, useState } from "react"; // React
import { createContainer } from "unstated-next"; // State management
import {mymerkleTree} from "merkle/merkle";
function checkupdate() {
  // Collect global ETH state
  var recentmerkleroot = 0x376fa5d6277fdfde75e4f511068e773997ae5d716348e692fcd38f0aaf800f8d;
  const {
    address,
    provider,
  }: {
    address: string | null;
    provider: ethers.providers.Web3Provider | null;
  } = eth.useContainer();
  // Local state
  const [updatechance, setUpdatechance] = useState<boolean>(true); // Update status
  const [dataLoading, setDataLoading]   = useState<boolean>(true);

  /**
   * Get contract
   * @returns {ethers.Contract} signer-initialized contract
   */
  const getContract = (): ethers.Contract => {
    return new ethers.Contract(
      // Contract address
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "",
      [
        // updateRoot
        " function updateRoot(bytes32 _merkleRoot) external",
      ],
      // Get signer from authed provider
      provider?.getSigner()
    );
  };

  /**
   * Collects claim status for an address
   * @param {string} address to check
   * @returns {Promise<boolean>} true if already claimed, false if available
   */
  const doUpdate = async (): Promise<boolean> => {
    // Collect token contract
    const updateRoots: ethers.Contract = getContract();
    // Return claimed status
    if (mymerkleTree.getHexRoot() != recentmerkleroot) {
      return await updateRoots.updateRoot(mymerkleTree.getHexRoot());
      recentmerkleroot = mymerkleTree.getHexRoot();
    }
};

  /**
   * After authentication, update number of tokens to claim + claim status
   */
  const syncStatus = async (): Promise<void> => {
    // Toggle loading
    setDataLoading(true);
    if (address) {
    const updateRoots: ethers.Contract = getContract();
        doUpdate();
        setUpdatechance(true);
    } else {
        setUpdatechance(false);
    }
    // Toggle loading
    setDataLoading(false);
  };

  // On load:
  useEffect(() => {
    syncStatus();
  }, [address]);
  return {
    updatechance,
  };
}
// Create unstated-next container
export const updateRoots = createContainer(checkupdate);