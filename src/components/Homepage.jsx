/* eslint-disable react/prop-types */
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CountryInput from './CountryInput';
import Country from './Country';

export default function Homepage({countries, isLoading, isError, error }) {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('');

  const filteredCountries = countries?.filter((c) => 
    {
      if(query !== '') {
        return c.name.official.toLowerCase().includes(query.toLowerCase())
      }
      if(region !== '') {
        return c.region.toLowerCase().includes(region.toLowerCase())
      }
        return c
    }
  );

  const ListContainer = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    width: 100%;
    margin-top: 2em;
    @media (min-width: 768px) {
      flex-direction: row;
      flex-wrap: wrap;
      row-gap: 2em;
      justify-content: space-around;
      padding-inline: 1em;
    }
  `;

  const List = styled.li`
    list-style: none;
    flex: 1;
    @media (min-width: 768px) {
      /* height: 300px; */
      flex-basis: 50%;
    }
  `

  function handleUpdate(countryQuery) {
    setRegion('')
    setQuery(countryQuery);
  }

  function updateRegion(region) {
    setQuery('')
    setRegion(region);
  }

  return (
    <>
    {
      isLoading ? 
      <div className='loader'>
        <div className="circle one"></div>
        <div className="circle two"></div>
        <div className="circle three"></div>
      </div> 
      :
    <main>
      <CountryInput 
        sendDataToParent={handleUpdate} 
        sendRegionToParent={updateRegion} 
      />
      <div className="countries">
        <ListContainer>
          {filteredCountries?.map((c) => (
            <Link key={nanoid()}
              to={`/country/${c.cca3.toLowerCase()}`}
              className='custom-link'
            >
              <List >
                <Country 
                  country={c}
                />
              </List>
            </Link>
          ))}
        </ListContainer>
        {filteredCountries == '' && <p>No details found</p>}
      </div>
      { isError && <p>{error.message}</p>}
    </main>
    }
    </>
  );
}
