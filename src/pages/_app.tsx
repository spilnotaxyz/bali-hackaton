import { type AppType } from "next/app";
import Head from "next/head";

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import Header from "~/components/header";
import { api } from "~/utils/api";

import "@rainbow-me/rainbowkit/styles.css";
import "~/styles/globals.css";

const { chains, provider } = configureChains(
  [
    sepolia,
    // foundry
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Hackaton Bali",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme({ accentColor: "#0369a1" })}
        >
          <Header />
          <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-slate-700 to-slate-800 pt-20 text-white">
            <Component {...pageProps} />
          </main>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
};

export default api.withTRPC(MyApp);
