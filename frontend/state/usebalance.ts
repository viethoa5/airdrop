import BigNumber from 'bignumber.js'
import BN from 'bn.js'
import { useWeb3React } from '@web3-react/core'
import config from "config"; // Airdrop config
import { eth } from "state/eth"; // ETH state provider
import { ethers } from "ethers"; // Ethers
import keccak256 from "keccak256"; // Keccak256 hashing
import MerkleTree from "merkletreejs"; // MerkleTree.js
import { useEffect, useState } from "react"; // React
import { createContainer } from "unstated-next"; // State management
import { useWeb3React } from '@web3-react/core'
import { ZERO_ADDRESS, web3BNToFloatString } from '../utils'
function useBalance() {
  // Collect global ETH state
  const {
    address,
    provider,
  }: {
    address: string | null;
    provider: ethers.providers.Web3Provider | null;
  } = eth.useContainer();

  // Local state
  const [balance, setBalance] = useState('0'); // Claim status
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  /**
   * Get contract
   * @returns {ethers.Contract} signer-initialized contract
   */
  const getContract = (): ethers.Contract => {
    return new ethers.Contract(
      // Contract address
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "",
      [
        // balanceOf mapping
        "function balanceOf(address) public view returns (uint256)",
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
  const getBalance = async (address: string): Promise<boolean> => {
    // Collect token contract
    const checkbalance: ethers.Contract = getContract();
    // Return claimed status
    return await checkbalance.balanceOf(address);
  };

  /**
   * After authentication, update number of tokens to claim + claim status
   */
  const syncStatus = async (): Promise<void> => {
    // Toggle loading
    setDataLoading(true);

    // Force authentication
    if (address) {
      // Collect number of tokens for address
      const bn = await getBalance(address);
      const pow = new BigNumber('10').pow(new BigNumber(`18`))
      setBalance(web3BNToFloatString(bn, pow, 4, BigNumber.ROUND_DOWN))
    }
    // Toggle loading
    setDataLoading(false);
  };

  // On load:
  useEffect(() => {
    syncStatus();
  }, [address]);

  
  return {
    balance
  };
}

// Create unstated-next container
export const checkbalance = createContainer(useBalance);