import { StrictMode } from 'react';
import Footer from "../components/Footer.js";
import Header from '../components/Header.js';
import Banner from '../components/Banner.js';
import Collections from '../components/Collections.js';

function App() {
  return (
    <>
      <StrictMode>
        <Header />
        <Banner />
        <Collections />
        <Footer />
      </StrictMode>
    </>
  );
}

export default App;
