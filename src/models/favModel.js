import mongoose from "mongoose";


const favSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 45,
  },
  blogs:[{type : String}]
});

const Fav = mongoose.models.Fav || mongoose.model("Fav", favSchema);
export default Fav;
