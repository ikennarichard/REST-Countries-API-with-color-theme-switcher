/* eslint-disable react/prop-types */
import { useState, useRef } from "react"
import styled from "styled-components";
import { nanoid } from "nanoid";

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 1em;
  width: max(200px, 94%);
  margin-left: 0.85em;
  @media (min-width: 768px) {
    width: 100%;
    padding-inline: 1em;
  }
`
const FormContainer = styled.form`
  margin-top: 0.7em;
`
const SearchInput = styled.input`
  padding: 1.2em;
  width: 100%;
  box-shadow: var(--shadow);
  border: none;
  border-radius: 5px;
  outline: none;
  background-color: var(--elements);
  color: var(--text-primary);
  @media (min-width: 768px) {
    width: 35%;
  }
`
const SelectRegionContainer = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: absolute;
  top: 4em;
  @media (min-width: 768px) {
    right: 2em;
    top: 0.7em;
    width: 20%;
  }
`
const SelectRegionHeader = styled.p`
  border-radius: 5px;
  background-color: var(--elements);
  color: var(--text-primary);
  padding: 1em;
  font-size: var(--homepage-font-size);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--shadow);
`
const SelectRegionList = styled.ul`
  list-style: none;
  background-color: var(--bg-primary);
  display: grid;
  gap: 5px;
  padding: 0.65em;
  height: ${props => (props.$clicked ? '150px' : '0')};
  opacity: ${props => (props.$clicked ? '1' : '0')};
  visibility:${props => (props.$clicked ? 'visible' : 'hidden')};
  overflow: hidden;
  transition: all 0.5s linear;
`
const SelectRegion = styled.li`
  font-size: var(--homepage-font-size);
  cursor: pointer;
  transition: all 0.2s linear;
  width: 100%;
  color: var(--text-primary);
  &:hover {
    background-color: var(--text-primary);
    color: var(--elements);
  }
`

export default function CountryInput({ sendDataToParent, sendRegionToParent }) {
  const [countryName, setCountryName] = useState('');
  const regionName = useRef(null);
  const [show, setShow] = useState(false);

  const regions = ['America', 'Africa', 'Asia', 'Europe', 'Oceania'];

  const handleInputChange = (event) => {
    setCountryName(event.target.value);
    sendDataToParent(countryName);
    regionName.current = '';
  };

  function handleClick(event) {
    regionName.current = event.target.innerText;
    sendRegionToParent(regionName.current);
    setShow(prev => !prev)
  }

  return (
    <Container>
      <FormContainer>
        <SearchInput
          type="text"
          value={countryName}
          onChange={(e) => handleInputChange(e)}
          placeholder="Search for a country..."
        >
        </SearchInput>
      </FormContainer>

      <SelectRegionContainer>
        <SelectRegionHeader
          onClick={() => setShow(prev => !prev)}
        >
          { regionName.current ? regionName.current : 'Filter by region'}
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1.5em"
            width="1.5em"
            className={`${show ? 'rotate' : ''}`}
          >
            <path d="M6.293 13.293l1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z" />
          </svg>

        </SelectRegionHeader>

        <SelectRegionList
          $clicked={show}
        >
          {
            regions.map((region) => (
              <SelectRegion 
                key={nanoid()}
                onClick={handleClick}
              >
                {region}
              </SelectRegion>   
            ))
          }
        </SelectRegionList>
      </SelectRegionContainer>
    </Container>
  )
}
