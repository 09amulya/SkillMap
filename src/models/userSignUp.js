import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    domain: {
      type: String,
      required: true,
      enum: ["tech", "non-tech", "arts"]
    },

    role: {
      type: String,
      required: true
    },

    skills: {
      type: [String],
      default: []
    },

    skillScore: {
      type: Number,
      default: 0
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner"
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

export default User;