import express from 'express';
import {
  createOwnerStats,
  updateOwnerStats,
  getAllOwnerStats,
  getOwnerStatsById,
  deleteOwnerStats
} from '../controllers/venueOwnerStats.js';

const router = express.Router();

router.post('/', createOwnerStats);
router.put('/:id', updateOwnerStats);
router.get('/', getAllOwnerStats);
router.get('/:id', getOwnerStatsById);
router.delete('/:id', deleteOwnerStats);

export default router;
