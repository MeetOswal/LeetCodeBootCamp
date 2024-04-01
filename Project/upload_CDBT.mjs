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

const tableName = 'cancer_death_by_type';

const createTableQuery = `
CREATE TABLE ${tableName} (
  id SERIAL,
  Country VARCHAR(255),
  Year INTEGER,
  "liver" DOUBLE PRECISION,
  "kidney" DOUBLE PRECISION,
  "larynx" DOUBLE PRECISION,
  "breast" DOUBLE PRECISION,
  "thyroid" DOUBLE PRECISION,
  "bladder" DOUBLE PRECISION,
  "uterine" DOUBLE PRECISION,
  "ovarian" DOUBLE PRECISION,
  "stomach" DOUBLE PRECISION,
  "prostate" DOUBLE PRECISION,
  "cervical" DOUBLE PRECISION,
  "testicular" DOUBLE PRECISION,
  "pancreatic" DOUBLE PRECISION,
  "esophageal" DOUBLE PRECISION,
  "nasopharynx" DOUBLE PRECISION,
  "colonandrectum" DOUBLE PRECISION,
  "nonmelanomaskin" DOUBLE PRECISION,
  "oralcavity" DOUBLE PRECISION,
  "brain" DOUBLE PRECISION,
  "lung" DOUBLE PRECISION,
  "gallbladder" DOUBLE PRECISION
);
`;

const insertDataQuery = `
INSERT INTO ${tableName} (
  country,
  year,
  "liver",
  "kidney",
  "larynx",
  "breast",
  "thyroid",
  "bladder",
  "uterine",
  "ovarian",
  "stomach",
  "prostate",
  "cervical",
  "testicular",
  "pancreatic",
  "esophageal",
  "nasopharynx",
  "colonandrectum",
  "nonmelanomaskin",
  "oralcavity",
  "brain",
  "lung",
  "gallbladder") 
  VALUES (
  $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23
);
`;

const filePath = "C:/Users/oswme/Documents/Masters/BootCamp/Project/data/cancer-deaths-by-type.csv";
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
      row['Deaths - Liver cancer - Sex: Both - Age: All Ages (Number)'],
      row['Deaths - Kidney cancer - Sex: Both - Age: All Ages (Number)'],
      row['Deaths - Larynx cancer - Sex: Both - Age: All Ages (Number)'],
      row['Deaths - Breast cancer - Sex: Both - Age: All Ages (Number)'],
      row['Deaths - Thyroid cancer - Sex: Both - Age: All Ages (Number)'],
      row['Deaths - Gallbladder and biliary tract cancer - Sex: Both - Age: All Ages (Number)'],
      row['Deaths - Uterine cancer - Sex: Both - Age: All Ages (Number)'],
      row['Deaths - Ovarian cancer - Sex: Both - Age: All Ages (Number)'],
      row['Deaths - Stomach cancer - Sex: Both - Age: All Ages (Number)'],
      row['Deaths - Prostate cancer - Sex: Both - Age: All Ages (Number)'],
      row['Deaths - Cervical cancer - Sex: Both - Age: All Ages (Number)'],
      row['Deaths - Testicular cancer - Sex: Both - Age: All Ages (Number)'],
      row['Deaths - Pancreatic cancer - Sex: Both - Age: All Ages (Number)'],
      row['Deaths - Esophageal cancer - Sex: Both - Age: All Ages (Number)'],
      row['Deaths - Nasopharynx cancer - Sex: Both - Age: All Ages (Number)'],
      row['Deaths - Colon and rectum cancer - Sex: Both - Age: All Ages (Number)'],
      row['Deaths - Non-melanoma skin cancer - Sex: Both - Age: All Ages (Number)'],
      row['Deaths - Lip and oral cavity cancer - Sex: Both - Age: All Ages (Number)'],
      row['Deaths - Brain and central nervous system cancer - Sex: Both - Age: All Ages (Number)'],
      row['Deaths - Tracheal, bronchus, and lung cancer - Sex: Both - Age: All Ages (Number)'],
      row['Deaths - Gallbladder and biliary tract cancer - Sex: Both - Age: All Ages (Number)'],
    ]);
  } catch (err) {
    console.error(err);
    console.log({ error: 'Internal Server Error' });
  }
  });
console.log('Table created and data inserted successfully.');
client.release(); // Release the client back to the pool when done