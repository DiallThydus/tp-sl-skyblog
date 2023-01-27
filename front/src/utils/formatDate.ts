export default function formatDate(date: Date | string) {
  const intl = new Intl.DateTimeFormat("en-US", { dateStyle: "full" });
  return intl.format(typeof date === "string" ? new Date(date) : date);
}
