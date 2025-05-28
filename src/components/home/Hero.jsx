import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate=useNavigate();
  function handleNgo(){
    setTimeout(()=>{
      navigate('/ngos')
    },750);
  }
  return (
    <div 
      className="min-h-screen bg-cover bg-center relative flex items-center"
      style={{ 
        backgroundImage: "url('https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-xl">
          <motion.h1 
            className="text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Blockchain Powered Donations For Global Impact
          </motion.h1>
          
          <motion.p 
            className="text-gray-200 text-lg md:text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Support NGOs worldwide with secure, transparent cross-chain donations.
            Every transaction is verified, every dollar tracked.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
          <button onClick={handleNgo} className='btn btn-primary'>
            Explore NGOs
          </button>
            <Link to="/#how-it-works" className="btn btn-outline border-white text-white hover:bg-white/10">
              How It Works
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}  
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-white text-sm mb-2">Scroll to explore</span>
          <motion.div 
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
            initial={{ y: 0 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div 
              className="w-1 h-2 bg-white rounded-full mt-2"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Hero;