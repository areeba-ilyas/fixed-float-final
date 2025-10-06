import mongoose, { Document, Schema } from 'mongoose'

export interface IOrder extends Document {
  orderId: string
  userId?: string
  fromCurrency: string
  toCurrency: string
  fromAmount: number
  toAmount: number
  rate: number
  commission: number
  networkFee: number
  toAddress: string
  email: string
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
  paymentAddress?: string
  paymentAmount?: number
  txHash?: string
  expiresAt: Date
  createdAt: Date
  updatedAt: Date
}

const OrderSchema: Schema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    fromCurrency: {
      type: String,
      required: true,
      uppercase: true
    },
    toCurrency: {
      type: String,
      required: true,
      uppercase: true
    },
    fromAmount: {
      type: Number,
      required: true,
      min: 0
    },
    toAmount: {
      type: Number,
      required: true,
      min: 0
    },
    rate: {
      type: Number,
      required: true,
      min: 0
    },
    commission: {
      type: Number,
      required: true,
      min: 0
    },
    networkFee: {
      type: Number,
      required: true,
      min: 0
    },
    toAddress: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    paymentAddress: String,
    paymentAmount: Number,
    txHash: String,
    expiresAt: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
)

// Add indexes for better performance
OrderSchema.index({ orderId: 1 })
OrderSchema.index({ userId: 1 })
OrderSchema.index({ status: 1 })
OrderSchema.index({ createdAt: -1 })

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema)