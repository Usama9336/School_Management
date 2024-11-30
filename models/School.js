// models/School.js
import pool from '../config/database.js';
import calculateDistance from '../utils/geoUtils.js';
class School {
  static async create(name, address, latitude, longitude) {
    const [result] = await pool.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );
    return result.insertId;
  }

  static async findNearby(userLat, userLon) {
    const [schools] = await pool.execute('SELECT * FROM schools');
    
    return schools
      .map(school => ({
        ...school,
        distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
      }))
      .sort((a, b) => a.distance - b.distance);
  }

  static async validateSchool(name, address, latitude, longitude) {
    if (!name || name.trim() === '') {
      throw new Error('School name is required');
    }
    if (!address || address.trim() === '') {
      throw new Error('School address is required');
    }
    if (latitude == null || isNaN(latitude)) {
      throw new Error('Invalid latitude');
    }
    if (longitude == null || isNaN(longitude)) {
      throw new Error('Invalid longitude');
    }
  }
}

export default School;