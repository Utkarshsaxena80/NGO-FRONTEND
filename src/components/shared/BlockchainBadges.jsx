import { motion } from 'framer-motion';

function BlockchainBadges({ blockchains }) {
  // Blockchain colors
  const colors = {
    'Ethereum': '#627EEA',
    'Polygon': '#8247E5',
    'Solana': '#14F195',
    'Avalanche': '#E84142',
    'Cardano': '#0033AD',
    'Binance Smart Chain': '#F3BA2F',
    'Tezos': '#2C7DF7',
    'Algorand': '#000000',
    'Near': '#000000',
  };

  return (
    <div className="flex flex-wrap gap-2">
      {blockchains.map((blockchain, index) => (
        <motion.span
          key={blockchain}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="px-3 py-1 rounded-full text-white text-sm font-medium"
          style={{ backgroundColor: colors[blockchain] || '#6b7280' }}
        >
          {blockchain}
        </motion.span>
      ))}
    </div>
  );
}

export default BlockchainBadges;