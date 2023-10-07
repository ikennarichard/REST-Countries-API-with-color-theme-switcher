import Homepage from "./components/Homepage";
import { useQuery } from 'react-query';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CountryDetails from "./pages/details";
import Layout from "./layout/Layout";

function App() {
  const { data: countries, isLoading, isError, error } = useQuery({
    queryKey: ['countries'],
  });
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout data={countries} />}>
          <Route index element={
          <Homepage
            isError={isError}
            isLoading={isLoading}
            countries={countries}
            error={error}
          />} />
          <Route path="/country/:code" element={
          <CountryDetails/>}/>
        </Route>
      </Routes>
    </Router> 
  )
}

export default App
