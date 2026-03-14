import Donation from "../models/Donation.js";
import NGO from "../models/NGO.js";

const CO2_MAP = {
  Clothes: 2.0,
  Food: 0.3,
  Books: 0.5,
  Electronics: 3.0,
  Furniture: 5.0,
  Other: 0.5,
};

export const createDonation = async (req, res) => {
  try {
    const { itemName, category, quantity, description, imageUrl } = req.body;
    const userId = req.user.userId;

    if (!itemName || !category || !quantity) {
      return res.status(400).json({ message: "itemName, category, and quantity are required", success: false });
    }

    const matchedNGO = await NGO.findOne({ acceptedCategories: category, verified: true });

    const co2SavedKg = (CO2_MAP[category] || 0.5) * quantity;

    const donation = new Donation({
      userId,
      itemName,
      category,
      quantity,
      description: description || "",
      imageUrl: imageUrl || "",
      ngoId: matchedNGO?._id || null,
      ngoName: matchedNGO?.name || "",
      status: matchedNGO ? "Matched" : "Pending",
      co2SavedKg,
    });

    await donation.save();

    res.status(201).json({
      message: "Donation listed successfully",
      success: true,
      donation,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const getUserDonations = async (req, res) => {
  try {
    const userId = req.user.userId;
    const donations = await Donation.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, donations });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
export const getUserStats = async (req, res) => {
  try {
    const userId = req.user.userId;
    const donations = await Donation.find({ userId });

    const itemsDonated = donations.reduce((sum, d) => sum + d.quantity, 0);
    const ngosDonated = new Set(donations.filter(d => d.ngoId).map(d => String(d.ngoId))).size;
    const co2SavedKg = donations.reduce((sum, d) => sum + d.co2SavedKg, 0);

    const now = new Date();
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const monthly = Array(12).fill(0);
    donations.forEach(d => {
      const date = new Date(d.createdAt);
      if (date.getFullYear() === now.getFullYear()) {
        monthly[date.getMonth()] += d.quantity;
      }
    });
    const donationTimeline = months.map((month, i) => ({ month, donations: monthly[i] }));

    res.status(200).json({
      success: true,
      stats: { itemsDonated, ngosDonated, co2SavedKg: parseFloat(co2SavedKg.toFixed(1)), donationTimeline },
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
export const schedulePickup = async (req, res) => {
  try {
    const { donationId } = req.params;
    const { pickupAddress, pickupDate, pickupTimeSlot } = req.body;
    const userId = req.user.userId;

    if (!pickupAddress || !pickupDate || !pickupTimeSlot) {
      return res.status(400).json({ message: "Address, date, and time slot are required", success: false });
    }

    const donation = await Donation.findOne({ _id: donationId, userId });
    if (!donation) {
      return res.status(404).json({ message: "Donation not found", success: false });
    }
    if (!["Matched", "Pending"].includes(donation.status)) {
      return res.status(400).json({ message: `Cannot schedule pickup for a donation with status: ${donation.status}`, success: false });
    }

    donation.pickupAddress = pickupAddress;
    donation.pickupDate = new Date(pickupDate);
    donation.pickupTimeSlot = pickupTimeSlot;
    donation.status = "Scheduled";
    await donation.save();

    res.status(200).json({ message: "Pickup scheduled successfully", success: true, donation });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
export const updateDonationStatus = async (req, res) => {
  try {
    const { donationId } = req.params;
    const { status } = req.body;
    const userId = req.user.userId;

    const validStatuses = ["Pending", "Matched", "Scheduled", "Picked Up", "Delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status", success: false });
    }

    const donation = await Donation.findOneAndUpdate(
      { _id: donationId, userId },
      { status },
      { new: true }
    );
    if (!donation) {
      return res.status(404).json({ message: "Donation not found", success: false });
    }

    res.status(200).json({ message: "Status updated", success: true, donation });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
export const deleteDonation = async (req, res) => {
  try {
    const { donationId } = req.params;
    const userId = req.user.userId;

    const donation = await Donation.findOne({ _id: donationId, userId });
    if (!donation) {
      return res.status(404).json({ message: "Donation not found", success: false });
    }
    if (donation.status !== "Pending") {
      return res.status(400).json({ message: "Only pending donations can be deleted", success: false });
    }

    await donation.deleteOne();
    res.status(200).json({ message: "Donation deleted", success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
