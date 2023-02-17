import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {APP_CONFIG} from "../../config/app-config";
import Axios from "axios"

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },

  phoneNumber: {
    type: Number,
    trim: true,
    unique: true,
    required: true,
  },

  gender: {
     type: String,
     default: 'unavailable'
  },

  houseNo: {
    type: String,
    default: "unavailable"
  },

  colonyName: {
    type: String,
    default: "unavailable",
  },

  familyMemeber: {
    type: Number,
    default: 0
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],

  registrationConfirmed: {
    type: Boolean,
    default: false,
  },
});

// that method apply on  every single user

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.tokens;
  delete userObject._id;
  delete userObject.__v;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, APP_CONFIG.JWT_USER_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCreadentials = async (phoneNumber: any) => {
  try {
    const user = await User.findOne({ phoneNumber });

  if (!user || !user.registrationConfirmed) {
    throw new Error("unable to login");
  }

  const { data } = await Axios.get(
    `https://2factor.in/API/V1/12d0d3c0-0f9d-11ec-a13b-0200cd936042/SMS/+91${phoneNumber}/AUTOGEN`
  );


  if (data.Status !== 'Success') {
    throw new Error("unable to login");
  }

  return {data, user}
  } catch (err) {
    throw new Error("unable to login");
  }
};


const User = mongoose.model("user", userSchema);

export default User;