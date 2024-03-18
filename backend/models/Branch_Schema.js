const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const branchSchema = new Schema({
    Branch_ID : {
        type : String,
        required : true
    },
    Branch_name : {
        type : String,
        required : true
    },
    Branch_Location :{
        type : String,
        require : true,
    },
    District :{
        type : String,
        require : true,
    },
/*    Branch_Latitude:{
        type : String,
        require : true,
    },
    Branch_Longtitude:{
        type : String,
        require : true,
    }
*/

})

const Branch =  mongoose.model("Branch", branchSchema);
module.exports = Branch;