import { eth } from "state/eth"; // Global state: ETH
import { useState } from "react";
import { checkbalance } from "state/usebalance";
import Layout from "components/Layout"; // Layout wrapper
import styles from "styles/pages/Claim.module.scss"; // Page styles
export default function Claim() {
    // Global ETH state
    const { address, unlock }: { address: string | null; unlock: Function } =
      eth.useContainer();
    // Global token state
    const {balance}: {balance: string | null} = checkbalance.useContainer();
    return (
      <Layout>
          <div className={styles.claim}>
          <div className={styles.card}>
          <p>
              Your address ({address}) has {balance}  tokens.
            </p>
          </div>
        </div>
      </Layout>
    )
}
