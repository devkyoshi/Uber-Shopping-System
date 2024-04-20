const Announcement = require("../models/announcement.model");
const { errorHandler } = require('../utils/error');

const announcement = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a post'));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }

  const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');

  const newAnnouncement = new Announcement({ ...req.body, slug, userId: req.user.id });

  try {
    const savedAnnouncement = await newAnnouncement.save();
    res.status(201).json(savedAnnouncement);
  } catch (error) {
    next(error);
  }
};

const getannouncement = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const announcements = await Announcement.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.announcementId && { _id: req.query.announcementId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    }).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit);

    const totalAnnouncements = await Announcement.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthAnnouncements = await Announcement.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      announcements,
      totalAnnouncements,
      lastMonthAnnouncements,
    });
  } catch (error) {
    next(error);
  }
};

const deleteannouncement = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this announcement'));
  }
  try {
    await Announcement.findByIdAndDelete(req.params.announcementId);
    res.status(200).json('The announcement has been deleted');
  } catch (error) {
    next(error);
  }
};

const updateannouncement = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this announcement'));
  }
  try {
    const updateannouncement = await Announcement.findByIdAndUpdate(
      req.params.announcementId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
        },
      },
      { new: true }
    );
    res.status(200).json(updateannouncement);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  announcement,
  getannouncement,
  deleteannouncement,
  updateannouncement,
};
