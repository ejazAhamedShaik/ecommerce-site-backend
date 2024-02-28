import { Schema, model } from "mongoose";

const userSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function () {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(this.email);
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function () {
        return this.password === this.confirmPassword;
      },
    },
  },
});

userSchema.pre("save", function() {
  this.confirmPassword = undefined
})

export const User = model("user", userSchema);