import { Schema, model } from 'mongoose';

const npcSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'An AI must have a name'],
    },
    aiType: {
      type: String,
      required: [true, 'An AI must have a type'],
      enum: ['GPT', 'CHOICE'],
      default: 'GPT',
    },
    image: {
      type: String,
      required: [true, 'An AI must have an image'],
    },
    prompt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const NPC = model('AI', npcSchema);

export default NPC;
