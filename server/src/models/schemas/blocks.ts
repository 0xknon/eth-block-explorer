import { Schema, Document } from 'mongoose';
import dayjs from 'dayjs';
import { Block } from 'src/interfaces';
import TransactionSchema from './transactions';

const BlockSchema = new Schema<Block>(
  {
    blockNumber: { type: Number, required: true, unique: true },
    mixHash:  { type: String, required: true, unique: true },
    timestamp: { 
      type: Date, 
      required: true, 
      get: (date: Date) => dayjs(date).unix(), 
      set: (timestamp: string | number) => dayjs.unix(Number(timestamp)).toDate(),
    },
    baseFeePerGas: { type: String, required: true },
    difficulty:  { type: Number, required: true },
    parentHash:  { type: String, required: true },
    extraData:  { type: String, required: true },
    gasLimit: { type: Number, required: true },
    gasUsed:  { type: Number, required: true },
    hash:  { type: String, required: true },
    logsBloom:  { type: String, required: true },
    miner:  { type: String, required: true },
    nonce:  { type: String, required: true },
    receiptsRoot:  { type: String, required: true },
    sha3Uncles:  { type: String, required: true },
    size: { type: Number, required: true },
    stateRoot:  { type: String, required: true },
    transactionsRoot:  { type: String, required: true },
    transactions: [TransactionSchema],
  },
  { timestamps: false, versionKey: false },
);

// Users.virtual('user')
BlockSchema.index({ blockNumber: 1 }, { unique: true });

export default BlockSchema;
