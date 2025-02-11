import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function SocialLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <a
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-colors duration-200 hover:text-blue-500"
    >
      {children}
    </a>
  )
}

export function Footer() {
  const isDarkMode = useAppSelector((state) => state.theme.darkMode);

  return (
    <footer className={`
      mt-auto py-8 border-t
      ${isDarkMode 
        ? 'bg-slate-800 border-white/10' 
        : 'bg-white border-gray-200'
      }
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Social Links */}
          <div className="flex gap-6 text-xl">
            <SocialLink to="https://github.com/dibya-the-coder">
              <FaGithub />
            </SocialLink>
            <SocialLink to="https://www.linkedin.com/in/dibya-ranjan-rout-8b5b4b1b0/">
              <FaLinkedin />
            </SocialLink>
          </div>

          {/* Logo */}
          <Link 
            to="/" 
            className={`
              text-lg font-bold font-poppins
              bg-gradient-to-r
              ${isDarkMode 
                ? 'from-blue-400 to-indigo-400' 
                : 'from-blue-500 to-indigo-500'
              }
              bg-clip-text text-transparent
            `}
          >
            TaskMaster
          </Link>

          {/* Copyright */}
          <p className={`
            text-sm
            ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
          `}>
            &copy; {new Date().getFullYear()} TaskMaster. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer; 