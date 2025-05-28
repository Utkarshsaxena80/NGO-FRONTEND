import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { ethers } from 'ethers';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'NGOs', path: '/ngos' },
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'Impact', path: '/#impact' },
    { name: 'Register NGO', path: '/register' }
  ];

  async function handleConnection() {
    if (!window.ethereum) {
      alert('Please install MetaMask to connect your wallet!');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (accounts.length > 0) {
        const formattedAccount = ethers.getAddress(accounts[0]);
        setAccount(formattedAccount);
        setIsConnected(true);
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      alert('Failed to connect wallet. Please try again.');
    }
  }

  // Check if user is already connected on component mount
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          if (accounts.length > 0) {
            const formattedAccount = ethers.getAddress(accounts[0]);
            setAccount(formattedAccount);
            setIsConnected(true);
          }
        } catch (error) {
          console.error("Error checking connection:", error);
        }
      }
    };

    checkConnection();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const formatAddress = (addr) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const textColorClass = scrolled || location.pathname !== '/' ? 'text-gray-700' : 'text-white';
  const hoverTextColorClass = scrolled || location.pathname !== '/' ? 'hover:text-primary-600' : 'hover:text-white/80';

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className={`text-2xl font-bold font-display ${scrolled || location.pathname !== '/' ? 'text-primary-700' : 'text-white'}`}>
              Chain<span className="text-accent-600">Give</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors ${textColorClass} ${hoverTextColorClass}`}
              >
                {link.name}
              </Link>
            ))}
            
            <button 
              className={`btn ${isConnected ? 'btn-outline' : 'btn-primary'} px-4 py-2 rounded-lg`}
              onClick={handleConnection}
            >
              {isConnected ? formatAddress(account) : 'Connect Wallet'}
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FiX className={`h-6 w-6 ${textColorClass}`} />
            ) : (
              <FiMenu className={`h-6 w-6 ${textColorClass}`} />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className={`md:hidden ${scrolled ? 'bg-white' : 'bg-gray-900'}`}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-medium py-2 ${textColorClass} ${hoverTextColorClass}`}
                >
                  {link.name}
                </Link>
              ))}
              
              <button 
                className={`btn ${isConnected ? 'btn-outline' : 'btn-primary'} mt-2 w-full`}
                onClick={handleConnection}
              >
                {isConnected ? formatAddress(account) : 'Connect Wallet'}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

export default Navbar;