export function formatDate(date: string | undefined) {
  if (!date) return;
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}
