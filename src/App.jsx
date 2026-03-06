import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './layout/Header.jsx';
import Footer from './layout/Footer.jsx';

import Home from './pages'; 
import About from './pages/About.jsx';
import Accessibility from './pages/Accessibility.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Admin from './pages/Admin';

import TheCampfire from './pages/TheCampfire.jsx';
import TheCrew from './pages/TheCrew.jsx';
import CrewMember from './pages/CrewMember.jsx';
import TheCrypt from './pages/TheCrypt.jsx';

import CryptidMixup from './games/cryptid-mixup/CryptidMixup.jsx';
import CryptacToe from './games/cryptac-toe/CryptacToe.jsx';
import DypetsBrikker from './games/dypets-brikker/DypetsBrikker.jsx';


export default function App() {

  return (
    <div id="page" className="content">
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/the-campfire" element={<TheCampfire />} />
          {/*<Route path="/the-campfire/:slug" element={<TheCampfirePost />*/}
          <Route path="/the-crew" element={<TheCrew />} />
          <Route path="/the-crew/:slug" element={<CrewMember />} />
          <Route path="/the-crypt/cryptid-mixup" element={<CryptidMixup />} />
          <Route path="/the-crypt/cryptac-toe" element={<CryptacToe />} />
          <Route path="/the-crypt/dypets-brikker" element={<DypetsBrikker />} />
          <Route path="/the-crypt" element={<TheCrypt />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}