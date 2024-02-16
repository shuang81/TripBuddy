const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema(
  {
    disable: {
      type: Boolean,
    },
    status: {
      type: String,
      enum: ['User', 'IT', 'Security'],
    },
    picture: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    BOD: {
      type: Date,

    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    sex: {
      type: String,
      enum: ['Male', 'Female', 'Hide'],
    },
    cardNumber: {
      type: String,
    },
    expirationDate: {
      type: Date,
    },
    CVC: {
      type: String,
    },
    subscription: {
      type: String,
      enum: ['Basic', 'Premium', 'Business'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    subscribedTo: [mongoose.Schema.Types.ObjectId],
    accessCreatedAt: {
      type: Date,
      default: null,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    emergencyContacts: [mongoose.Schema.Types.ObjectId],
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],  
    checklist: {
      type: [{
        value: String,
        content: String,
        checked: Boolean
      }],
      _id: false
    },
    bio: {
      type: String,
    }
  },
  {
    timestamps: true,
    collection: "user",
  }
);

UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", UserSchema);
module.exports = User;
