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
        const { type, orderBy , ifDesc} = req.query;
        // const client = await pool.connect();
        var Desc = ''
        if(ifDesc) Desc = ' DESC';

        var orderby = 'type';
        if(orderBy) orderby = orderBy;
        if (!type) {
            // If countries or years are not provided, retrieve the top 10 rows
            const query = `
              SELECT * FROM cancer_death_risk
              ORDER BY ${orderby}${Desc};
            `;

            const result = await pool.query(query);

            res.json(result.rows).status(200);
        } else {
            const typeArray = Array.isArray(type) ? type : [type];
            const values = [...typeArray];
  
            const query = `
                SELECT * FROM cancer_death_risk
                WHERE type IN (${typeArray.map((_, i) => `$${i + 1}`).join(', ')})
                ORDER BY ${orderby}${Desc};
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