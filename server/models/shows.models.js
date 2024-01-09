import { Schema, model } from "mongoose";

const showsSchema = new Schema({

    AllDates:[
        {
            dates:Date,
            timeSlots:[
                {
                    slots: Date,
                    price: Number,
                }
            ]
        }
    ],
    eventId:{
        type: Schema.Types.ObjectId
    }
})

const shows = model('shows' , showsSchema);

export default shows;