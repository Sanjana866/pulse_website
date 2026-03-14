import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createDonation,
  getUserDonations,
  getUserStats,
  schedulePickup,
  updateDonationStatus,
  deleteDonation,
} from "../controllers/donationController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createDonation);                              
router.get("/", getUserDonations);                            
router.get("/stats", getUserStats);                            
router.patch("/:donationId/pickup", schedulePickup);           
router.patch("/:donationId/status", updateDonationStatus);     
router.delete("/:donationId", deleteDonation);                 

export default router;
