const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

const courseSchema = new mongoose.Schema({
    courseTitle: {
        type: String,
        required: true
    },
    courseDesc: {
        type: String,
        required: true
    },
    courseDuration: {
        type: Number,
        required: true,
    },
})

courseSchema.plugin(autoIncrement.plugin, { model: 'Course', field: 'id' });

module.exports = {
    Course: mongoose.model('Course', courseSchema)
}