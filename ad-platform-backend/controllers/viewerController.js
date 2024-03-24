const Viewer = require('../models/viewerModel');
const Ad = require('../models/adModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const registerViewer = async (req, res) => {
try{
    const { name, email, password, age,gender,location,intrests } = req.body;
    const viewerExists = await Viewer.findOne({ email });
    if (viewerExists) {
        return res.status(400).json({ message: 'Viewer already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const viewer = await Viewer.create({
        name,
        email,
        password: hashedPassword,
        age,
        gender,
        location,
        intrests
    });

    console.log("viewer created",viewer);
    if(viewer){
        res.status(201).json({
            _id: viewer._id,
            name: viewer.name,
            email: viewer.email,
            age: viewer.age,
            gender: viewer.gender,
            location: viewer.location,
            intrests: viewer.intrests,
        });
    }
    else{
        res.status(400).json({message: 'Invalid viewer data'});
    }
    // res.status(201).json({ message: 'Viewer registered' });
}
catch(error){
    console.error(error);
    res.status(500).json({message: 'Server Error'});
}
}

const loginViewer = async (req, res) => {
    try{
    const { email, password } = req.body;

    const viewer = await Viewer.findOne({ email });
    if (viewer && (await bcrypt.compare(password, viewer.password))) {
        const token = jwt.sign(
            { id: viewer._id },
            process.env.SECRETKEY,
            {
                expiresIn: '1d',
            }
        );
        res.status(200).json({token,message: 'Viewer logged in'});
    }
    else{
        res.status(401).json({message: 'Invalid email or password'});
    }
    // res.json({message:'Viewer logged in'});
}
catch(error){
    console.error(error);
    res.status(500).json({message: 'Server Error'});
}
}

//current viewer
const currentViewer = async (req, res) => {
    try{
        const viewer = await Viewer.findById(req.viewer._id).select('-password');
        res.json(viewer);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
}

const getAllAds = async(req, res) => {
    try{
        const ads = await Ad.find();
        res.json(ads);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
}

const getTargetedAds = async(req,res) => {
    try{
        const viewer = await Viewer.findById(req.userId);
        const ads = await Ad.find({
            $or: [
                { 'target_gender': viewer.gender },
                {
                    $and: [
                        { 'target_age.min_age': { $lte: viewer.age } },
                        { 'target_age.max_age': { $gte: viewer.age } },
                    ]
                },
                { 'target_location.state': viewer.location.state },
                { 'target_location.city': viewer.location.city },
                { 'target_location.country': viewer.location.country }
            ]
        }).populate('business').exec();
        
        // return ads;
        res.status(200).json(ads);
    }
    catch(error){
        console.error('error fetching ads:',error);
        res.status(500).json({message: 'server error'});
    }
}

module.exports = { registerViewer, loginViewer, currentViewer, getAllAds, getTargetedAds};

