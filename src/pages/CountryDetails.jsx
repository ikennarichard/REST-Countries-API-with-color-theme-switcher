import styled from "styled-components"
import { Link } from "react-router-dom"
import BackArrow from '../../public/assets/back-arrow-svgrepo-com.svg'

export default function CountryDetails() {
  const DetailsContainer = styled.div`
    background-color: var(--bg-primary);
    height: 100dvh;
    overflow: hidden;
    display: flex;
  `
  return (
    <DetailsContainer>
      <Link
        to={`/`}
        className='custom-link'
      ><img 
          src={BackArrow} 
          alt="back arrow"
          width={20}
          />Back</Link>
    </DetailsContainer>
  )
}
