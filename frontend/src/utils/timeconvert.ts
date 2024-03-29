export function convertSecondsToTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  if (hours) return `${hours} hr ${minutes} min ${remainingSeconds} sec`;
  return `${minutes} min ${remainingSeconds} sec`;
}
