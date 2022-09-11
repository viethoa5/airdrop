import { eth } from "state/eth"; // Eth state provider
import { token } from "state/token"; // Token state provider
import type { ReactElement } from "react";
import {checkbalance} from "state/usebalance";
import { updateRoots } from "state/updateroot";
/**
 * State providing wrapper
 * @param {ReactElement | ReactElement[]} children to inject
 * @returns {ReactElement} wrapper
 */
export default function StateProvider({
  children,
}: {
  children: ReactElement | ReactElement[];
}): ReactElement {
  return (
    // Wrap in sub-providers
    <eth.Provider>
      <updateRoots.Provider>
      <token.Provider>
        <checkbalance.Provider>{children}</checkbalance.Provider>
      </token.Provider>
      </updateRoots.Provider>
    </eth.Provider>
  );
}
