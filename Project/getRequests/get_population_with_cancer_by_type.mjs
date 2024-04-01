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
        const { countries, years, filters, orderBy, limit , ifDesc} = req.query;
        // const client = await pool.connect();
        var Limit = 10
        if(limit){
            Limit = limit
        }
        var Desc = ''
        if(ifDesc) Desc = ' DESC';

        var orderby = 'country';
        if(orderBy) orderby = orderBy;
        if (!countries || !years) {
            // If countries or years are not provided, retrieve the top 10 rows
            const query = `
              SELECT * FROM share_of_population_with_cancer_by_type
              ORDER BY ${orderby}${Desc}
              LIMIT ${Limit};
            `;

            const result = await pool.query(query);

            res.json(result.rows).status(200);
        } else {
            const countriesArray = Array.isArray(countries) ? countries : [countries];
            const yearsArray = Array.isArray(years) ? years : [years];
            const filtersArray = Array.isArray(filters) ? filters : [filters];
            const values = [...countriesArray, ...yearsArray];
  
            const query = `
                SELECT country, year${filtersArray.map((col, i) => `, ${col}`).join('')} FROM share_of_population_with_cancer_by_type
                WHERE country IN (${countriesArray.map((_, i) => `$${i + 1}`).join(', ')})
                AND year IN (${yearsArray.map((_, i) => `$${i + countriesArray.length + 1}`).join(', ')})
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