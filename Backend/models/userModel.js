import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true},  
  email: { type: String, required: true },
  createdBy:{type: mongoose.Schema.Types.ObjectId}
});

const AddUser = mongoose.model('AddUser', userSchema);

export default AddUser;
