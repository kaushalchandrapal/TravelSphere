

const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({

    firstName:{
        type:String,
        required:true,
        trim: true
    },
    lastName:{
        type:String,
        required:true,
        trim: true
    },
    email:{
        type: String,
        required:true,
        trim: true
    },
    startDate:{
        type:String,
        required:true
    },
    endDate:{
        type:String,
        required:true
    },
    
    destination:{
        type:String,
        required:true,
        trim: true
    },
    estimatedExpenses:{
        type:Number,
        required:true,
        trim: true
    },
    travelDescription:{
        type: mongoose.Schema.Types.Mixed,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('plan',planSchema);