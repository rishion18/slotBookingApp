import events from "../models/events.models.js";
import shows from "../models/shows.models.js";
import mongoose from "mongoose";


export const addEvent = async(req , res) => {
    try{
      const newEvent = await events.create(req.body);
      res.status(200).send({status: true , message:'new event created!'});
    }catch(e){
        res.status(500).send({status: false , message:e.message});
    }
}

export const addShow = async(req , res) => {
    try{
        const newShow = await shows.create(req.body);
        res.status(200).send({status: true , message: 'new show created!'});
    }catch(e){
        res.status(500).send({status: false , message: e.message});
    }
}

export const getAllEvents = async(req , res) => {
    try{
      const allEvents = await events.find();
    //   const data = await allEvents.json();
      res.status(200).send(allEvents);
    }catch(e){
        res.status(500).send(e.message);
    }
}

export const getEventById = async(req , res) => {
  try{
    const {eventId} = req.body;
    const event = await events.findById(eventId);
    res.status(200).send(event);
  }catch(e){
    res.status(500).send(e.message);
  }
}

export const getShows = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const { startDate, endDate } = req.body;

    if (!eventId || !startDate || !endDate) {
      return res.status(400).json({ status: false, message: 'Invalid parameters' });
    }
    const result = await shows.aggregate([
      {$unwind:"$AllDates"},

      {
        $match: {
          eventId: new mongoose.Types.ObjectId(eventId),
          'AllDates.dates': {
            $gte: new Date(`${startDate}T00:00:00.000Z`),
            $lte: new Date(`${endDate}T23:59:59.999Z`),
          },
        },
      },
      {
        $group:{_id:"$eventId" , showArray:{$push:"$AllDates.timeSlots"}}
      }
    ]).exec();
    res.status(200).send(result);
  } catch (e) {
    console.error('Error getting shows:', e.message);
    res.status(500).json({ status: false, message: 'Internal Server Error' });
  }
};