const express = require("express");
const router = express.Router();
const Announcement = require("../model/Announcement");

// POST: Create announcement
router.post("/", async (req, res) => {
  try {
    const { title, message } = req.body;
    if (!title || !message) {
      return res.status(400).json({ error: "Title and message are required." });
    }

    const newAnnouncement = await Announcement.create({ title, message });
    res.status(201).json({ message: "Announcement created", announcement: newAnnouncement });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// routes/announcements.js or similar
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch announcements" });
  }
});

// DELETE /announcements/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const announcement = await Announcement.findById(id);
    if (!announcement) {
      return res.status(404).json({ error: "Announcement not found" });
    }

    await Announcement.findByIdAndDelete(id);
    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (err) {
    console.error("Error deleting announcement:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /announcements/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, message } = req.body;

    const announcement = await Announcement.findById(id);
    if (!announcement) {
      return res.status(404).json({ error: "Announcement not found" });
    }

    announcement.title = title || announcement.title;
    announcement.message = message || announcement.message;
    await announcement.save();

    res.status(200).json({ message: "Announcement updated", announcement });
  } catch (err) {
    console.error("Error updating announcement:", err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
