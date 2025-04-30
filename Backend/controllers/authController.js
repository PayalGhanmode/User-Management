import Users from "../models/authModel.js";
import AddUser from "../models/userModel"
import sendMailToNewUSer from "../helpers/emailservice.js"
import { STATUS_CODE, MESSAGE } from "../config/constants.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import sendMailToNewUser from "../helpers/emailservice.js";  

export const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, gender, maritialstatus,  password , dob} = req.body;
    const profile = req.file?.filename;
    if (!firstname || !lastname || !email ||!gender || !maritialstatus || !profile || !password || !dob) {
      return res
        .status(STATUS_CODE.BAD_REQ)
        .json({ message: MESSAGE.ALL_FILEDS_REQ });
    }
    const oldUser = await Users.findOne({ email: email });
    console.log(oldUser);

    if (oldUser) {
      return res
        .status(STATUS_CODE. ALREADY_EXITS)
        .json({status: STATUS_CODE. ALREADY_EXITS, message: MESSAGE. ALREDY_EXISTS });
    }

   
    const pass = await bcrypt.hash(password, 10);
    const user = new Users({
      firstname,
      lastname,
      email,
      gender,
      maritialstatus,
      profile: profile,
      password: pass,
      dob
    });

    console.log(req.body, "=======", req.file, "=========")

    await user.save();
    res.status(STATUS_CODE.NEW_CREATED).json({ msg: MESSAGE.USER_REGISTER });
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERR).json({ msg: error.message });
  }
};



export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(STATUS_CODE.BAD_REQ)
        .json({ message: MESSAGE.ALL_FILEDS_REQ });
    }
    const existUser = await Users.findOne({ email: email });
    // console.log(existUser);

    if (!existUser) {
      return res
        .status(STATUS_CODE.BAD_REQ)
        .json({ msg: MESSAGE.USER_NOT_FOUND });
    }

    const isMatch = await bcrypt.compare(password, existUser.password);
    console.log(isMatch, "yes");

    if (isMatch) {
      const token = jwt.sign({ email }, "KEY", { expiresIn: "5hr" }, );
      return res
        .status(STATUS_CODE.SUCCESS)
        .json({ msg: MESSAGE.LOGIN,id: existUser._id, token: token });
        
    } else {
      return res
        .status(STATUS_CODE.BAD_REQ)
        .json({ msg: MESSAGE.INVALID_CREDENTIALS });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERR)
      .json({ msg: error.message });
  }
};

export const getAllauth = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(STATUS_CODE.SUCCESS).json(users);
  } catch (error) {
    console.error(error);
    res.status(STATUS_CODE.INTERNAL_SERVER_ERR).json({ msg: error.message });
  }
};
        

export const getPeginatedData = async (req, res) => {
  console.log("getting peginated data cdsc")
  try {
    const { search = "", page = 1, limit = 4 ,userId } = req.query
    console.log(userId ,"userId")
    const pageNo = Number(page)
    const pageLimit = Number(limit)

    const skip = (pageNo - 1) * pageLimit

    const query = {createdBy : userId  ,  firstname: { $regex: search, $options: "i" } }

    const user = await AddUser.find(query).skip(skip).limit(pageLimit)

    if (!user) {
      return res.status(404).json({
        msg: "UnSuccessfull"
      })
    }

    const totalRecord = await Users.countDocuments()
    const totalPages = Math.ceil(totalRecord / pageLimit)
    console.log(pageNo, "hgfjh")


    res.status(200).json({ user, totalRecord, totalPages, pageNo })

  } catch (error) {
    console.log("error for pegination")
    res.status(500).json({ msg: error.message })
  }
}

export const getRegisterUserById = async (req, res) => {
  try {
    const { id } = req.params;  
    const user = await Users.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  console.log(req.body ,"update")
  const profile = req?.file?.filename;
  console.log(profile)
  
  const { firstname, lastname, email, gender, maritialstatus , dob} = req.body;

  try {
    const user = await Users.findByIdAndUpdate(req.params.id, {
      firstname:firstname, lastname:lastname, email:email, gender:gender, maritialstatus:maritialstatus , dob:dob, profile:profile}, {new:true})
    if (!user) {
      return res.status(404).json({ "msg": "user not found" })
    }
    res.status(200).json({ "msg": "user updated" })
  } catch (error) {
    console.log(error)
    res.status(401).json({ Error: error.message });
  }
}



const client = new OAuth2Client(`368841272750-bsgr39djulkqk32p6utco69sqsjj83mc.apps.googleusercontent.com`);

// export const googleLogin = async (req, res) => {
//   try {
//     const { token } = req.body;

    
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: "368841272750-bsgr39djulkqk32p6utco69sqsjj83mc.apps.googleusercontent.com",
//     });
//     const payload = ticket.getPayload();
//     const { email, name, sub: googleId } = payload;

   
//     let user = await Users.findOne({ email });
//     if (!user) {
//       user = new Users({
//         firstname: name.split(" ")[0],
//         lastname: name.split(" ")[1] || "",
//         email: email,
//         googleId,
//         password: "",  
//       });
//       await user.save();
//     }

    
//     const jwtToken = jwt.sign({ email }, "KEY", { expiresIn: "5hr" });

//     return res.status(200).json({ id: user._id, token: jwtToken });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Google Login Failed" });
//   }
// };

// export const googleLogin = async (req, res) => {
//   try {
//     const { token } = req.body;

//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: "368841272750-bsgr39djulkqk32p6utco69sqsjj83mc.apps.googleusercontent.com",
//     });
//     const payload = ticket.getPayload();
//     const { email, name, sub: googleId } = payload;

//     let user = await Users.findOne({ email });
//     if (!user) {
//       const defaultPassword = "payalghanmode@123";
//       const hashedDefaultPassword = await bcrypt.hash(defaultPassword, 10);
      
//       user = new Users({
//         firstname: name.split(" ")[0],
//         lastname: name.split(" ")[1] || "",
//         email: email,
//         googleId,
//         password: hashedDefaultPassword, 
//       });

//       const subject = "Change Your Password";
//       const text = `Your Defult Password is : ${percentage} `;
  
//       const emailSend = await sendMailToStdudents(email, subject, text);
//       await user.save();
//     }

//     const jwtToken = jwt.sign({ email }, "KEY", { expiresIn: "5hr" });

//     return res.status(200).json({ id: user._id, token: jwtToken });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Google Login Failed" });
//   }
// };

export const googleLogin = async (req, res) => { try { const { token } = req.body;

const ticket = await client.verifyIdToken({
  idToken: token,
  audience: "368841272750-bsgr39djulkqk32p6utco69sqsjj83mc.apps.googleusercontent.com",
});
const payload = ticket.getPayload();
const { email, name, sub: googleId } = payload;

let user = await Users.findOne({ email });

if (!user) {

  const randomPassword = Math.random().toString(36).slice(-8); 
  const hashedPassword = await bcrypt.hash(randomPassword, 10);

  user = new Users({
    firstname: name.split(" ")[0],
    lastname: name.split(" ")[1] || "",
    email: email,
    googleId,
    password: hashedPassword, 
  });

  
  const subject = "Your Temporary Password";
  const text = `Welcome! Your temporary password is: ${randomPassword}. Please change your password from your profile settings.`;
  await sendMailToNewUSer(email, subject, text);

  
  await user.save();

  return res.status(200).json({
    id: user._id,
    token: jwt.sign({ email }, "KEY", { expiresIn: "15h" }),
    newUser: true, 
  });
} else {
 
  const jwtToken = jwt.sign({ email }, "KEY", { expiresIn: "15h" });

  return res.status(200).json({
    id: user._id,
    token: jwtToken,
    newUser: false, 
  });
}
} catch (error) { console.error(error); res.status(500).json({ msg: "Google Login Failed" }); } };

export const changePassword = async (req, res) => {
  try {
    const { id } = req.params; 
    const { oldPassword, newPassword } = req.body;

    const user = await Users.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Old password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ msg: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "Email not registered" });
    }

    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);
console.log(tempPassword, "tempPassword")
    user.password = hashedPassword;
    await user.save();

    await sendMailToNewUser(email,`Your Temparary Password ` `Your temporary password is: ${tempPassword}`);

    return res.status(200).json({ success: true, message: "Temporary password sent" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error sending temporary password" });
  }
};

