import mongoose from 'mongoose'

export interface MpData {
  _id: mongoose.Types.ObjectId
  position: [number, number]
  dateLastSeen: Date
  score: number
}

const mpSchema = new mongoose.Schema<MpData>({
  position: {
    type: [Number, Number],
    required: true,
  },
  dateLastSeen: {
    type: Date,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
})

export const Mp = mongoose.model('Mp', mpSchema)
