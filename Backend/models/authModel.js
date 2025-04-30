import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  maritialstatus: {
    type: Boolean,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  profile: {
    type: String,
  },
  password: {
    type: String,
  },
  dob :{
    type : Date
  }
});

const auth = mongoose.model("AuthUser", AuthSchema);
export default auth;
