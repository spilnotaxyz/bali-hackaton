import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <header className="flex items-center justify-end w-full h-16 px-4 bg-sky-950 drop-shadow-xl">
      <ConnectButton />
    </header>
  );
}