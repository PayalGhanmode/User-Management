import AddUser from "../models/userModel";
import { Parser } from 'json2csv';
import csv from 'csv-parser';
import fs from 'fs';
import { MESSAGE, STATUS_CODE } from '../config/constants';

// Get all users with pagination
export const getUsers = async (req, res) => {
  const { page = 1, limit = 2 } = req.query;
  try {
    const users = await AddUser.find()
      .limit(parseInt(limit))
      .skip((page - 1) * limit)
      .exec();

    const count = await AddUser.countDocuments();

    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERR).json({ message: err.message });
  }
};

// Get all users data without pagination
export const getUSersData = async (req, res) => {
  try {
    const users = await AddUser.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { firstname, lastname, email, createdBy } = req.body;
  console.log(createdBy, "createdBy");
  
  if (!firstname || !lastname || !email) {
    return res.status(STATUS_CODE.BAD_REQ).json({ message: MESSAGE.ALL_FILEDS_REQ });
  }

  const user = new AddUser({
    firstname,
    lastname,
    email,
    createdBy,
  });

  try {
    const newUser = await user.save();
    res.status(STATUS_CODE.NEW_CREATED).json(newUser);
  } catch (err) {
    res.status(STATUS_CODE.BAD_REQ).json({ message: err.message });
  }
};

// Get users by ID
export const getUsersbyid = async (req, res) => {
  const { page = 1, limit = 2 } = req.query;
  try {
    const users = await AddUser.find({ createdBy: req.params.id })
      .limit(parseInt(limit))
      .skip((page - 1) * limit)
      .exec();

    const count = await AddUser.countDocuments();

    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERR).json({ message: err.message });
  }
};

// Export users as CSV
export const exportUsers = async (req, res) => {
  try {
    const users = await AddUser.find({ createdBy: req.user._id });
    const json2csvParser = new Parser();
    const csvData = json2csvParser.parse(users);

    res.header('Content-Type', 'text/csv');
    res.attachment('users.csv');
    res.send(csvData);
  } catch (error) {
    res.status(500).json({ message: 'Error exporting users', error });
  }
};


export const importUsers = async(req, res) => {
  try {
    console.log(req.body)
    console.log(req.params.id, "ghfxjhsgoooooooooooooooooooooo")
    const users = req.body.users
    for(let u of users){
      
  const user = new AddUser({
    firstname:u.firstname,
    lastname:u.lastname,
    email:u.email,
    createdBy:req.params.id,
  });

      const data = await user.save()
      console.log(data)
    }
    
  } catch (error) {
    res.status(500).json({ message: 'Error exporting users', error });
    
  }
};