import { Link } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    platform: [
      { name: 'How It Works', path: '/#how-it-works' },
      { name: 'NGOs', path: '/#ngos' },
      { name: 'Impact', path: '/#impact' },
      { name: 'Blockchain Technology', path: '/#blockchain' }
    ],
    company: [
      { name: 'About Us', path: '/#about' },
      { name: 'Team', path: '/#team' },
      { name: 'Careers', path: '/#careers' },
      { name: 'Press', path: '/#press' }
    ],
    resources: [
      { name: 'FAQ', path: '/#faq' },
      { name: 'Documentation', path: '/#docs' },
      { name: 'Privacy Policy', path: '/#privacy' },
      { name: 'Terms of Service', path: '/#terms' }
    ]
  };
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="text-3xl font-bold font-display">
                Chain<span className="text-accent-500">Give</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering charitable giving through cross-chain blockchain technology. 
              Make secure, transparent donations to NGOs worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="https://x.com/MetroRiser" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/utkarsh-saxena-900b83293/" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/Utkarshsaxena80" className="text-gray-400 hover:text-white transition-colors">
                <FaGithub className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} ChainGive. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-500 text-sm">
                Designed with ❤️ 
                <span>
                  <a href="https://github.com/Utkarshsaxena80" className=' hover:underline'> by this guy</a>
                  </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;