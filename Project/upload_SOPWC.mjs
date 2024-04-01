import xlsx from "xlsx";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
import pkg from "pg";
const {Pool} = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database:process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, // default PostgreSQL port
})

const tableName = 'population_with_cancer';

const createTableQuery = `
CREATE TABLE ${tableName} (
  id SERIAL
  Country VARCHAR(255),
  Year INTEGER,
  "rate" DOUBLE PRECISION
);
`;

const insertDataQuery = `
INSERT INTO ${tableName} (
  country,
  year,
  "rate") 
  VALUES (
  $1, $2, $3
);
`;

const filePath = "C:/Users/oswme/Documents/Masters/BootCamp/Project/data/share-of-population-with-cancer.csv";
const workbook = xlsx.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
const client = await pool.connect();
console.log("Database Running");
await client.query(createTableQuery);
sheetData.forEach(async(row) => {
  try {
    await client.query(insertDataQuery, [
      row.Entity,
      row.Year,
      row['Prevalence - Neoplasms - Sex: Both - Age: Age-standardized (Percent)'],
    ]);
  } catch (err) {
    console.error(err);
    console.log({ error: 'Internal Server Error' });
  }
  });
console.log('Table created and data inserted successfully.');
client.release(); // Release the client back to the pool when done