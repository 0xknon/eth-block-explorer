import { model } from 'mongoose';

import { Block } from 'src/interfaces';
import BlockSchema from './schemas/blocks';

// export { default as LegacyCompany } from './schemas/legacy/company';
// export { default as LegacyBrand } from './schemas/legacy/brand';
// export { default as LegacyBrandGroup } from './schemas/legacy/brandGroup';

// const auditLog = require('./middlewares/auditLog')
// const registerModel = (
//   modelName: string,
//   modelSchema: Schema,
//   collectionName?: string
//   withAuditLog = true
// ) => {
//   if (withAuditLog) {
//     auditLog.register(modelSchema, modelName)
//   }
//   return model(modelName, modelSchema, collectionName);
// };

const Blocks = model<Block>('Block', BlockSchema, 'blocks');

export {
  Blocks,
};
