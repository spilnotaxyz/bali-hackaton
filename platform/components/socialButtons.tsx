import { ComponentType } from "react";
import { Twitter, Globe } from "lucide-react";

export function TwitterButton({ uri }: { uri: string }) {
  return (
    <a
      href={uri}
      target="_blank"
      className="mr-2 rounded-full bg-gray-100 p-2 text-black"
    >
      <Twitter size={16} />
    </a>
  );
}

export function WebButton({ uri }: { uri: string }) {
  return (
    <a
      href={uri}
      target="_blank"
      className="mr-2 rounded-full bg-gray-100 p-2 text-black"
    >
      <Globe size={16} />
    </a>
  );
}
