import "styles/global.scss"; // Global styles
import StateProvider from "state"; // Global state provider
import type { AppProps } from "next/app"; // Types
import "styles/form.css";
// Export application
export default function MerkleAirdropStarter({
  Component,
  pageProps,
}: AppProps) {
  return (
    // Wrap application in global state provider
    <StateProvider>
      <Component {...pageProps} />
    </StateProvider>
  );
}
