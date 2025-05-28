import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function CallToAction() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="donate" className="py-20 bg-gradient-to-r from-accent-800 to-accent-600 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-purple-100 mb-10">
            Join our community of givers and start supporting NGOs across the globe using the power of blockchain technology.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="/ngos" className="btn bg-white text-accent-800 hover:bg-gray-100 focus:ring-white">
              Explore NGOs
            </a>
            <a href="#how-it-works" className="btn border-2 border-white text-white bg-transparent hover:bg-white/10 focus:ring-white">
              Learn More
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CallToAction;