// controllers/schoolController.js
import School from '../models/School.js';
const { validateSchool, create, findNearby } = School;

export async function addSchool(req, res) {
  try {
    const { name, address, latitude, longitude } = req.body;

    await validateSchool(name, address, latitude, longitude);
    const schoolId = await create(name, address, latitude, longitude);

    res.status(201).json({ 
      message: 'School added successfully', 
      schoolId 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function listSchools(req, res) {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const schools = await findNearby(
      parseFloat(latitude), 
      parseFloat(longitude)
    );

    res.json(schools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
