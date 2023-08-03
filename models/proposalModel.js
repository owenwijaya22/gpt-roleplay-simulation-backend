import { Schema, model } from 'mongoose';

const slidesSchema = new Schema({
  id: {
    type: Number,
    required: [true, 'A slide must have an order'],
  },
  thumbnailUrl: {
    type: String,
  },
  items: [{}],
});

const proposalSchema = new Schema({
  // attempt: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Attempt',
  //   required: [true, 'A proposal must have an attempt'],
  //   unique: true,
  // },
  attempt: {
    type: String,
    required: [true, 'A proposal must have an attempt'],
    unique: true,
  },
  slides: [slidesSchema],
});

const Proposal = model('Proposal', proposalSchema);

export default Proposal;
