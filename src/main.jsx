import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from './context/ThemeContext.jsx';
import App from './App.jsx'
import './css/index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async () => {
        const response = await fetch(
          'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,continent,subregion,tld,currencies,languages,borders,cca3'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        return response.json();
      },
    }
  }
});



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
