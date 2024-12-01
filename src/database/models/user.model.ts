import { RoleCode, UserStatus } from './../../utils/enum';
import { model, Schema, type Document as MongooseDocument } from 'mongoose';
import { omit } from 'lodash';
import { Error } from 'mongoose';
import * as bcrypt from 'bcrypt';

export interface IUser extends MongooseDocument {
  id: string;
  // <creating-property-interface />
  balance: number;
  status?: UserStatus;
  name: string;
  email: string;
  password: string;
  role: RoleCode;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null | Date;
  comparePassword(
    candidatePassword: string,
    callback: (err: Error, isMatch: boolean) => void,
  ): void;
}

const userSchema = new Schema<IUser>(
  {
    // <creating-property-schema />
    balance: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.active,
    },
    name: {
      type: String,
      trim: true,
      maxlength: 200,
      required: true,
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(RoleCode),
      default: RoleCode.USER,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: 'User',
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => omit(ret, ['__v', '_id', 'password', 'deletedAt']),
    },
  },
);

userSchema.pre('save', async function save(next) {
  // If the password is not modified, skip hashing
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = new Date();
  next();
});

// check password
userSchema.methods.comparePassword = function (
  candidatePassword: string,
  callback: any,
) {
  bcrypt.compare(
    candidatePassword,
    this.password,
    (err: Error, isMatch: boolean) => {
      callback(err, isMatch);
    },
  );
};

export default model<IUser>('User', userSchema);
