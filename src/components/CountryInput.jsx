import { useState } from "react"
import styled from "styled-components";

const Container = styled.form`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 1em;
  width: 100%;
`
const FormContainer = styled.form`
  width: 90%;
  margin-top: 0.7em;
`
const SearchInput = styled.input`
  padding: 1.2em;
  width: 100%;
  box-shadow: var(--box-shadow-light);
  border: none;
  border-radius: 5px;
`
const SelectRegionContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: absolute;
  top: 4em;
`
const SelectRegionHeader = styled.p`
  border-radius: 5px;
  background-color: white;
  padding: 1em;
  font-size: var(--homepage-font-size);
  cursor: pointer;
`
const SelectRegionList = styled.ul`
  list-style: none;
  background-color: white;
  display: grid;
  gap: 5px;
  padding: 0.65em;
  border: 1px solid black;
  height: 150px;
  overflow: hidden;
`
const SelectRegion = styled.li`
  font-size: var(--homepage-font-size);
  cursor: pointer;
  transition: all 0.2s linear;
  width: 100%;
  &:hover {
    background-color: var(--dark-blue-dark-elements);
    color: white;
  }
`

export default function CountryInput({ sendDataToParent }) {
  const [countryName, setCountryName] = useState('');
  const [region, setRegion] = useState('');

  const regions = ['America', 'Africa', 'Asia', 'Europe', 'Oceania'];

  const handleInputChange = (event) => {
    setCountryName(event.target.value);
    sendDataToParent(countryName);
  };

  return (
    <Container>
      <FormContainer>
        <SearchInput
          type="text"
          value={countryName}
          onChange={(e) => handleInputChange(e)}
          placeholder="Search for a country"
        >
        </SearchInput>
      </FormContainer>

      <SelectRegionContainer>
        <SelectRegionHeader>
          Find country by region <span className="vicon">v</span>
        </SelectRegionHeader>

        <SelectRegionList>
          {
            regions.map((region, index) => (
              <SelectRegion key={index}>
                {region}
              </SelectRegion>   
            ))
          }
        </SelectRegionList>
      </SelectRegionContainer>
    </Container>
  )
}
