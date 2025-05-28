import { useState,useEffect} from 'react';
import { motion } from 'framer-motion';
import {Checkmark} from 'react-checkmark';
import { useNavigate } from 'react-router-dom';
import {Spin} from 'antd';
import axios from 'axios';

import {ethers,BrowserProvider} from 'ethers';

import ABI from './abi1';


const add="0xE1618DBC504B4bF56A470E46e6607bE9ea8AC779"
function Register() {
//more to ask------ chainId,rename documents as images , also ask for owner name 
  const[success,setSuccess]=useState(false);
  const navigate= useNavigate();
  const [provider,setProvider]=useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    website: [],
    description: '',
    mission: '',
    blockchains: [],
    chainId:'',
    country: '',
    documents: null
  });

  useEffect(()=>{
    if(success){
      const timeout=setTimeout(()=>{
        navigate('/');
      },2500);
      return ()=>clearTimeout(timeout);
    }
  },[success,navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit=async (e)=>{
    // api call to backend here for registring the ngos
    //all other things like impact mission etc will be uploaded on IPFS 
    //post call to backend here 
     let  IPFSHash;
     e.preventDefault();
    // Form submission logic to be implemented
    console.log("handleSubmit called"); 
    console.log('Form submitted:', formData);

     const provider= new BrowserProvider(window.ethereum);
              setProvider(provider);
           
                const signer= await provider.getSigner();
             if(!add){
                console.log('no address found');
             }
     const  mainContract= new ethers.Contract(add,ABI,signer);
             // setContract(mainContract);
    try{
      const response=await axios.post('https://ngo-backend-production.up.railway.app/registerUser',formData,{
        headers:{
          'Content-Type':'application/json',
        },
        withCredentials:true
      });
     IPFSHash=response.data.ipfsHash;
      console.log(IPFSHash);
    }catch(error){
      console.log(error);
    }
   const regsitering=await mainContract.register( 
    formData.address,
    IPFSHash,
    true,
    formData.blockchains[0],
    formData.chainId,
     "",
     "",
     ""
   );
   await regsitering.wait();
      setSuccess(true);
  };


  const blockchainOptions = [
    'Ethereum', 'Polygon', 'Solana', 'Avalanche', 'Cardano',
    'Binance Smart Chain', 'Tezos', 'Algorand', 'Near'
  ];

  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Register Your NGO</h1>
            <p className="text-lg text-gray-600">
              Join our platform to receive cross-chain donations and expand your impact globally.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address on Blockchain
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                  maxLength={150}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Brief description of your organization (max 150 characters)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mission & Impact
                </label>
                <textarea
                  name="mission"
                  value={formData.mission}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supported Blockchains
                </label>
                <select
                  name="blockchains"
                  multiple
                  value={formData.blockchains}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    blockchains:Array.from(e.target.selectedOptions, option => option.value)
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  {blockchainOptions.map(blockchain => (
                    <option key={blockchain} value={blockchain}>
                      {blockchain}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  Select Any One Supported Blockchain 
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chain Id 
                </label>
                <input
                  type="text"
                  name="chainId"
                  value={formData.chainId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
                
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country of Operation
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                 Upload an Image of your NGO
                </label>
                <input
                  type="file"
                  name="documents"
                 
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    documents: e.target.files[0]
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  accept=".pdf,.doc,.docx,.jpg"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  Upload registration certificates or relevant documentation (PDF, DOC, DOCX,JPG  )
                </p>
              </div>

              <div className="pt-4"> 
             <button onClick={handleSubmit}
                  type="submit"
                  className="w-full btn btn-primary"
                >
                  Submit Registration
                </button>

               
              </div>
            </form>
          </div>
          {success && <div>
            <Checkmark /><Spin 
              tip="Redirecting you to main page"
              fullscreen={true} />
            
            </div>
            }
            
        </motion.div>
      </div>

      <div>

      </div>
    </div>

    
  );
}

export default Register;