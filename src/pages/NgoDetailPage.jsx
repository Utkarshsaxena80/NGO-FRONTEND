import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DonateButton from '../components/ngos/DonateButton';
import ImpactStats from '../components/ngos/ImpactStats';
import BlockchainBadges from '../components/shared/BlockchainBadges';
import { FaGlobe, FaTwitter, FaInstagram, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { ethers } from 'ethers';
import allNgoData from '../data/ngos';
import {createConfig,ChainId,getQuote} from "@lifi/sdk";


function NgoDetailPage() {

  createConfig({
    integrator:'NGO SERVICES',
  })
  const {ipfsHash} = useParams();
  const navigate = useNavigate();
  const [ngo, setNgo] = useState({
    mainAddress:"",
    isRegistered: false,
  TYPE: "",
  isActive: false,
  preferredChain: "",
  chainId: 0,
  imageOfIPFS: "",
  descriptionOfNGO: "",
  ownerName: "",
  totalMoneyRaised: 0

  });
  const [loading, setLoading] = useState(true);
   const [responseOfIPFSData, setResponseOfIPFSData] = useState({
  name: "",
  website: "",
  description: "",
  mission: "",
  country: "",
  documents: null,
});

let ngoFound ;




console.log(ipfsHash);
  useEffect(() => {
    const fetchNgo = async () => {
      const data=await allNgoData();
      <allNgoData />
       ngoFound=data.find(ngo=>ngo.TYPE===ipfsHash); 
    setNgo(ngoFound);

      try {
        
        const publicGateway = `https://ipfs.io/ipfs/${ngoFound.TYPE}`;
        console.log(publicGateway);
      const    response = await axios.get(publicGateway);
          setResponseOfIPFSData({
          name: response.data.name,
          website:response.data.website,
          description:response.data.description,
          mission:response.data.mission,
          country:response.data.country,
          documents:response.data.documents
         })
         console.log(response.data.name);

        //setNgo(response.data);
        document.title = `${response.data.ownerName || 'NGO'} - ChainGive`;
      } catch (error) {
        console.error("Error fetching NGO:", error);
      } finally {
        setLoading(false);
      }

   //setNgo(ngoFound);
   if(ngoFound){
    console.log("NGO FOUND");
   }
   console.log("from sc",ngoFound);

    };
    
    fetchNgo();
  }, [ipfsHash]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (ngoFound) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">NGO not found</h2>
        <p className="mb-8">The NGO you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Return Home
        </button>
      </div>
    );
  }


  return (

    <div className="bg-gray-50 min-h-screen">
      <div 
        className="h-[40vh] md:h-[50vh] bg-cover bg-center relative"
        style={{ backgroundImage: ipfsHash.documents ? `url(https://ipfs.io/ipfs/${ngo.imageOfIPFS})` : 'none' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
          <div className="container mx-auto px-4 pb-8 md:pb-12">
            <motion.h1 
              className="text-white text-4xl md:text-5xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {responseOfIPFSData.name || 'NGO'}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Back button */}
      <div className="container mx-auto px-4 py-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to NGOs
        </button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white rounded-xl shadow-md p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">About This NGO</h3>
                <p className="text-gray-700 leading-relaxed">
                  {responseOfIPFSData.description|| 'No description available'}
                </p>
              </div>

              {ngo.preferredChain && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Supported Blockchains</h3>
                  <BlockchainBadges blockchains={[ngo.preferredChain]} />
                </div>
              )}

             {/* <ImpactStats impact={ngo.impact} />*/}
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 sticky top-24">
              <h3 className="text-xl font-semibold mb-4">Donation Progress</h3>
              
              {ngo.goalAmount && (
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">
                      {ethers.formatEther(ngo.totalMoneyRaised || '0')} ETH
                    </span>
                    {/* <span className="text-gray-600">
                      of {ethers.formatEther(ngo.goalAmount)} ETH goal
                    </span> */}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <DonateButton ngo={ngo} 
              
              />

              {(responseOfIPFSData.website || ngo.socials) && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-medium mb-4">Connect</h4>
                  <div className="flex flex-col space-y-3">
                    {responseOfIPFSData.website && (
                      <a 
                        href={responseOfIPFSData.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <FaGlobe className="mr-2" /> {responseOfIPFSData.website.replace('https://', '')}
                      </a>
                    )}
                 {/*   {ngo.socials?.twitter && (
                      <a 
                        href={`https://twitter.com/${ngo.socials.twitter.replace('@', '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <FaTwitter className="mr-2" /> {ngo.socials.twitter}
                      </a>
                    )}
                    {ngo.socials?.instagram && (
                      <a 
                        href={`https://instagram.com/${ngo.socials.instagram.replace('@', '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                      <FaInstagram className="mr-2" /> {ngo.socials.instagram}
                      </a>
                    )}*/}
                  </div>
                </div>
              )} 
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default NgoDetailPage;