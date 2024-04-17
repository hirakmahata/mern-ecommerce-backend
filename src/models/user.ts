import mongoose from "mongoose";
import validator from "validator";

interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: "admin" | "user";
  gender: "male" | "female";
  dob: Date;
  createdAt: Date;
  updatedAt: Date;
  //   Virtual Attribute
  age: number;
}

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "please enter Id"],
    },
    name: {
      type: String,
      required: [true, "please enter Name"],
    },
    email: {
      type: String,
      unique: [true, "Email already exist"],
      required: [true, "please enter Email"],
      validate: validator.default.isEmail,
    },
    photo: {
      type: String,
      required: [true, "please add Photo"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "admin",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "please enter your Gender"],
    },
    dob: {
      type: Date,
      required: [true, "please enter your DOB"],
    },
  },
  { timestamps: true }
);

userSchema.virtual("age").get(function () {
  const today = new Date();
  const dob = this.dob;
  let age = today.getFullYear() - dob.getFullYear();

  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
});

export const User = mongoose.model<IUser>("User", userSchema);
