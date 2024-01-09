import { Schema, model } from "mongoose";

const eventSchema = new Schema({
    eventName:{
        type: String
    },
    eventDescription:{
        type: String
    },
    eventLogo:{
        type: String
    }

})

const events = model('events' , eventSchema);

export default events;