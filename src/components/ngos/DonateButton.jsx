import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ethers } from 'ethers';
import { Spin, message } from 'antd';
import ABI from '../abi1';
function DonateButton({ ngo }) {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [sending, setSending] = useState(false);
  const TYPE = ngo.TYPE;
    const add="0xE1618DBC504B4bF56A470E46e6607bE9ea8AC779";//change to manual
  let mainContract;
  if(!add){
    console.log("no contract address found ");
    return [];
  }

  const [responseOfIPFSData, setResponseOfIPFSData] = useState({
    name: '',
    website: '',
    description: '',
    mission: '',
    country: '',
    documents: null,
  });

  const handleDonate = () => {
    setShowModal(true);
  };

  async function quote() {
    if (!donationAmount || isNaN(donationAmount) || parseFloat(donationAmount) <= 0) {
      message.error('Enter a valid donation amount');
      return;
    }
    try {
      setSending(true);

      const tx = await signer.sendTransaction({
        to: ngo.mainAddress,
        value: ethers.parseEther(donationAmount),
      });

      await tx.wait(); // wait for confirmation
      message.success('Donation successful!');
      mainContract= new ethers.Contract(add,ABI,signer);
      mainContract.updateMoneyStatusAfterDonation(ngo.mainAddress,ethers.parseEther(donationAmount));
      setShowModal(false); // close modal after tx confirmation
    } catch (err) {
      console.error(err);
      message.error('Transaction failed.');
    } finally {
      setSending(false);
    }
  }

  useEffect(() => {
    const donate = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setProvider(provider);
      setSigner(signer);
    };

    const fetchData = async () => {
      try {
        const publicGateway = `https://ipfs.io/ipfs/${ngo.TYPE}`;
        const response = await axios.get(publicGateway);
        setResponseOfIPFSData({
          name: response.data.name,
          website: response.data.website,
          description: response.data.description,
          mission: response.data.mission,
          country: response.data.country,
          documents: response.data.documents,
        });
      } catch (err) {
        console.error('Error fetching IPFS data:', err);
      }
    };

    fetchData();
    donate();
  }, [ngo]);

  return (
    <>
      <button onClick={handleDonate} className="btn btn-primary w-full">
        Donate Now
      </button>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-6 max-w-md w-full relative"
            >
              {sending && (
                <div className="absolute inset-0 bg-white bg-opacity-70 z-10 flex items-center justify-center">
                  <Spin size="large" tip="Processing transaction..." />
                </div>
              )}

              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">
                  Donate to {responseOfIPFSData.name}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Please switch to the account that holds your funds to proceed
                  with the donation.
                </p>
                <div className="mt-2">
                  <label
                    htmlFor="donationAmount"
                    className="block font-medium text-gray-700 mb-1"
                  >
                    Enter Donation Amount (ETH)
                  </label>
                  <input
                    type="number"
                    id="donationAmount"
                    min="0"
                    step="any"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="e.g., 0.05"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button
                  onClick={quote}
                  disabled={sending}
                  className="btn bg-green-600 text-white hover:bg-green-700 w-full sm:w-auto px-6 py-2 rounded-lg"
                >
                  Donate
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  disabled={sending}
                  className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 w-full sm:w-auto px-6 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default DonateButton;
