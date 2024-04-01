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

const tableName = 'share_of_population_with_cancer_by_age';

const createTableQuery = `
CREATE TABLE ${tableName} (
  id SERIAL,
  Country VARCHAR(255),
  Year INTEGER,
  "zerotofive" DOUBLE PRECISION,
  "fiftytosixtynine" DOUBLE PRECISION,
  "fifteentofortynine" DOUBLE PRECISION,
  "fivetoforteen" DOUBLE PRECISION,
  "Seventy" DOUBLE PRECISION,
  "All" DOUBLE PRECISION
);
`;

const insertDataQuery = `
INSERT INTO ${tableName} (
  id SERIAL,
  Country,
  Year,
  "zerotofive",
  "fiftytosixtynine",
  "fifteentofortynine",
  "fivetoforteen",
  "Seventy",
  "All") 
  VALUES (
  $1, $2, $3, $4, $5, $6, $7, $8
);
`;

const filePath = "C:/Users/oswme/Documents/Masters/BootCamp/Project/data/share-of-population-with-cancer-by-age.csv";
const workbook = xlsx.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
const client = await pool.connect();
console.log("Database Running")
await client.query(createTableQuery);
sheetData.forEach(async(row) => {
  try {
    await client.query(insertDataQuery, [
      row.Entity,
      row.Year,
      row['Prevalence - Neoplasms - Sex: Both - Age: Under 5 (Percent)'],
      row['Prevalence - Neoplasms - Sex: Both - Age: 50-69 years (Percent)'],
      row['Prevalence - Neoplasms - Sex: Both - Age: 15-49 years (Percent)'],
      row['Prevalence - Neoplasms - Sex: Both - Age: 5-14 years (Percent)'],
      row['Prevalence - Neoplasms - Sex: Both - Age: 70+ years (Percent)'],
      row['Prevalence - Neoplasms - Sex: Both - Age: All Ages (Percent)'],
    ]);
  } catch (err) {
    console.error(err);
    console.log({ error: 'Internal Server Error' });
  }
  });
console.log('Table created and data inserted successfully.');
client.release(); // Release the client back to the pool when done