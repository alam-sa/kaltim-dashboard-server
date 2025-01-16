const { sequelize } = require('../models');

async function updateByColumns({ oldName, newName, columns }, t) {
  try {
    if (!columns || columns.length === 0) {
      throw new Error('No columns specified for update.');
    }

    // Fetch tables containing any of the specified columns
    const columnList = columns.map(col => `'${col}'`).join(', ');
    const [tables] = await sequelize.query(`
      SELECT DISTINCT table_name
      FROM information_schema.columns
      WHERE column_name IN (${columnList})
        AND table_schema = 'public';
    `);

    // Update each specified column in all tables
    for (const table of tables) {
      const tableName = table.table_name;
      for (const column of columns) {
        await sequelize.query(
          `UPDATE "${tableName}" SET "${column}" = :newName WHERE "${column}" = :oldName`,
          {
            replacements: { oldName, newName },
            t,
          }
        );
      }
    }
    console.log(`Successfully updated columns [${columns.join(', ')}] in all tables.`);
  } catch (error) {
    console.error('Error updating columns:', error);
    throw error;
  }
}

module.exports = updateByColumns;
