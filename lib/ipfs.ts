import { type Partnership, type Proposal } from "@prisma/client";
import { create as ipfsHttpClient } from "ipfs-http-client";

const projectId = process.env.NEXT_PUBLIC_IPFS_PROJECT_ID as string;
const projectSecret = process.env.NEXT_PUBLIC_IPFS_API_KEY_SECRET as string;
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString(
  "base64"
)}`;

const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export const uploadPartnershipToIPFS = async (
  partnership: Partnership,
  proposal: Proposal
) => {
  const subdomain = "https://ipfs.io/ipfs/";
  try {
    const input = {
      partnership,
      proposal,
    };

    const addedJSON = await client.add(Buffer.from(JSON.stringify(input)));
    return `${subdomain}${addedJSON.path}`;
  } catch (error) {
    console.log("Error uploading file to IPFS.");
  }
};
