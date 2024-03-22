// const Ad = require('../models/Ad');
// const Business = require('../models/Business');
// const Viewer = require('../models/Viewer');

// const createAd = async(req, res) => {
//     try{
//         const {content, target1,target2,target3} = req.body;
//         const business = req.business._id;
//         const ad = await Ad.create({
//             content,
//             business,
//             target1,
//             target2,
//             target3
//         });
//         if(ad){
//             res.status(201).json({
//                 _id: ad._id,
//                 content: ad.content,
//                 business: ad.business,
//                 targets: ad.targets
//             });
//         }
//         else{
//             res.status(400).json({message: 'Invalid ad data'});
//         }
//     }
//     catch(error){
//         console.error(error);
//         res.status(500).json({message: 'Server Error'});
//     }

// }

// const getAllAds = async(req, res) => {
//     try{
//         const ads = await Ad.find();
//         res.json(ads);
//     }
//     catch(error){
//         console.error(error);
//         res.status(500).json({message: 'Server Error'});
//     }
// }

