// interfaces
import MpData from '@/interfaces/MpData'

const mps: Array<MpData> = [
  {
    id: 'id1',
    position: [31.809, 34.767],
    dateLastSeen: new Date(),
    score: -1,
  },
  {
    id: 'id2',
    position: [32.0733, 34.782],
    dateLastSeen: new Date(),
    score: 2,
  },
]

export function useMps() {
  return {
    data: mps,
  }
}
