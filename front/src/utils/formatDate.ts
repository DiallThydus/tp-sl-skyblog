export default function formatDate(date: Date) {
  const intl = new Intl.DateTimeFormat("en-US", { dateStyle: "full" });
  return intl.format(date);
}
