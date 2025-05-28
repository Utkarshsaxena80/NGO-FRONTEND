import { motion } from 'framer-motion';
import allNgoData from '../data/ngos';
import NgoCard from '../components/ngos/NgoCard';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

function Ngo() {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await allNgoData();
        <allNgoData />
        
        if (inView) {
         
          for (let i = 0; i < data.length; i++) {
            setNgos(prev => [...prev, data[i]]);
            await new Promise(resolve => setTimeout(resolve, 200));
            console.log(data);
          }
        } else {
          setNgos(data);
        }
      } catch (err) {
        console.error("Failed to fetch NGOs:", err);
        setError("Failed to load NGO data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [inView]);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg">Loading NGOs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-xl">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">NGO Directory</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our verified NGOs making real impact across the globe.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ngos.length > 0 ? (
            ngos.map((ngo,index) => (
              <NgoCard key= {ngo.TYPE } ngo={ngo} TYPE={ngo.TYPE} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-500">No NGOs found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Ngo;