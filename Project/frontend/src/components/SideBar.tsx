// SideBar.tsx

import React, { useState } from 'react';
import "./SideBarStyle.css";
interface SideBarProps {
  onYearSelect: (selectedYears: number[]) => void;
  onCountrySelect: (selectedCountries: string[]) => void;
}

const SideBar: React.FC<SideBarProps> = ({ onYearSelect, onCountrySelect }) => {
  // Define the list of years and countries
  const years = ["1991", "1992", "1993","1994", "1995", "1996","1997", "1998", "1999", "2000", "2017", "2018", "2019"]; // Add more years as needed
  const countries = ['China', 'India', 'Afghanistan', 'Albania', 'Bosnia', 'Brunei', 'Cameroon', 'Chile','Cuba', 'Egypt', 'England', 'France', 'Germany', ]; // Add more countries as needed

  // State to track selected years and countries
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  // Handler for year selection change
  const handleYearClick = (clickedyear: string) => {
    // Check if the clicked year is already selected
    let clickedYear = parseInt(clickedyear)
    const isSelected = selectedYears.includes(clickedYear);

    // Toggle the selection based on the current state
    if (isSelected) {
      // If selected, remove the year from the selected list
      const updatedSelectedYears = selectedYears.filter((year) => year !== clickedYear);
      setSelectedYears(updatedSelectedYears);
    } else {
      // If not selected, add the year to the selected list
      const updatedSelectedYears = [...selectedYears, clickedYear];
      setSelectedYears(updatedSelectedYears);
    }

    // Call the onCountrySelect callback with the updated selected countries
  };

  // Handler for country checkbox click
  const handleCountryClick = (clickedCountry: string) => {
    // Check if the clicked country is already selected
    const isSelected = selectedCountries.includes(clickedCountry);
    // Toggle the selection based on the current state
    if (isSelected) {
      // If selected, remove the country from the selected list
      const updatedSelectedCountries = selectedCountries.filter((country) => country !== clickedCountry);
      setSelectedCountries(updatedSelectedCountries);
    } else {
      // If not selected, add the country to the selected list
      const updatedSelectedCountries = [...selectedCountries, clickedCountry];
      setSelectedCountries(updatedSelectedCountries);
    }
    // Call the onCountrySelect callback with the updated selected countries
    
  };

  const handleSubmit = () => {
    // Log the selectedYears and selectedCountries arrays
    onCountrySelect(selectedCountries);
    onYearSelect(selectedYears);
  };


  return (
    <div className="bg-light p-3">
      <h5 className="mb-4">Sidebar</h5>
      <div className="mb-3">
        <label className="form-label">Year:</label>
        <div className="scrollable-list">
          {/* Checkboxes for selecting countries */}
          {years.map((year) => (
            <div key={year} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={year}
                id={year}
                onChange={() => handleYearClick(year)}
                checked={selectedYears.includes(parseInt(year))}
                
              />
              <label className="form-check-label" htmlFor={year}>
                {year}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="form-label">Country:</label>
        <div className="scrollable-list"> 
          {countries.map((country) => (
            <div key={country} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={country}
                id={country}
                onChange={() => handleCountryClick(country)}
                checked={selectedCountries.includes(country)}
              />
              <label className="form-check-label" htmlFor={country}>
                {country}
              </label>
            </div>
          ))}
        </div>
      </div>
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default SideBar;
