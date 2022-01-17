import { Schema } from 'mongoose';
import { Transaction } from 'web3-core';

const TransactionSchema = new Schema<Transaction>(
  {
    hash: { type: String, required: true },
    nonce: { type: Number, required: true },
    blockHash: { type: String },
    blockNumber:{ type: Number },
    transactionIndex: { type: Number },
    from: { type: String, required: true },
    to: { type: String },
    value: { type: String, required: true },
    gasPrice: { type: String, required: true },
    gas: { type: Number, required: true },
    input: { type: String, required: true },
  },
  { timestamps: false, versionKey: false },
);

// Users.virtual('user')
TransactionSchema.index({ blockNumber: 1, transactionIndex: 1 }, { unique: true });

export default TransactionSchema;
