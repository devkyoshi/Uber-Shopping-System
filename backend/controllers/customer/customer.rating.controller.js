const Rating = require("../../models/customer/customer_rate_schema.js");
let Customer = require("../../models/customer/customer_register_schema.js")
let Employee = require("../../models/user.model.js")
const mongoose = require('mongoose');
const { errorHandler } = require("../../utils/error");

const getEmployees = async(req,res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        // const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;

        let query = {};

        if (req.query.searchTerm) {
            query.$or = [
                { username: { $regex: req.query.searchTerm, $options: 'i' } }
            ];
        }

        const employees = await Employee.find(query).sort({createdAt: sortDirection}).skip(startIndex);

        res.status(200).json({employees});
    }catch(error){
        next(error)
    }
}

const rateEmployees = async(req, res, next) => {
    try {
        const { cus_rating,cus_id } = req.body;
        const emp_id = req.params.emp_ID

        if( cus_id !== req.customer.id){
            return next(errorHandler(403, 'You are not allowed to rate this employee'));
        }

        const newRating = new Rating({
            cus_rating,
            cus_id,
            emp_id,
        });
        await newRating.save();

        const ratingStats = await Rating.aggregate([
            { $match: { emp_id: emp_id } },
        ]);

        let totalRating = 0;
        let count = 0;
        ratingStats.forEach((rating) => {
            totalRating += rating.cus_rating;
            count++;
        });

        let averageRating = null;
        if (count > 0) {
            averageRating = totalRating / count;
        }

        await Employee.updateOne({ _id: emp_id }, { $set: { Avg_rating: averageRating } });

        res.status(200).json(newRating);
    } catch (error) {
        next(error);
    }
};

const getRatings = async (req, res, next) => {
    try {
        const emp_id = req.params.emp_ID;
        const cus_id = req.customer.id;
        let rating = await Rating.findOne({ emp_id, cus_id }).sort({ createdAt: -1 }).limit(1).select('emp_id cus_rating -_id');

        if (!rating) {
            rating = { cus_rating: 0,emp_id };
        }

        res.status(200).json({ rating });
    } catch (error) {
        next(error);
    }
};


module.exports = { getEmployees, rateEmployees, getRatings }