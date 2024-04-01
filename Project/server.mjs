import express from "express";
import cors from "cors";
import get_cancer_death_by_age from "./getRequests/get_cancer_death_by_age.mjs";
import get_cancer_death_by_type from "./getRequests/get_cancer_death_by_type.mjs";
import get_cancer_death_risk from "./getRequests/get_risk_factor.mjs"
import get_population_with_cancer from "./getRequests/get_population_with_cancer.mjs";
import get_population_with_cancer_by_age from "./getRequests/get_population_with_cancer_by_age.mjs";
import get_population_with_cancer_by_type from "./getRequests/get_population_with_cancer_by_type.mjs";
const app = express();
const PORT = 3000;
const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],//included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
app.use("/cancer-death-age", get_cancer_death_by_age);
app.use("/cancer-death-type", get_cancer_death_by_type);
app.use("/cancer-risk-factor", get_cancer_death_risk);
app.use("/cancer-population", get_population_with_cancer);
app.use("/cancer-population-age", get_population_with_cancer_by_age);
app.use("/cancer-population-type", get_population_with_cancer_by_type);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});