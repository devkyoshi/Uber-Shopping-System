const Feedback = require("../../models/customer/customer_feedback_schema");
let Customer = require("../../models/customer/customer_register_schema.js")
const { errorHandler } = require("../../utils/error");

const submitFeedback = async(req, res, next) => {
    try {
        const { cus_feedback, cus_id } = req.body;

        if( cus_id !== req.customer.id){
            return next(errorHandler(403, 'You are not allowed to post this feedback'));
        }

        const newFeedback = new Feedback({
            cus_feedback,
            cus_id,
        });
        await newFeedback.save();

        res.status(200).json(newFeedback);
    } catch (error) {
        next(error);
    }
};

const getFeedbacks = async(req,res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;

        let query = {};

        if (req.query.searchTerm) {
            query.$or = [
                { cus_feedback: { $regex: req.query.searchTerm, $options: 'i' } }
            ];
        }

        const cus_feedback = await Feedback.find(query).sort({createdAt: sortDirection}).skip(startIndex).limit(limit);
        
        const totalFeedbacks = await Feedback.countDocuments();

            const now = new Date();
            const previous = new  Date(
                now.getFullYear(),
                now.getMonth() - 1,
                now.getDate()
            );

            const lastMonthFeedbacks = await Feedback.countDocuments({
                createdAt: { $gte: previous },
            });
        res.status(200).json({cus_feedback,totalFeedbacks,lastMonthFeedbacks});
    } catch (error) {
        next(error);
    }
};

const getUserFeedback = async(req, res, next) => {
    try {
        const customer = await Customer.findById(req.params.cus_ID);
        if(!customer){
            return next(errorHandler(404, 'User not found'));
        }
        const { cus_password: _, ...userData } = customer._doc;
        res.status(200).json(userData);
    } catch (error) {
        next(error);
    }
};

const likeFeedback = async(req, res, next) => {
    try {
        const feedback = await Feedback.findById(req.params.feedback_ID);
        if(!feedback){
            return next(errorHandler(404, 'Feedback not found'));
        }

        const userIndex = feedback.likes.indexOf(req.customer.id);
        if(userIndex === -1){
            if(feedback.dislikes.includes(req.customer.id)){
                feedback.numberOfDislikes -= 1;
                feedback.dislikes.splice(userIndex, 1);
                feedback.numberOfLikes += 1;
                feedback.likes.push(req.customer.id);
            }else{
                feedback.numberOfLikes += 1;
                feedback.likes.push(req.customer.id);
            }
        }else{
            feedback.numberOfLikes -= 1;
            feedback.likes.splice(userIndex, 1);
        }
        await feedback.save();
        res.status(200).json(feedback);
    } catch (error) {
        next(error);
    }
};

const dislikeFeedback = async(req, res, next) => {
    try {
        const feedback = await Feedback.findById(req.params.feedback_ID);
        if(!feedback){
            return next(errorHandler(404, 'Feedback not found'));
        }

        const userIndex = feedback.dislikes.indexOf(req.customer.id);
        if(userIndex === -1){
            if(feedback.likes.includes(req.customer.id)){
                feedback.numberOfLikes -= 1;
                feedback.likes.splice(userIndex, 1);
                feedback.numberOfDislikes += 1;
                feedback.dislikes.push(req.customer.id);
            }else{
                feedback.numberOfDislikes += 1;
                feedback.dislikes.push(req.customer.id);
            }
        }else{
            feedback.numberOfDislikes -= 1;
            feedback.dislikes.splice(userIndex, 1);
        }
        await feedback.save();
        res.status(200).json(feedback);
    } catch (error) {
        next(error);
    }
};

const editFeedback = async(req, res, next) => {
    try {
        const feedback = await Feedback.findById(req.params.feedback_ID);
        if(!feedback){
            return next(errorHandler(404, 'Feedback not found'));
        }

        if(feedback.cus_id !== req.customer.id && req.customer.adminType !== 'customer'){
            return next(errorHandler(403, 'You are not allowed to edit this feedback!'));
        }

        const updatedFeedback = await Feedback.findByIdAndUpdate(
            req.params.feedback_ID,{
                cus_feedback: req.body.content,
            },{new: true}
        );
        res.status(200).json(updatedFeedback);
    } catch (error) {
        next(error);
    }
};

const deleteFeedback = async(req, res, next) => {
    try {
        const feedback = await Feedback.findById(req.params.feedback_ID);
        if(!feedback){
            return next(errorHandler(404, 'Feedback not found'));
        }

        if(feedback.cus_id !== req.customer.id && req.customer.adminType !== 'customer'){
            return next(errorHandler(403, 'You are not allowed to edit this feedback!'));
        }
        await Feedback.findByIdAndDelete(req.params.feedback_ID);
        res.status(200).json('Feedback has been removed.');
    } catch (error) {
        next(error);
    }
};

module.exports = { submitFeedback, getFeedbacks, getUserFeedback, likeFeedback, dislikeFeedback, editFeedback, deleteFeedback}