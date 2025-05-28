import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import allNgoData from '../../data/ngos';

import NgoCard from './NgoCard';

function NgoList() {
  const [ngo,setngo]=useState([])
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [visibleNgos, setVisibleNgos] = useState([]);
  
  useEffect(() => {
  const fetchData = async () => {
    const data = await allNgoData();
    setngo(data);

    if (inView) {
      const loadedNgos = [];
      for (let i = 0; i < data.length; i++) {
        loadedNgos.push(data[i]);
        setVisibleNgos([...loadedNgos]); 
        console.log("hel",loadedNgos)

        if (i< data.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 200)); 
        }
      }
    }
  };

  fetchData();
}, [inView]);

  return (
    <section id="ngos" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            NGOs Making an Impact
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-700 max-w-3xl mx-auto"
          >
            Explore our verified NGOs working on various causes across the globe.
            Each one has been thoroughly vetted to ensure your donations create real impact.
          </motion.p>
        </div>
        
        <div 
          ref={ref} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {visibleNgos.map((ngo, index) => (
            <NgoCard key={ngo.mainAddress} ngo={ngo} TYPE={ngo.TYPE} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default NgoList;