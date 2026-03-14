import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Clothes", "Food", "Books", "Electronics", "Furniture", "Other"],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    description: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    ngoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NGO",
      default: null,
    },
    ngoName: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Pending", "Matched", "Scheduled", "Picked Up", "Delivered"],
      default: "Pending",
    },
    pickupAddress: {
      type: String,
      default: "",
    },
    pickupDate: {
      type: Date,
      default: null,
    },
    pickupTimeSlot: {
      type: String,
      default: "",
    },
    co2SavedKg: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Donation = mongoose.model("Donation", DonationSchema);
export default Donation;
