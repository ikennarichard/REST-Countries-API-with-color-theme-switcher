/*eslint-disable*/
import React from 'react'

export default function Country({country}) {
  return (
    <div>
      <img
        src={country.flags.svg}
        alt={`${country.name.official} Flag`}
      />
      <h2>{country.name.official}</h2> 
      <strong>{country.population}</strong> 
      <strong>{country.region}</strong>
      <strong>{country.capital[0]}</strong> 
    </div>
  )
}
