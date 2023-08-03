import { config } from 'dotenv';
import axios from 'axios';
import NPC from '../models/npcModel.js';
import Message from '../models/messageModel.js';
import Rooms from '../models/roomModel.js';

config({ path: './.env' });

export async function getAllMessage(req, res) {
  try {
    if (!req.params.roomId) {
      return res.status(400).json({ message: 'Missing Fields' });
    }
    const messages = await Message.find({ roomId: req.params.roomId }).limit(
      100
    );
    res.status(200).json({
      messages,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
}

export async function addMessage(req, res) {
  try {
    const { message, roomId, senderType, sender, npcId } = req.body;
    if (!message || !roomId || !senderType || !sender) {
      return res.status(400).json({
        message: 'Missing Fields',
      });
    }
    const userMessage = await Message.create({
      message,
      roomId,
      senderType,
      sender,
    });
    if (senderType === 'USER') {
      const npc = await NPC.findById(npcId);
      let chatroom;
      if (npc.name === 'Justin') {
        chatroom = 'chatroom_1';
      } else if (npc.name === 'Noel') {
        chatroom = 'chatroom_2';
      }

      let data = JSON.stringify({
        input: message,
      });
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://mitsuki.software/chat/${chatroom}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      const response = await axios.request(config);
      const aiResponse = response.data;
      const room = await Rooms.findById(roomId);

      const aiMessage = await Message.create({
        message: aiResponse,
        roomId: roomId,
        senderType: 'NPC',
        sender: room.npc,
      });
      if (aiMessage) {
        await room.updateOne({ lastMessage: aiMessage._id })
        return res.status(200).json({
          message: 'Chats Added Successfully',
          userMessage,
          aiMessage,
        });
      }
      return res.status(400).json({
        message: 'Chat was not added into the database',
      });
    }
  } catch (err) {
    return res.status(404).json({
      message: `${err.message}`,
    });
  }
}
