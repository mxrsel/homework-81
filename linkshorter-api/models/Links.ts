import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const LinkSchema = new Schema({
    originalUrl: {
        type: String,
        required: true,
    },

    shortenUrl: {
        type: String,
        required: true,
    },

});

const Link = mongoose.model('Link', LinkSchema);
export default Link;