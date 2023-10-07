/*eslint-disable*/
import React from 'react'
import styled from 'styled-components'

const CountryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 220px;
  height: 330px;
  background-color: var(--elements);
  border-radius: 7px;
  box-shadow: var(--shadow);
`
const CountryName = styled.h2`
  font-size: 0.9rem;
  font-weight: 800;
  width: 100%;
  height: 40%;
 text-overflow: ellipsis;
`
const CountryDetails = styled.div`
  padding-left: 0.8em;
  padding-right: 0.2em;
  padding-bottom: 2em;
  margin-top: 0.5em;
  color: var(--text-primary);
`

export default function Country({country}) {
  return (
    <CountryContainer>
      <div>
        <img
          src={country.flags.png}
          alt={`${country.name.official} Flag`}
          style={{ borderRadius: '7px 7px 0 0' }}
          width={'100%'}
          height={150}
        />
      </div>

      <CountryDetails>
        <CountryName>{country.name.official}</CountryName>
        <div style={{ marginBlockStart: '0.3em'}}>
          <p className='titles'>
            <strong>Population:</strong>
            {country.population.toLocaleString()}
          </p>
          <p className='titles'>
            <strong>Region:</strong>
            {country.region}
          </p>
          <p className='titles'>
            <strong>Capital:</strong>
            {country.capital[0]}
          </p>
        </div>
      </CountryDetails>
    </CountryContainer>
  )
}
