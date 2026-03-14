import mongoose from "mongoose";

const NGOSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    acceptedCategories: {
      type: [String],
      enum: ["Clothes", "Food", "Books", "Electronics", "Furniture", "Other"],
      default: [],
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    verified: {
      type: Boolean,
      default: true,
    },
   
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const NGO = mongoose.model("NGO", NGOSchema);
export default NGO;
