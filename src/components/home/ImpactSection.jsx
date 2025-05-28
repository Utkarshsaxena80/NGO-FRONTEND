import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from '../utils/CountUp';
import { useNavigate } from 'react-router-dom';
function ImpactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const navigate=useNavigate();

  const stats = [
    { value: 15, label: "NGOs Supported", suffix: '+' },
    { value: 1250000, label: "Total Donations", prefix: '$', formatter: true },
    { value: 45, label: "Countries Reached", suffix: '+' },
    { value: 5000, label: "Active Donors", suffix: '+' },
  ];

  return (
    <section id="impact" className="section-padding bg-secondary-800 text-white py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            Our Global Impact
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-blue-100 max-w-3xl mx-auto"
          >
            Together with our donors and NGO partners, we're making a real difference.
            Here's the impact we've created so far:
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
              className="bg-secondary-700 rounded-xl p-8 text-center"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                {stat.prefix || ''}
                <CountUp end={stat.value} formatter={stat.formatter} />
                {stat.suffix || ''}
              </div>
              <div className="text-blue-200">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-8">
            Join thousands of donors who are leveraging blockchain technology to make
            transparent, impactful donations across the globe.
          </p>
          <a href="#donate" className="btn btn-primary">
            Make Your Impact
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default ImpactSection;