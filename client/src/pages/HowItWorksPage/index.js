import React, { useState } from 'react';
import Header from '../../components/HowItWorks/Header';
import NavMenu from '../../components/HowItWorks/NavMenu';
import HowSquadhelpWork from '../../components/HowItWorks/HowSquadhelpWork';
import WaysToUseSquadhelp from '../../components/HowItWorks/WaysToUseSquadhelp';
import HowContestsWork from '../../components/HowItWorks/HowContestsWork';
import AboutContests from '../../components/HowItWorks/AboutContests';
import ReadyToGetStarted from '../../components/HowItWorks/ReadyToGetStarted';
import Stats from '../../components/HowItWorks/Stats';
import Pricing from '../../components/HowItWorks/Pricing';
import FeaturedIn from '../../components/HowItWorks/FeaturedIn';
import Footer from '../../components/HowItWorks/Footer';

const HowItWorksPage = () => {
  const [isOpen, setIsOpen] = useState(false || window.innerWidth > 768);
  return (
    <>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <NavMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <main>
        <HowSquadhelpWork />
        <WaysToUseSquadhelp />
        <HowContestsWork />
        <AboutContests />
        <ReadyToGetStarted />
        <Stats />
        <Pricing />
        <FeaturedIn />
      </main>
      <Footer />
    </>
  );
};

export default HowItWorksPage;
