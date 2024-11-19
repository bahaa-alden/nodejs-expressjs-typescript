import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import Role from '../database//models/role.model';
import dataRoles from './data-roles';

dotenv.config({ path: '../../.env' });
const DB = process.env.MONGODB_URL || '';
console.log(DB);
mongoose
  .connect('mongodb://127.0.0.1:27017/taskmanager')
  .then(() => console.log('DB connection successes'));

const importData = async () => {
  try {
    await Role.create(dataRoles);
    console.log('imported');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
const deleteData = async () => {
  try {
    await Role.deleteMany();
    console.log('deleted');
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
