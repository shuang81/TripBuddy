const mongoose = require('mongoose');

const Category = {
    Restaurant: "Restaurant",
    Residence: "Residence",
    Attractions: "Attractions",
    Educational: "Educational",
    Outdoors: "Outdoors",
    Cultural: "Cultural",
    Religious: "Religious",
    Other: "Other"
}

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    rating: Number,
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: { type: Date, default: Date.now },
    image: String,
    category: {
        type: String,
        enum: Category
    },
    address: String,
    country: String,
    city: String,
    comments: [{ 
        body: String, 
        date: Date, 
        postedBy: {
            type: [mongoose.Schema.Types.ObjectId], 
            ref: 'User'
        }
    }], 
    likes: {
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'User'
    }, //list of user ids
    views: {
        type: Number,
        default: 0
    },
    reported: [
      {
        reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        report: {
          type: String,
          default: "",
          required: false,
        },
      },
    ],
}, { timestamps: true}) // will give properties createdAt and updatedAt

module.exports = mongoose.model('Post', postSchema);