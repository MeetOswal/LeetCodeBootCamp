// MainArea.tsx

import React, { useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
interface MainAreaProps {
  selectedYears: number[];
  selectedCountries: string[];
  selectedSearch: String;
  selectAgeGroup: string[];
}

const MainArea: React.FC<MainAreaProps> = ({
  selectedYears,
  selectedCountries,
  selectedSearch,
  selectAgeGroup,
}) => {
  // You can use the selectedVisual, selectedYears, and selectedCountries
  // to fetch and display the data accordingly.
  const [responseData, setResponseData] = useState<any>(null);
  const [orderBy, setOrderBy] = useState<string>('country')
  const [riskOrderBy, setRiskOrderBy] = useState<string>('type');
  // useEffect(() => {
  //   fetchData();
  // }, [selectedVisual, selectedYears, selectedCountries, selectedSearch, selectAgeGroup]);

  const fetchData = async () => {
    try {
      if (selectedSearch === "Cancer Deaths By Age") {
        const response = await axios.get(
          `http://localhost:3000/cancer-death-age?${selectedCountries
            .map((country) => `countries[]=${country}&`)
            .join("")}${selectedYears
            .map((year) => `years[]=${year}&`)
            .join("")}${selectAgeGroup
            .map((age) => `filters[]=${age}`)
            .join("&")}&orderBy=${orderBy}&ifDesc=DESC`
        );
        console.log(response.data);
        setResponseData(response.data);
      }
      if (selectedSearch === "Cancer Type Risk Rate") {
        const response = await axios.get(
          `http://localhost:3000/cancer-risk-factor?${selectAgeGroup
            .map((age) => `type[]=${age}`)
            .join("&")}&orderBy=${riskOrderBy}&ifDesc=DESC`
        );
        console.log(response.data);
        setResponseData(response.data);
      }
      if (selectedSearch === "Population With Cancer") {
        const response = await axios.get(
          `http://localhost:3000/cancer-population?${selectedCountries
            .map((country) => `country[]=${country}&`)
            .join("")}${selectedYears
            .map((year) => `year[]=${year}`)
            .join("&")}&orderBy=${orderBy}&ifDesc=DESC`
        );
        console.log(response.data);
        setResponseData(response.data);
      }
      if (selectedSearch === "Population With Cancer By Type") {
        const response = await axios.get(
          `http://localhost:3000/cancer-population-type?${selectedCountries
            .map((country) => `countries[]=${country}&`)
            .join("")}${selectedYears
            .map((year) => `years[]=${year}&`)
            .join("")}${selectAgeGroup
            .map((age) => `filters[]=${age}`)
            .join("&")}&orderBy=${orderBy}&ifDesc=DESC`
        );
        console.log(response.data);
        setResponseData(response.data);
      }
      if (selectedSearch === "Population With Cancer By Age") {
        const response = await axios.get(
          `http://localhost:3000/cancer-population-age?${selectedCountries
            .map((country) => `countries[]=${country}&`)
            .join("")}${selectedYears
            .map((year) => `years[]=${year}&`)
            .join("")}${selectAgeGroup
            .map((age) => `filters[]=${age}`)
            .join("&")}&orderBy=${orderBy}&ifDesc=DESC`
        );
        console.log(response.data);
        setResponseData(response.data);
      }
      if (selectedSearch === "Cancer Deaths By Cancer-Type") {
        const response = await axios.get(
          `http://localhost:3000/cancer-death-type?${selectedCountries
            .map((country) => `countries[]=${country}&`)
            .join("")}${selectedYears
            .map((year) => `years[]=${year}&`)
            .join("")}${selectAgeGroup
            .map((age) => `filters[]=${age}`)
            .join("&")}&orderBy=${orderBy}&ifDesc=DESC`
        );
        console.log(response.data);
        setResponseData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleButtonClick = () => {
    fetchData();
  };

  const handleHeaderClick = (columnName: string) => {
    // Update orderBy state based on the selected column name
    if (selectedSearch === "Cancer Deaths By Age") {
      setOrderBy(columnName);
    } else if (selectedSearch === "Cancer Type Risk Rate") {
      setRiskOrderBy(columnName);
    }else if (selectedSearch === "Cancer Deaths By Cancer-Type") {
      setOrderBy(columnName);
    }else if (selectedSearch === "Population With Cancer By Age") {
      setOrderBy(columnName);
    }else if (selectedSearch === "Population With Cancer By Type") {
      setOrderBy(columnName);
    }else if (selectedSearch === "Population With Cancer") {
      setOrderBy(columnName);
    }
    fetchData();
  }
  return (
    <div>
      <div className="p-3">
        <p>Selected Years: {selectedYears.join(", ")} </p>
        <p>Selected Countries: {selectedCountries.join(", ")}</p>
        <p>Selected Search: {selectedSearch}</p>
        <p>Selected Age Group: {selectAgeGroup.join(", ")}</p>
        {/* Render your data visualization or table here */}
        <button className="btn btn-primary" onClick={handleButtonClick}>
          Fetch Data
        </button>
        {responseData && selectedSearch !== "Cancer Type Risk Rate"&& (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th onClick={() => handleHeaderClick('country')}>Country</th>
                <th onClick={() => handleHeaderClick('year')}>Year</th>
                {selectAgeGroup.map((age) => (
                  <th key={age} onClick={() => handleHeaderClick(age)}>{age}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {responseData.map((row: any) => (
                <tr key={row.id}>
                  <td >{row.country}</td>
                  <td >{row.year}</td>
                  {selectAgeGroup.map((age) => (
                    <td key={age} >{row[age]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {responseData && selectedSearch === "Cancer Type Risk Rate"&& (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th onClick={() => handleHeaderClick('type')}>Type</th>
                <th onClick={() => handleHeaderClick('risk')}>Risk</th>
              </tr>
            </thead>
            <tbody>
              {responseData.map((row: any) => (
                <tr key={row.id}>
                  <td>{row.type}</td>
                  <td>{row.risk}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default MainArea;
