import { Mp } from '../models/Mp'

let cleanedCount = 0

export const cleanMps = async () => {
  console.log('🧹 Cleaning mps...')
  // await Mp.deleteMany()
  const mps = await Mp.find()
  mps.forEach(({ id, score, dateLastSeen }) => {
    const minutesAgo = getMinutesAgo(dateLastSeen)
    if (score < 0) deleteMp(id)
    if (score > 1) {
      if (minutesAgo > 60) deleteMp(id)
    } else {
      if (minutesAgo > 30) deleteMp(id)
    }
  })
  console.log(`✨ Cleaned count: ${cleanedCount}`)
}

const deleteMp = async (mpId: string) => {
  cleanedCount++
  await Mp.findByIdAndDelete(mpId)
}

const getMinutesAgo = (date: Date) => {
  const msDiff = Date.now() - date.getTime()
  const minutesDiff = Math.floor(msDiff / 1000 / 60)
  return minutesDiff
}
