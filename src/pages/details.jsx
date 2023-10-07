/* eslint-disable react/prop-types */
import styled from "styled-components"
import { Link, useParams } from "react-router-dom"
import BackArrow from '../assets/back-arrow-svgrepo-com.svg'
import { ThemeContext } from "../context/ThemeContext"
import { useQuery } from "react-query"
import { useContext, useEffect, useState } from "react"
import { nanoid } from "nanoid"

export default function CountryDetails() {
  const { theme } = useContext(ThemeContext);
  const { code } = useParams();
  const [query, setQuery] = useState(code);

  const { data: countries, isLoading, isError, error } = useQuery({
    queryKey: ['countries'],
  });

  
  const item = countries?.filter((country) => country.cca3.toLowerCase() === query.toLowerCase());

  function handleClick(code) {
    setQuery(code)
  }

  const getName = (c) => {
    let item = countries?.filter((element) => element.cca3 === c)
    let [country] = item;
    return country.name.common
  }

  useEffect(() => {
    setQuery(code);
  }, [code, item])

  const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3em;
    padding-top: 1em;
    color: var(--text-primary);
    height: 100dvh;
  `

  const DetailsWrapper = styled.div`
    display: flex;
    gap: 1em;
    flex-direction: column;
    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-around;
      gap: 5em;
    }
  `
  const Details = styled.div`
    display: flex;
    gap: 1em;
    flex-direction: column;
    word-spacing: 2px;

    @media (min-width:768px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  `
  const Flag = styled.img`
    width: 270px;
    height: max(160px, 100%);
  `

  const icon_theme = {
    filter: theme === 'dark-theme' ?  '' :
    'invert(72%) sepia(6%) saturate(3985%) hue-rotate(168deg) brightness(89%) contrast(86%)',
    marginRight: '0.5em',
    marginTop: '-0.2em',
  }

  const wrapper = {
    width: '100%',
    display: 'grid',
    justifyContent: 'center',
    backgroundColor: 'var(--bg-primary)',
  }


  
  return (
    <>
    {isError && error.message}
    {isLoading ? <p>Loading</p> :

    item.map((country) => (
    <div key={nanoid()} style={wrapper}>
      <DetailsContainer >

        <Link
          to={`/`}
          className="back-arrow btn"
          style={{ width: '70px'}}
        ><img 
            src={BackArrow} 
            alt="back arrow"
            width={15}
            style={icon_theme}
            />Back
        </Link>

        <DetailsWrapper>
          <div>
            <Flag 
              src={country.flags.png}
              alt={`${country.name.official} Flag`}
            />
          </div>
          
          <Details>
            <div className="flex-column">
            <h3>{country.name.official}</h3>
            <p className="titles mg-1">
                <strong>Native Name:</strong>
                {Object.values(country.name.nativeName)[0].official}
              </p>
              <p className="titles">
                <strong>Population:</strong>
                {country.population.toLocaleString()}
              </p>
              <p className="titles">
                <strong>Region:</strong>
                {country.region}
              </p>
              <p className="titles">
                <strong>Sub Region:</strong>
                {country.subregion}
              </p>
              <p className="titles">
                <strong>Capital:</strong>
                {country.capital[0]}
              </p>
            </div>

            {/* lower details */}
            <div className="flex-column mg-2">
              <p className="titles">
                <strong>Top Level Domain:</strong>
                {country.tld[0]}
              </p>

              <p className="titles">
                <strong>Currencies:</strong>
                {Object.values(country.currencies)[0].name}
              </p>

              <p className="titles">
                <strong>Languages:</strong>
                {Object.values(country.languages)[0]}
              </p>
            </div>

            <div style={{ marginTop: '0.85em'}}>
                <strong
                  style={{ fontSize: '0.85rem'}}
                >Border Countries:</strong>
               
                {
                  country.borders.length > 0 ?
                  <div className="flex">
                    {country.borders.map((c) => (
                      
                        <button key={nanoid()} className="btn">
                        <Link
                          to={`/country/${c.toLowerCase()}`}
                          onClick={() => handleClick(c)}
                          className="border-country"
                        >
                            {getName(c)}
                          </Link>
                        </button>
                     
                    )).splice(0, 3)
                    }
                    </div> : 
                    <span style={{ fontSize: 'var(--detail-font-size)'}}> No border countries</span>
                }
              </div>
          </Details>
          </DetailsWrapper>
      </DetailsContainer>
    </div>
    ))}
    </>
  )
}
