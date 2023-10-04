/*eslint-disable*/
import React from 'react'
import styled from 'styled-components'

const CountryContainer = styled.div`
  display: grid;
  gap: 5px;
  width: 250px;
  background-color: #fffcfc;
  border-radius: 7px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`
const CountryName = styled.h2`
  font-size: 0.9rem;
  font-weight: 800;
`
const CountryDetails = styled.div`
  padding-left: 1em;
  padding-bottom: 2em;
  margin-top: 0.5em;
`
const titles = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  fontSize: 'var(--homepage-font-size)',
  fontWeight: '400',
}

export default function Country({country}) {
  return (
    <CountryContainer>
      <div>
        <img
          src={country.flags.svg}
          alt={`${country.name.official} Flag`}
          style={{ borderRadius: '7px 7px 0 0' }}
          width= '250'
        />
      </div>

      <CountryDetails>
        <CountryName>{country.name.official}</CountryName>
        <div style={{ marginBlockStart: '0.8em'}}>
          <p style={titles}>
            <strong>Population:</strong>
            {country.population.toLocaleString()}
          </p>
          <p style={titles}>
            <strong>Region:</strong>
            {country.region}
          </p>
          <p style={titles}>
            <strong>Capital:</strong>
            {country.capital[0]}
          </p>
        </div>
      </CountryDetails>
    </CountryContainer>
  )
}
