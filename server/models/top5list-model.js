const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerEmail: { type: String, required: true},
        like: { type: [String], required: true },
        dislike: { type: [String], required: true },
        comment: { type: [], required: true },
        view: { type: Number, required: true },
        publish: {type: Number, required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
