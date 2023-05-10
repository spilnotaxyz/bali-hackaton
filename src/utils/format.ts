export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function shortenAddress(address: string) {
  return address.slice(0, 6) + "..." + address.slice(-4);
}