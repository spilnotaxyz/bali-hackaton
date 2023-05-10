import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import { Button } from "~/components/ui/button";

export default function Header() {
  const router = useRouter();

  return (
    <header className="fixed flex h-16 w-full items-center justify-between bg-gradient-to-b from-sky-900 to-sky-950 px-4 drop-shadow-xl">
      <div className="space-x-4">
        <Button onClick={() => void router.push("/")}>Home</Button>
        <Button onClick={() => void router.push("/partnerships/create")}>
          Create Partnership
        </Button>
      </div>

      <ConnectButton />
    </header>
  );
}
