const { sequelize } = require('../models');

async function generateTicketNumber(tableName) {
  try {
    // Get the current date in YYYYMMDD format
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD

    // Fetch the last ticket ID from the database
    const [result] = await sequelize.query(`
      SELECT MAX(id) AS lastId FROM "${tableName}"
    `);
    
    const lastId = result[0]?.lastid || 0;
    
    // Generate the new ticket number
    const newId = (lastId + 1).toString().padStart(4, '0');    
    
    const ticketNumber = `KTN${formattedDate}-${newId}`;
    return ticketNumber;
  } catch (error) {
    console.error('Error generating ticket number:', error);
    throw new Error('Failed to generate ticket number.');
  }
}

module.exports = generateTicketNumber;
