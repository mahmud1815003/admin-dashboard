const {productModel} = require('../models/Product');
const {productStatModel} = require("../models/ProductStat");
const {userModel : user} = require('../models/User');
const {transactionModel} = require('../models/Transaction')
const  getCountryIso3 = require('country-iso-2-to-3');
const getProduct = async (req,res) => {
    try{
        const products = await productModel.find();
        const productWithStats = await Promise.all(products.map(async (product) => {
            const stat = await productStatModel.find({
                productId: product._id,
            });
            return {
                ...product._doc,
                stat,
            }
        }));
        res.status(200).json(productWithStats);
    }catch(error){
        res.status(404).json({
            message: error.message,
        })
    }
}

const getCustomer = async (req,res) => {
    try{
        const customer = await user.find({role: 'user'}).select('-password');
        res.status(200).json(customer);

    }catch(error){
        res.status(400).json(error.message);
    }
}

const getTransaction = async (req,res) => {
    try{

        // sort should look like this: { "field": "userId", "sort": "desc"}
        const {page = 1, pageSize = 20, sort = null, search = ""} = req.params;
        console.log(req.query);

        // formatted sort should look like { userId: -1 }
        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed?.field]: sortParsed?.sort == 'asc' ? 1 : -1
            }

            return sortFormatted;
        }
        const sortFormated = Boolean(sort) ? generateSort() : {};
        const transactions = await transactionModel.find({
            $or: [
                {cost: {$regex: new RegExp(search, 'i')}},
                {userId: {$regex: new RegExp(search, 'i')}}
            ]
        }).sort(sortFormated)
          .skip(page*pageSize)
          .limit(pageSize);
        

        const total = await transactionModel.find({
            userId: {$regex: new RegExp(search, 'i')}
        }); 
        // console.log(total);
        res.status(200).json({
            transactions,
            total,
        })
        
    }catch(error){
        res.status(404).json(error.message);
    }
}

const getGeography = async (req,res) => {
    try{
        const data = await user.find();
        const mappedLocations = data.reduce((acc,{country}) => {
            const countryIso3 = getCountryIso3(country);
            if(!acc[countryIso3]){
                acc[countryIso3] = 1;
            }else{
                acc[countryIso3]++;
            }
            return acc;
        }, {});
        
        const finalFormat = Object.entries(mappedLocations).map(([country, count]) => {
            return {
                id: country,
                value: count,
            }
        });

        res.status(200).json(finalFormat);

    }catch(error){
        res.status(404).json(error.message);
    }
}

module.exports = {
    getProduct,
    getCustomer,
    getTransaction,
    getGeography,
}