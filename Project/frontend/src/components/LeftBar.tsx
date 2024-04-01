// LeftSideTable.tsx

import React, { useState } from 'react';
import "./SideBarStyle.css"
interface LeftSideTableProps {
  onSelectOption: (selectedOption: string) => void;
  onSelectAgeGroup: (selectedAgeGroups : string[]) => void;
}

const LeftSideTable: React.FC<LeftSideTableProps> = ({ onSelectOption, onSelectAgeGroup }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<string[]>([]);
  const ageGroup = [
    { key: 'zerotofive', value: '0-5' },
    { key: 'fivetoforteen', value: '5-14' },
    { key: 'fifteentofortynine', value: '15-49' },
    { key: 'fiftytosixtynine', value: '50-69' },
    { key: 'Seventy', value: '70+' }
  ];
  const typeGroup = [
    { key: 'liver', value: 'Liver Cancer'},
    { key: 'kidney', value: 'Kidney Cancer'},
    { key: 'larynx', value: 'Larynx Cancer'},
    { key: 'breast', value: 'Breast Cancer'},
    { key: 'thyroid', value: 'Thyroid Cancer'},
    { key: 'bladder', value: 'Bladder Cancer'},
    { key: 'uterine', value: 'Uterine Cancer'},
    { key: 'ovarian', value: 'Ovarian Cancer'},
    { key: 'stomach', value: 'Stomach Cancer'},
    { key: 'prostate', value: 'Prostate Cancer'},
  ]
  const tables = ['Cancer Type Risk Rate','Population With Cancer','Population With Cancer By Type','Population With Cancer By Age', 'Cancer Deaths By Cancer-Type','Cancer Deaths By Age']
  const handleOptionClick = (option: string) => {
    setSelectedAgeGroups([]);
    setSelectedOption(option);
    onSelectOption(option);
  };

  const handleAgeGroupClick = (age: string) => {
    const updatedAgeGroups = selectedAgeGroups.includes(age)
      ? selectedAgeGroups.filter((selectedAge) => selectedAge !== age)
      : [...selectedAgeGroups, age];
    setSelectedAgeGroups(updatedAgeGroups);
  };

  const handleSubmit = () => {
    // Log the selectedYears and selectedCountries arrays
    onSelectAgeGroup(selectedAgeGroups);
  };
  return (
    <div className="bg-light p-3">
      <h5 className="mb-4">Left Side Table</h5>
      <ul className="list-group">
      {tables.map((option) => (
            <li key={option} className={`list-group-item ${
              selectedOption === option ? 'active' : ''
            }`} onClick={() => handleOptionClick(option)}>
              {option}
              </li>
          ))}
      </ul>
      {(selectedOption === 'Population With Cancer By Type' ||
        selectedOption === 'Cancer Deaths By Cancer-Type') && (
        <div className="mt-3 scrollable-list">
          <label className="form-label">Type Groups:</label>
          <div>
            {typeGroup.map(({key, value}) => (
              <div key={key} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={value}
                  id={value}
                  onChange={() => handleAgeGroupClick(key)}
                  checked={selectedAgeGroups.includes(key)}
                />
                <label className="form-check-label" htmlFor={value}>
                  {value}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
      {(selectedOption === 'Population With Cancer By Age' ||
        selectedOption === 'Cancer Deaths By Age') && (
        <div className="mt-3">
          <label className="form-label">Age Groups:</label>
          <div>
            {ageGroup.map(({key, value}) => (
              <div key={key} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={value}
                  id={value}
                  onChange={() => handleAgeGroupClick(key)}
                  checked={selectedAgeGroups.includes(key)}
                />
                <label className="form-check-label" htmlFor={value}>
                  {value}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
      {(selectedOption === 'Population With Cancer') && (
        <div className="mt-3">
          <label className="form-label">Popualtion:</label>
          <div>
              <div key = "rate"  className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value= "Rate"
                  id= "rate"
                  onChange={() => handleAgeGroupClick("rate")}
                  checked={selectedAgeGroups.includes("rate")}
                />
                <label className="form-check-label" htmlFor={"Rate"}>
                  Rate
                </label>
              </div>
          </div>
        </div>
      )}
      {(selectedOption === 'Cancer Type Risk Rate') && (
        <div className="mt-3 scrollable-list">
          <label className="form-label">Type Groups:</label>
          <div>
            {typeGroup.map(({key, value}) => (
              <div key={key} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={value}
                  id={value}
                  onChange={() => handleAgeGroupClick(key)}
                  checked={selectedAgeGroups.includes(key)}
                />
                <label className="form-check-label" htmlFor={value}>
                  {value}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Submit
      </button>
    </div>

    
  );
};

export default LeftSideTable;
