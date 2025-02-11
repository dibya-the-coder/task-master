import {
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleTheme } from '../store/themeSlice';
import { Link, useLocation } from 'react-router-dom';

const pages = [
  { title: 'Home', path: '/' },
  { title: 'Todo List', path: '/todos' },
  { title: 'Add Todo', path: '/add-todo' },
  { title: 'About', path: '/about' }
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.theme.darkMode);
  const location = useLocation();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <nav className={`
      sticky top-0 z-50 backdrop-blur-md
      ${isDarkMode 
        ? 'bg-slate-900/95 border-slate-700/10' 
        : 'bg-white/95 border-slate-200/20'
      }
      border-b
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo for larger screens */}
          <Link 
            to="/"
            className="hidden md:flex items-center space-x-2"
          >
            <CheckCircleOutlineIcon 
              className={`text-3xl ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}
            />
            <span className={`
              text-xl font-extrabold font-poppins tracking-tight
              bg-gradient-to-r
              ${isDarkMode 
                ? 'from-blue-400 to-indigo-400' 
                : 'from-blue-500 to-indigo-500'
              }
              bg-clip-text text-transparent
            `}>
              TaskMaster
            </span>
          </Link>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <IconButton
              onClick={handleOpenNavMenu}
              className={isDarkMode ? 'text-white' : 'text-slate-700'}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              className="block md:hidden"
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page.path} 
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page.path}
                  selected={location.pathname === page.path}
                  className="font-poppins font-medium"
                >
                  {page.title}
                </MenuItem>
              ))}
            </Menu>
          </div>

          {/* Logo for mobile */}
          <Link 
            to="/"
            className="flex md:hidden items-center flex-grow"
          >
            <CheckCircleOutlineIcon 
              className={`text-2xl mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}
            />
            <span className={`
              text-xl font-extrabold font-poppins tracking-tight
              bg-gradient-to-r
              ${isDarkMode 
                ? 'from-blue-400 to-indigo-400' 
                : 'from-blue-500 to-indigo-500'
              }
              bg-clip-text text-transparent
            `}>
              TaskMaster
            </span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-1">
            {pages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className={`
                  px-4 py-2 rounded-lg font-poppins font-medium text-sm
                  transition-colors duration-200
                  ${location.pathname === page.path
                    ? isDarkMode
                      ? 'bg-white/5 text-white'
                      : 'bg-slate-900/10 text-slate-900'
                    : isDarkMode
                      ? 'text-slate-300 hover:bg-white/10'
                      : 'text-slate-700 hover:bg-slate-900/5'
                  }
                `}
              >
                {page.title}
              </Link>
            ))}
          </div>

          {/* Theme toggle */}
          <div className="flex items-center pl-2">
            <button
              onClick={() => dispatch(toggleTheme())}
              className={`
                p-2 rounded-lg
                ${isDarkMode
                  ? 'bg-white/5 hover:bg-white/10 text-white'
                  : 'bg-slate-900/5 hover:bg-slate-900/10 text-slate-700'
                }
                transition-colors duration-200
              `}
            >
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 