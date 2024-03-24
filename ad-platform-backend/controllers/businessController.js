const Business = require('../models/businessModel');
const Ad = require('../models/adModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerBusiness = async (req, res) => {
    try{
        const { name, email, password, address, website, contactNumber } = req.body;
        const businessExists = await Business.findOne({email});

        if(businessExists){
            return res.status(400).json({message: 'Business already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const business = await Business.create({
            name,
            email,
            password: hashedPassword,
            address,
            website,
            contactNumber
        });

        console.log("business created", business);
        if(business){
            res.status(201).json({
                _id: business._id,
                name: business.name,
                email: business.email,
                address: business.address,
                website: business.website,
                contactNumber: business.contactNumber
            });
        }
        else{
            res.status(400).json({message: 'Invalid business data'});
        }
        // res.status(201).json({message: 'Business registered'});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
}

const loginBusiness = async (req, res) => {
    try{
        const { email, password } = req.body;

        const business = await Business.findOne({email});
        if(business && (await bcrypt.compare(password, business.password))){
            const token = jwt.sign(
                {id: business._id},
                process.env.SECRETKEY,
                {
                    expiresIn: '1d'
                }
            );
            
            res.status(200).json({token,message: 'Business logged in'});

        }
        else{
            res.status(400).json({message: 'Invalid email or password'});
        }
        // res.json({message: 'Business logged in'});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
}



// const currentBusiness = async(req, res) => {
//     try{
//         res.json(req.business);
//     }
//     catch(error){
//         // console.error(error);
//         res.status(500).json({message: 'Server Error'});
//     }
// }

//get the current business
const currentBusiness = async (req, res) => {
    try {
        const business = await Business.findById(req.userId).select('-password');
        if (business) {
            res.json(business);
        }
        else {
            res.status(404).json({ message: 'Business not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

const createAd = async(req, res) => {
    try{
        const {content, target_gender,target_age_range,target_location} = req.body;
        const business = req.userId;
        const ad = await Ad.create({
            content,
            business,
            target_gender,
            target_age_range,
            target_location
        });
        if(ad){
            res.status(201).json({
                _id: ad._id,
                content: ad.content,
                business: ad.business,
                targets: {
                    target_gender: ad.target_gender,
                    target_age_range: ad.target_age_range,
                    target_location: ad.target_location           
                }
            });
        }
        else{
            res.status(400).json({message: 'Invalid ad data'});
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }

}

const getAds = async(req, res) => {
    try{
        const businessId = req.userId;
        const ads = await Ad.find({business: businessId});
        if(ads){
            res.status(200).json(ads);
        }
        else{
            res.status(400).json({message: 'No ads found'});
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }

}

const deleteAd = async(req, res) => {
    try {
        const adId = req.params.id;
        const businessId = req.userId;

        const ad = await Ad.findById(adId);

        if(ad) {
            if(ad.business.toString() === businessId) {
                await Ad.deleteOne({ _id: adId });
                res.status(200).json({ message: 'Ad removed' });
            } else {
                res.status(401).json({ message: 'Unauthorized' });
            }
        } else {
            res.status(404).json({ message: 'Ad not found' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateAd = async(req, res) => {
    try {
        const adId = req.params.id;
        const data = req.body;
        const ad = await Ad.findById(adId);
        if(!ad) {
            return res.status(404).json({ message: 'Ad not found' });
        }
        const updatedAd = await Ad.findByIdAndUpdate(
            adId,
            data,
            { new: true }
        );
        res.status(200).json(updatedAd);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { registerBusiness, loginBusiness, currentBusiness, createAd, getAds, deleteAd, updateAd};