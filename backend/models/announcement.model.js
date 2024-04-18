const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        'https://www.speakinginbytes.com/wp-content/uploads/2016/12/announcement-banner.png',
    },
  },
  { timestamps: true }
);

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
