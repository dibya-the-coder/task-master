import { useAppSelector } from '../store/hooks';
import CodeIcon from '@mui/icons-material/Code';
import JavascriptIcon from '@mui/icons-material/Javascript';
import StorageIcon from '@mui/icons-material/Storage';
import BoltIcon from '@mui/icons-material/Bolt';
import PaletteIcon from '@mui/icons-material/Palette';
import WidgetsIcon from '@mui/icons-material/Widgets';
import SpeedIcon from '@mui/icons-material/Speed';
import GitHubIcon from '@mui/icons-material/GitHub';

const technologies = [
  {
    icon: <CodeIcon className="w-8 h-8 text-[#61DAFB]" />,
    name: 'React',
    description: 'Frontend library for building user interfaces'
  },
  {
    icon: <JavascriptIcon className="w-8 h-8 text-[#3178C6]" />,
    name: 'TypeScript',
    description: 'Typed superset of JavaScript for better development'
  },
  {
    icon: <StorageIcon className="w-8 h-8 text-[#764ABC]" />,
    name: 'Redux Toolkit',
    description: 'State management with Redux made simple'
  },
  {
    icon: <BoltIcon className="w-8 h-8 text-[#764ABC]" />,
    name: 'Redux Persist',
    description: 'Persist and rehydrate Redux store'
  },
  {
    icon: <PaletteIcon className="w-8 h-8 text-[#38B2AC]" />,
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework'
  },
  {
    icon: <WidgetsIcon className="w-8 h-8 text-[#0081CB]" />,
    name: 'Material-UI',
    description: 'React UI component library'
  },
  {
    icon: <SpeedIcon className="w-8 h-8 text-[#646CFF]" />,
    name: 'Vite',
    description: 'Next generation frontend tooling'
  }
];

const features = [
  {
    title: 'Task Management',
    description: 'Create, update, and delete tasks with ease. Organize tasks with priorities and categories.'
  },
  {
    title: 'Persistent Storage',
    description: 'Tasks and preferences are saved locally using Redux Persist, ensuring your data remains across sessions.'
  },
  {
    title: 'Dark Mode',
    description: 'Toggle between light and dark themes for comfortable viewing in any environment.'
  },
  {
    title: 'Responsive Design',
    description: 'Fully responsive interface that works seamlessly across desktop, tablet, and mobile devices.'
  }
];

const About = () => {
  const isDarkMode = useAppSelector((state) => state.theme.darkMode);

  return (
    <div className="py-16">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className={`text-4xl font-extrabold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          } sm:text-5xl md:text-6xl`}>
            About TaskMaster
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            A modern task management application built with React and TypeScript
          </p>
        </div>

        {/* Technologies Section */}
        <div className="mt-24">
          <h2 className={`text-3xl font-bold text-center mb-12 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Technologies Used
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700' 
                    : 'bg-white border-gray-200'
                } transition-transform hover:-translate-y-1`}
              >
                <div className="flex items-center space-x-4">
                  {tech.icon}
                  <div>
                    <h3 className={`text-lg font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {tech.name}
                    </h3>
                    <p className="mt-1 text-gray-500">{tech.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <h2 className={`text-3xl font-bold text-center mb-12 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Key Features
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub Link */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/dibya-the-coder/task-master"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg ${
              isDarkMode 
                ? 'bg-slate-800 hover:bg-slate-700 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
            } transition-colors`}
          >
            <GitHubIcon className="w-5 h-5" />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About; 