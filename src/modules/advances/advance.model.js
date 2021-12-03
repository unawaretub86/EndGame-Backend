import mongoose from 'mongoose';
const { Schema } = mongoose;

const advancesSchema = new Schema({
  project_id: {
    type: Schema.ObjectId,
    required: true,
  },
  addDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  observations: {
    type: String,
  }
})

const Advances = new mongoose.model('advances', advancesSchema);

export default Advances;