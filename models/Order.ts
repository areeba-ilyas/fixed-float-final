import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  fromCurrency: { 
    type: String, 
    required: true 
  },
  toCurrency: { 
    type: String, 
    required: true 
  },
  fromAmount: { 
    type: Number, 
    required: true 
  },
  toAmount: { 
    type: Number, 
    required: true 
  },
  commissionRate: { 
    type: Number, 
    default: 0.02 
  },
  commissionAmount: { 
    type: Number, 
    required: true 
  },
  finalFromAmount: { 
    type: Number, 
    required: true 
  },
  destinationAddress: { 
    type: String, 
    required: true 
  },
  fixedFloatOrderId: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    default: 'pending' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update the updatedAt field before saving
OrderSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);