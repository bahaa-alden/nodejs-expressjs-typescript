import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { userRepository } from '../database/repositories/user.repository';
import { RoleCode } from '../utils/enum';

dotenv.config({ path: __dirname + '/../../.env' });

const DB = process.env.MONGODB_URL ?? 'mongodb://127.0.0.1:27017/cars';
mongoose.connect(DB).then(() => console.log('DB connection successes'));

const importData = async () => {
  try {
    await userRepository.insert({
      name: 'admin',
      password: process.env.ADMIN_PASSWORD,
      email: process.env.ADMIN_EMAIL,
      role: RoleCode.ADMIN,
    });
    console.log('imported');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
const deleteData = async () => {
  try {
    await userRepository.model.findOneAndDelete({
      email: process.env.ADMIN_EMAIL,
    });
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
