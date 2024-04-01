// App.tsx

import React, { useState } from 'react';
import NavigationBar from './components/NavigationBar';
import SideBar from './components/SideBar';
import MainArea from './components/MainArea';
import LeftSideTable from './components/LeftBar';
import { Container, Row, Col } from 'react-bootstrap';
const App: React.FC = () => {
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedLeftTableOption, setSelectedLeftTableOption] = useState<string>("No Option Selected");
  const [AgeGroup, setAgeGroup] = useState<string[]>([]);

  const handleYearSelect = (selectedYears: number[]) => {
    setSelectedYears(selectedYears);
  };

  const handleCountrySelect = (selectedCountries: string[]) => {
    setSelectedCountries(selectedCountries);
  };

  const handleLeftTableOptionSelect = (selectedOption: string) => {
    setSelectedLeftTableOption(selectedOption);
    // Add any additional logic based on the selected option if needed
  };

  const handelAgeGroup = (selectedOption: string[]) => {
    setAgeGroup(selectedOption);
    // Add any additional logic based on the selected option if needed
  };

  return (
    <Container fluid>
      <Row>
      <NavigationBar/>
      </Row>
      <Row>
        {/* Left Side Table Component */}
        <Col md={3}>
          <LeftSideTable onSelectOption={handleLeftTableOptionSelect} onSelectAgeGroup = {handelAgeGroup}/>
        </Col>
        {/* Main Content Area */}
        <Col md={6}>
          <MainArea
            selectedYears={selectedYears}
            selectedCountries={selectedCountries}
            selectedSearch={selectedLeftTableOption}
            selectAgeGroup = {AgeGroup}
          />
        </Col>
        <Col md = {3}>
          <SideBar onYearSelect={handleYearSelect} onCountrySelect={handleCountrySelect} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;

