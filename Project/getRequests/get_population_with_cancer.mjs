import express from "express";
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();
const app = express.Router();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT, // default PostgreSQL port
})

app.get("/", async (req, res) => {
    try {
        const { country, year, orderBy , limit, ifDesc} = req.query;
        // const client = await pool.connect();
        var Desc = ''
        if(ifDesc) Desc = ' DESC';
        var Limit = 10
        if(limit){
            Limit = limit
        }
        var orderby = 'country';
        if(orderBy) orderby = orderBy;
        if (!country || !year) {
            // If countries or years are not provided, retrieve the top 10 rows
            const query = `
              SELECT * FROM population_with_cancer
              ORDER BY ${orderby}${Desc} LIMIT ${Limit};
            `;

            const result = await pool.query(query);

            res.json(result.rows).status(200);
        } else {
            const countryArray = Array.isArray(country) ? country : [country];
            const yearArray = Array.isArray(year) ? year : [year];
            const values = [...countryArray, ...yearArray];
  
            const query = `
            SELECT * FROM population_with_cancer
            WHERE country IN (${countryArray.map((_, i) => `$${i + 1}`).join(', ')})
            AND year IN (${yearArray.map((_, i) => `$${i + countryArray.length + 1}`).join(', ')})
            ORDER BY ${orderby}${Desc} LIMIT ${Limit};
            `;
            
            const result = await pool.query(query, values);
            res.json(result.rows).status(200);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default app;