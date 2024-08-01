import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({

    feed: {
        type: mongoose.Schema.Types.String,
        required: true
    }
        
})

export const Feed = mongoose.model("Feed", FeedbackSchema); 