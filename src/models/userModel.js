import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 15,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 15,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 18,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    trim: true,
    require : true
  },
});

const User = mongoose.model.user || mongoose.model("User", userSchema);
export default User;
