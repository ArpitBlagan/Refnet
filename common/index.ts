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
