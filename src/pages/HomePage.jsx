import { useEffect } from 'react';
import Hero from '../components/home/Hero';
import AboutSection from '../components/home/AboutSection';
import NgoList from '../components/ngos/NgoList';
import HowItWorks from '../components/home/HowItWorks';
import CrossChainSection from '../components/home/CrossChainSection';
import ImpactSection from '../components/home/ImpactSection';
import CallToAction from '../components/shared/CallToAction';

function HomePage() {
  useEffect(() => {
    document.title = 'ChainGive - Cross-Chain NGO Donations';
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); 
    
    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);
  
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <AboutSection />
      <HowItWorks />
      <NgoList />
      <CrossChainSection />
      <ImpactSection />
      <CallToAction />
    </div>
  );
}

export default HomePage;