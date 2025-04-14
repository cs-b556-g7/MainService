import express from 'express';
import {
  createEventBooking,
  updateEventBooking,
  getAllEventBookings,
  getEventBookingById,
  deleteEventBooking
} from '../controllers/eventBookings.js';

const router = express.Router();

router.post('/', createEventBooking);
router.put('/:id', updateEventBooking);
router.get('/', getAllEventBookings);
router.get('/:id', getEventBookingById);
router.delete('/:id', deleteEventBooking);

export default router;
