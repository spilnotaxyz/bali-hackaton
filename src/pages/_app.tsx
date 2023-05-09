import { type AppType } from "next/app";
import { getDefaultWallets, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import Header from "~/components/header";
import { api } from "~/utils/api";

import "@rainbow-me/rainbowkit/styles.css";
import "~/styles/globals.css";

const { chains, provider } = configureChains(
  [sepolia],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Hackaton Bali",
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme({ accentColor: "#0369a1" })}>
        <Header />
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default api.withTRPC(MyApp);
