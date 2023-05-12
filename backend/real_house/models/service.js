const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Service = new Schema(
    {
        user_id:
        {
            type: 
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        },
        news_type_id:
        {
            type: 
            {
                type: mongoose.Schema.Types.Number,
                ref: "NewsType"
            }
        },
        number_day_id:
        {
            type: 
            {
                type: mongoose.Schema.Types.Number,
                ref: "NewsType"
            }
        },
        real_estate_id:
        {
            type: 
            {
                type: mongoose.Schema.Types.Number,
                ref: "RealHome"
            },
            unique: true
        },
        total_price:
        {
            type: Number,
            default: 0,
        },
        expiration_date:
        {
            type:Date,
            default: Date.now()
        }
    },
    {
        //auto createdAt, updatedAt
        timestamps:true,
    }
)

module.exports = mongoose.model("Service", Service);