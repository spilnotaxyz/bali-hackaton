import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <header className="fixed flex items-center justify-end w-full h-16 px-4 bg-gradient-to-b from-sky-900 to-sky-950 drop-shadow-xl">
      <ConnectButton />
    </header>
  );
}