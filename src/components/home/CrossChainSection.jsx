import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function CrossChainSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const blockchains = [
    { name: "Ethereum", color: "#627EEA" },
    { name: "Polygon", color: "#8247E5" },
    { name: "Solana", color: "#14F195" },
    { name: "Avalanche", color: "#E84142" },
    { name: "Cardano", color: "#0033AD" },
    { name: "Binance Smart Chain", color: "#F3BA2F" },
    { name: "Tezos", color: "#2C7DF7" },
    { name: "Algorand", color: "#000000" },
    { name: "Near", color: "#000000" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="blockchain" className="section-padding bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            Cross-Chain Technology
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-700"
          >
            Our platform connects multiple blockchain networks, allowing you to donate using your preferred cryptocurrency.
            This cross-chain approach removes barriers to global giving and maximizes your impact.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Center hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gray-100 rounded-full border-4 border-primary-500 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="text-primary-600 font-bold">ChainGive</div>
              <div className="text-xs text-gray-500">Cross-Chain Bridge</div>
            </div>
          </div>

          {/* Blockchain nodes */}
          <div className="flex flex-wrap justify-center max-w-4xl mx-auto relative">
            {blockchains.map((blockchain, index) => {
              // Calculate position in a circular layout
              const angleStep = (2 * Math.PI) / blockchains.length;
              const angle = index * angleStep;
              const radius = 220; // Adjust based on your layout
              
              // Convert to Cartesian coordinates
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <motion.div
                  key={blockchain.name}
                  variants={itemVariants}
                  className="absolute"
                  style={{
                    top: `calc(50% + ${y}px)`,
                    left: `calc(50% + ${x}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {/* Line connecting to center */}
                  <div 
                    className="absolute top-1/2 left-1/2 bg-gray-200 h-0.5 origin-left z-0"
                    style={{ 
                      width: radius, 
                      transform: `rotate(${angle + Math.PI}rad)` 
                    }}
                  ></div>
                  
                  {/* Blockchain node */}
                  <div 
                    className="relative w-24 h-24 rounded-full flex items-center justify-center text-white font-medium text-center p-2 text-sm shadow-lg z-10"
                    style={{ backgroundColor: blockchain.color }}
                  >
                    {blockchain.name}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        
        {/* Mobile view (simplified) */}
        <div className="md:hidden mt-20">
          <div className="grid grid-cols-2 gap-4">
            {blockchains.map((blockchain) => (
              <div 
                key={blockchain.name}
                className="p-4 rounded-lg text-white font-medium text-center"
                style={{ backgroundColor: blockchain.color }}
              >
                {blockchain.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CrossChainSection;