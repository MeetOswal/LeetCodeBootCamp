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

const tableName = 'share_of_population_with_cancer_by_type';

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

const filePath = "C:/Users/oswme/Documents/Masters/BootCamp/Project/data/share-of-population-with-cancer-types.csv";
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
      row['Prevalence - Liver cancer - Sex: Both - Age: Age-standardized (Percent)'],
      row['Prevalence - Kidney cancer - Sex: Both - Age: Age-standardized (Percent)'],
      row['Prevalence - Larynx cancer - Sex: Both - Age: Age-standardized (Percent)'],
      row['Prevalence - Breast cancer - Sex: Both - Age: Age-standardized (Percent)'],
      row['Prevalence - Thyroid cancer - Sex: Both - Age: Age-standardized (Percent)'],
      row['Prevalence - Bladder cancer - Sex: Both - Age: Age-standardized (Percent)'],
      row['Prevalence - Uterine cancer - Sex: Both - Age: Age-standardized (Percent)'],
      row['Prevalence - Ovarian cancer - Sex: Both - Age: Age-standardized (Percent)'],
      row['Prevalence - Stomach cancer - Sex: Both - Age: Age-standardized (Percent)'],
      row['Prevalence - Prostate cancer - Sex: Both - Age: Age-standardized (Percent)'],
      row['Prevalence - Cervical cancer - Sex: Both - Age: Age-standardized (Percent)'],
      row['Prevalence - Testicular cancer - Sex: Both - Age: Age-standardized (Percent)'],
      row['Prevalence - Pancreatic cancer - Sex: Both - Age: Age-standardized (Percent)'],
      row['Prevalence - Esophageal cancer - Sex: Both - Age: Age-standardized (Percent)'],
      row['Prevalence - Nasopharynx cancer - Sex: Both - Age: Age-standardized (Percent)'],
      row['Prevalence - Colon and rectum cancer - Sex: Both - Age: Age-standardized (Percent)'],
      row['Prevalence - Non-melanoma skin cancer - Sex: Both - Age: Age-standardized (Percent)'],
      row['Prevalence - Lip and oral cavity cancer - Sex: Both - Age: Age-standardized (Percent)'],
      row['Prevalence - Brain and nervous system cancer - Sex: Both - Age: Age-standardized (Percent)'],
      row['Prevalence - Tracheal, bronchus, and lung cancer - Sex: Both - Age: Age-standardized (Percent)'],
      row['Prevalence - Gallbladder and biliary tract cancer - Sex: Both - Age: Age-standardized (Percent)'],
    ]);
  } catch (err) {
    console.error(err);
    console.log({ error: 'Internal Server Error' });
  }
  });
console.log('Table created and data inserted successfully.');
client.release(); // Release the client back to the pool when done