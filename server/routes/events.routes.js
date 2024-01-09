import { Router } from "express";
import { addEvent, addShow, getAllEvents, getEventById, getShows } from "../controllers/shows.controllers.js";
import isLoggedIn from "../middlewares/authentication.js";
import authorisedRoles from "../middlewares/authorization.js";

const router = Router();

router.post('/addEvent' ,isLoggedIn,authorisedRoles('ADMIN'), addEvent);
router.post('/addShow'  ,isLoggedIn , authorisedRoles('ADMIN') , addShow);
router.get('/getAllEvents' , getAllEvents);
router.post('/datepicker/:eventId' , getShows);
router.post('/getEventById' , getEventById);

export default router;