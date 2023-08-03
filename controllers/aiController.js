import AI from '../models/npcModel.js';

export async function createAI(req, res) {
  try {
    if (!req.body.name || !req.body.image || !req.body.prompt) {
      return res.status(400).json({ message: 'Missing Fields' });
    }
    const newAI = await AI.create(req.body);

    res.status(201).json({
      ai: newAI,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getAllAIs(req, res) {
  try {
    const ais = await AI.find();
    if (!ais) {
      return res.status(404).json({ message: 'No ais found' });
    }
    res.status(200).json({
      ais,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getAIById(req, res) {
  try {
    const { id } = req.params;
    const ai = await AI.findById(id);
    if (!ai) {
      return res.status(404).json({ message: 'No ai found with that ID' });
    }
    return res.status(200).json({
      ai,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function updateAI(req, res) {
  try {
    const { id } = req.params;
    const ai = await AI.findById(id);
    if (!ai) {
      return res.status(404).json({ message: 'No ai found with that ID' });
    }
    req.body.modifiedAt = Date.now();
    const updatedAI = await AI.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json({
      ai: updatedAI,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function deleteAI(req, res) {
  try {
    const { id } = req.params;
    const ai = await AI.findById(id);
    if (!ai) {
      return res.status(404).json({ message: 'No ai found with that ID' });
    }
    await AI.findByIdAndDelete(id);
    return res.status(204).json({
      message: 'AI deleted',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
