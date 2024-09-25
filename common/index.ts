export function trimText(text: string) {
  return text.trim();
}

export function readableFormat(date: string) {
  return new Date(date).toLocaleDateString();
}

export function isMissing(res: any) {
  if (
    !res.description ||
    !res.LinkedinLink ||
    !res.githubLink ||
    !res.resumeLink ||
    !res.twitterLink ||
    !res.profileImage
  ) {
    return true;
  }
  return false;
}

export function isImage(url: string) {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
}

export function isVideo(url: string) {
  return /\.(mp4|avi|mov|webm|mkv)$/i.test(url);
}

export function formatNumber(num: number) {
  if (num < 1000) return num.toString();

  const units = ["K", "M", "B", "T"];
  let unitIndex = -1;

  while (num >= 1000 && unitIndex < units.length - 1) {
    num /= 1000;
    unitIndex++;
  }

  return `${num.toFixed(1)}${units[unitIndex]}`;
}
