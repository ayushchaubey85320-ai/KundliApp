import mysql from 'mysql2/promise';

async function testDatabase() {
  console.log('--- Connecting to Aiven MySQL ---');
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'mysql-2655a94a-deepak8532036-4b43.e.aivencloud.com',
      port: Number(process.env.DB_PORT) || 22065,
      user: process.env.DB_USER || 'avnadmin',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'defaultdb',
      ssl: {
        rejectUnauthorized: false
      }
    });

    console.log('✅ Connection to MySQL SUCCESSFUL!');

    // Check version
    const [versionRows] = await connection.execute('SELECT VERSION() as version');
    console.log('Database Version:', versionRows[0].version);

    // Create Tables
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(64) PRIMARY KEY,
        email VARCHAR(255) NULL,
        name VARCHAR(255) NOT NULL,
        avatar_url VARCHAR(512) NULL,
        auth_provider VARCHAR(32) DEFAULT 'google',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Table "users" verified/created.');

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS saved_kundlis (
        id VARCHAR(64) PRIMARY KEY,
        user_id VARCHAR(64) NULL,
        name VARCHAR(255) NOT NULL,
        gender VARCHAR(32) NOT NULL,
        birth_date VARCHAR(32) NOT NULL,
        birth_time VARCHAR(32) NOT NULL,
        cityName VARCHAR(255) NOT NULL,
        latitude DOUBLE NOT NULL,
        longitude DOUBLE NOT NULL,
        timezone_offset DOUBLE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_user (user_id)
      )
    `);
    console.log('✅ Table "saved_kundlis" verified/created.');

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS match_history (
        id VARCHAR(64) PRIMARY KEY,
        user_id VARCHAR(64) NULL,
        male_name VARCHAR(255) NOT NULL,
        male_date VARCHAR(32) NOT NULL,
        female_name VARCHAR(255) NOT NULL,
        female_date VARCHAR(32) NOT NULL,
        total_score DOUBLE NOT NULL,
        max_score DOUBLE DEFAULT 36.0,
        result_details JSON NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_user_match (user_id)
      )
    `);
    console.log('✅ Table "match_history" verified/created.');

    const [tables] = await connection.execute('SHOW TABLES');
    console.log('Existing Tables in defaultdb:', tables);

    await connection.end();
    console.log('--- Database verification complete: 100% SUCCESS ---');
  } catch (err) {
    console.error('❌ Connection Failed:', err.message);
  }
}

testDatabase();
