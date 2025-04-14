import express from 'express';
import {
  createVenueBooking,
  updateVenueBooking,
  getAllVenueBookings,
  getVenueBookingById,
  deleteVenueBooking
} from '../controllers/venueBookings.js';

const router = express.Router();

router.post('/', createVenueBooking);
router.put('/:id', updateVenueBooking);
router.get('/', getAllVenueBookings);
router.get('/:id', getVenueBookingById);
router.delete('/:id', deleteVenueBooking);

export default router;
