import { ConnectButton } from "@rainbow-me/rainbowkit";
import SpilnotaLogo from "./spilnotaLogo";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed flex h-16 w-full items-center justify-between bg-gradient-to-b from-[#20252F] to-[#2A3038] px-4 drop-shadow-xl">
      <div className="space-x-4">
        <Link href="/">
          <SpilnotaLogo />
        </Link>
      </div>

      <ConnectButton />
    </header>
  );
}
