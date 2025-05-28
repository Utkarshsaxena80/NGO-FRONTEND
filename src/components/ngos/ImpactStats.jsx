import { motion } from 'framer-motion';

function ImpactStats({ impact }) {
  const formatNumber = (num) => {
    if (typeof num === 'string') return num;
    return new Intl.NumberFormat('en-US').format(num);
  };
  
  const stats = [
    { key: 'projects', label: 'Projects', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { key: 'countries', label: 'Countries', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { key: 'peopleHelped', label: 'People Helped', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { key: 'treesPlanted', label: 'Trees Planted', icon: 'M5 12a5 5 0 0110 0v3.5a3.5 3.5 0 01-8 0m8 0H5m8 0l1.5 2a2 2 0 003 0c.88-1.32 2-3 2-5.5a8 8 0 10-16 0c0 2.5 1.12 4.18 2 5.5a2 2 0 003 0l1.5-2z' },
    { key: 'childrenEducated', label: 'Children Educated', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { key: 'patientsServed', label: 'Patients Served', icon: 'M4.5 12.75l6 6 9-13.5' },
    { key: 'homesBuilt', label: 'Homes Built', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { key: 'mealsProvided', label: 'Meals Provided', icon: 'M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z' },
  ];
  
  // Filter stats to only include those present in the impact object
  const filteredStats = stats.filter(stat => impact[stat.key]);
  
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Impact</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredStats.map((stat, index) => (
          <motion.div 
            key={stat.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center p-4 bg-gray-50 rounded-lg"
          >
            <div className="w-10 h-10 mr-4 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
              </svg>
            </div>
            <div>
              <div className="text-lg font-semibold">{formatNumber(impact[stat.key])}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ImpactStats;