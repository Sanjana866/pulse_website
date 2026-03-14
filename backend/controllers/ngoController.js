import NGO from "../models/NGO.js";

export const getAllNGOs = async (req, res) => {
  try {
    const ngos = await NGO.find({ verified: true }).sort({ name: 1 });
    res.status(200).json({ success: true, ngos });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
export const seedNGOs = async (req, res) => {
  try {
    const existing = await NGO.countDocuments();
    if (existing > 0) {
      return res.status(200).json({ message: "NGOs already seeded", success: true });
    }

    const sampleNGOs = [
      {
        name: "Goonj",
        description: "Turning urban surplus into a resource for rural India.",
        acceptedCategories: ["Clothes", "Books", "Furniture", "Other"],
        address: "J-93, Sarita Vihar",
        city: "New Delhi",
        phone: "+91-11-26972351",
        email: "mail@goonj.org",
        lat: 28.5355,
        lng: 77.391,
      },
      {
        name: "CRY - Child Rights and You",
        description: "Ensuring happy childhoods for underprivileged children.",
        acceptedCategories: ["Books", "Clothes", "Other"],
        address: "189/A, Anand Estate, Sane Guruji Marg",
        city: "Mumbai",
        phone: "+91-22-23063647",
        email: "info@cry.org",
        lat: 19.076,
        lng: 72.8777,
      },
      {
        name: "Feeding India",
        description: "Eliminating hunger by redistributing surplus food.",
        acceptedCategories: ["Food"],
        address: "Plot No. 22, Sector 18",
        city: "Gurugram",
        phone: "+91-8800-733700",
        email: "hello@feedingindia.org",
        lat: 28.4595,
        lng: 77.0266,
      },
      {
        name: "Pratham",
        description: "Improving quality of education for underprivileged children.",
        acceptedCategories: ["Books", "Electronics"],
        address: "Y.B. Chavan Centre, 4th Floor, Gen. J. Bhosale Marg",
        city: "Mumbai",
        phone: "+91-22-22819561",
        email: "info@pratham.org",
        lat: 18.9322,
        lng: 72.8264,
      },
      {
        name: "iCreate",
        description: "Empowering entrepreneurs with technology and resources.",
        acceptedCategories: ["Electronics", "Furniture", "Other"],
        address: "Opposite Vikram Sarabhai Space Centre",
        city: "Ahmedabad",
        phone: "+91-79-61600600",
        email: "connect@icreate.org.in",
        lat: 23.0225,
        lng: 72.5714,
      },
    ];

    await NGO.insertMany(sampleNGOs);
    res.status(201).json({ message: "NGOs seeded successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
