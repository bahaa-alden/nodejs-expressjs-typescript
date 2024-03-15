import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import { RoleModel } from "../models/role.model";
import dataRoles from "./data-roles";

dotenv.config({ path: "../../.env" });
const DB = process.env.MONGODB_URL || "";
console.log(DB);
mongoose
  .connect("mongodb://127.0.0.1:27017/taskmanager", {
    autoReconnect: true,
    keepAlive: true,
    socketTimeoutMS: 3000,
    connectTimeoutMS: 3000,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection successes"));

const importData = async () => {
  try {
    await RoleModel.create(dataRoles);
    console.log("imported");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
const deleteData = async () => {
  try {
    await RoleModel.deleteMany();
    console.log("deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
