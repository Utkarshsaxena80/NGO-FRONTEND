import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import BlockchainBadges from '../shared/BlockchainBadges';
import axios from 'axios';
import { ethers } from 'ethers';

function NgoCard({ ngo, TYPE }) {
  const [ngoDetails, setNgoDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responseOfIPFSData, setResponseOfIPFSData] = useState({
  name: "",
  website: "",
  description: "",
  mission: "",
  country: "",
  documents: null,
});
  const [error, setError] = useState(null);
  useEffect(() => {



    const fetchNgoDetails = async () => {
      console.log(TYPE)
      try {
        //if (!ngo.imageOfIPFS) return;
         const publicGateway = `https://ipfs.io/ipfs/${ngo.TYPE}`;
         const response = await axios.get(publicGateway);
         console.log(publicGateway);
         //console.log("hi",response);
         setResponseOfIPFSData({
          name: response.data.name,
          website:response.data.website,
          description:response.data.description,
          mission:response.data.mission,
          country:response.data.country,
          documents:response.data.documents
         })
        console.log(responseOfIPFSData.name)
        setNgoDetails(response.data);
      } catch (error) {
        console.error("Error fetching NGO details:", error);
        setError("Failed to load NGO details");
      } finally {
        setLoading(false);
      }
    };

    fetchNgoDetails();
  }, [ngo.TYPE]);
   const documentURL = `https://ipfs.io/ipfs/${responseOfIPFSData.documents}`
   console.log(documentURL);
  if (loading) {
    return (
      <div className="card h-full flex flex-col items-center justify-center p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card h-full flex flex-col items-center justify-center p-6 text-red-500">
        {error}
      </div>
    );
  }

  // Calculate progress percentage if needed
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card h-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
    

    <img className="h-48 w-full object-cover" src={documentURL} alt="NGO document" />

      
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold mb-2">{responseOfIPFSData.name || 'NGO'}</h3>
        <p className="text-gray-600 mb-4 flex-grow">
          {responseOfIPFSData.description||'No description available'}
        </p>
        
        {ngo.preferredChain && (
          <div className="mb-4">
            <BlockchainBadges blockchains={[ngo.preferredChain]} />
          </div>
        )}
        
        <div className="mb-4">
          <div className="flex justify-between mb-1 text-sm">
            <span className="font-medium">
              Money Raised :
              {ngo.totalMoneyRaised || ''} 
            </span>

          </div>
          {ngo.goalAmount && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
          )}
        </div>
        
        <Link 
          to={`/ngo/${ngo.TYPE}`}
          className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-center transition-colors"
        >
          Learn More
        </Link>
      </div>
    </motion.div>
  );
}

export default NgoCard;