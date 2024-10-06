export const otherBackend = 'http://localhost:8000/api/notifyUser'
export function trimText(text: string) {
  return text.trim()
}

export function readableFormat(date: Date) {
  return new Date(date).toLocaleDateString()
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
    return true
  }
  return false
}

export function isImage(url: string) {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(url)
}

export function isVideo(url: string) {
  return /\.(mp4|avi|mov|webm|mkv)$/i.test(url)
}

export function formatNumber(num: number) {
  if (num < 1000) return num.toString()

  const units = ['K', 'M', 'B', 'T']
  let unitIndex = -1

  while (num >= 1000 && unitIndex < units.length - 1) {
    num /= 1000
    unitIndex++
  }

  return `${num.toFixed(1)}${units[unitIndex]}`
}

export function isSame(firstNotification: any, inCommingNotifcation: any) {
  if (
    firstNotification.type == inCommingNotifcation.type &&
    firstNotification.createdAt == inCommingNotifcation.createdAt &&
    firstNotification.title == inCommingNotifcation.title &&
    firstNotification.message == inCommingNotifcation.messate
  ) {
    return true
  }
  return false
}

export function getTimeDiffOrDate(dateString: any) {
  const inputDate = new Date(dateString)
  const currentDate = new Date()

  // @ts-ignore
  const diffInMs = currentDate - inputDate

  const diffInSeconds = Math.floor(diffInMs / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInDays > 0) {
    return inputDate.toDateString()
  } else if (diffInHours > 0) {
    return `${diffInHours} hour ago`
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} min ago`
  } else {
    return `${diffInSeconds} sec ago`
  }
}

export function checkForUserId(userId: string, arr: any) {
  const ele = arr.find((ele: any) => {
    return ele.userId == userId
  })
  if (ele) {
    return true
  }
  return false
}

export function highlightLinks(text: string) {
  const urlRegex = /(?:https?:\/\/|www\.)[^\s]+/g

  return text.replace(urlRegex, (url) => {
    let formattedUrl = url
    if (!/^https?:\/\//i.test(url)) {
      formattedUrl = 'http://' + url
    }
    return `<a href="${formattedUrl}"  target="_blank"  style="text-decoration: underline; color:"";rgb(173, 216, 230)">${url}</a>`
  })
}

const SCORES = {
  normal: 2,
  impressive: 3,
  excellent: 5
}

export const calculatePostRating = (responses: any) => {
  const totalResponses = responses.normal + responses.impressive + responses.excellent

  if (totalResponses === 0) return 0 // Avoid division by zero

  const weightedScore =
    responses.normal * SCORES.normal +
    responses.impressive * SCORES.impressive +
    responses.excellent * SCORES.excellent

  // Calculate the average score
  const averageScore = weightedScore / totalResponses

  // Since the scoring is already within a 1-5 range, we can return the rounded value
  return averageScore.toFixed(1) // Return rating with 1 decimal place
}

export function isApplied(applications: any[], userId: string) {
  let val = applications.find((ele) => {
    return ele.userId == userId
  })
  if (val) {
    return true
  }
  return false
}
