import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-end bg-sky-950 px-4 drop-shadow-xl">
      <ConnectButton />
    </header>
  );
}
