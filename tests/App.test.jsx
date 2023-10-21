import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { ThemeProvider } from '../src/context/ThemeContext.jsx';
import { QueryClientProvider, QueryClient } from 'react-query';
import App from '../src/App.jsx';
import { vi } from 'vitest';

const queryClient = new QueryClient();

vi.mock('react-query', async () => {
  const actual = await vi.importActual("react-query");
  return {
    ...actual,
    useQuery: () => (
      {
        data: [{
          "flags": {
            "png": "https://flagcdn.com/w320/rs.png",
            "svg": "https://flagcdn.com/rs.svg",
            "alt": "The flag of Serbia is composed of three equal horizontal bands of red, blue and white. The coat of arms of Serbia is superimposed at the center of the field slightly towards the hoist side."
          },
          "name": {
          "common": "Serbia",
          "official": "Republic of Serbia",
          "nativeName": {
            "srp": {
              "official": "Република Србија",
              "common": "Србија"
            }
          }
        },
        "tld": [
          ".rs",
          ".срб"
        ],
        "cca3": "SRB",
        "currencies": {
          "RSD": {
            "name": "Serbian dinar",
            "symbol": "дин."
          }
        },
        "capital": [
          "Belgrade"
        ],
        "region": "Europe",
        "subregion": "Southeast Europe",
        "languages": {
          "srp": "Serbian"
        },
        "borders": [
          "CMR",
        ],
        "population": 6908224
      },
      {
        "flags": {
          "png": "https://flagcdn.com/w320/cm.png",
          "svg": "https://flagcdn.com/cm.svg",
          "alt": "The flag of Cameroon is composed of three equal vertical bands of green, red and yellow, with a yellow five-pointed star in the center."
        },
        "name": {
          "common": "Cameroon",
          "official": "Republic of Cameroon",
          "nativeName": {
            "eng": {
              "official": "Republic of Cameroon",
              "common": "Cameroon"
            },
            "fra": {
              "official": "République du Cameroun",
              "common": "Cameroun"
            }
          }
        },
        "tld": [
          ".cm"
        ],
        "cca3": "CMR",
        "currencies": {
          "XAF": {
            "name": "Central African CFA franc",
            "symbol": "Fr"
          }
        },
        "capital": [
          "Yaoundé"
        ],
        "region": "Africa",
        "subregion": "Middle Africa",
        "languages": {
          "eng": "English",
          "fra": "French"
        },
        "borders": [
          "SRB", // edited to make the test work
        ],
        "population": 26545864
      },],
      }
    )}
});

beforeEach( async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  );
})

describe('App', () => {

  it('renders the homepage with two countries', () => {
    screen.debug()
    expect(screen.getByText('Republic of Serbia')).toBeInTheDocument();
  });

  it('renders the country details page', async () => {
    
    fireEvent.click(screen.getByText('Republic of Serbia'));
    await screen.findByText('Border Countries:');
    
    screen.debug();
    expect(screen.getByText('Border Countries:')).toBeInTheDocument();
  });
});