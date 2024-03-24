const mongoose = require('mongoose');
require('dotenv').config();
const url = `mongodb+srv://Zenith:${process.env.MONGOPASSWORD}@ad-platform.dvlkxts.mongodb.net/?retryWrites=true&w=majority&appName=ad-platform`;

const connectDB= async () =>{
    try
    {
        const connect = await mongoose.connect(url);
        console.log("Database connected: ",connect.connection.host,connect.connection.name);
    } 
    catch (error) 
    {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;