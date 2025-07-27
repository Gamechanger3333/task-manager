import React from 'react'

const CustomTheme = () => {
 const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('taskManagerTheme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('taskManagerTheme', isDarkMode ? 'dark' : 'light');
    if (typeof document !== 'undefined') {
      document.body.className = isDarkMode ? 'dark' : '';
    }
  }, [isDarkMode]);

  const themeClasses = {
    bg: isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100',
    cardBg: isDarkMode ? 'bg-gray-800' : 'bg-white',
    text: isDarkMode ? 'text-white' : 'text-gray-800',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    input: isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300',
    taskBg: isDarkMode ? 'bg-gray-700' : 'bg-gray-50',
    headerBg: isDarkMode ? 'bg-gray-800' : 'bg-white',
    completedTask: isDarkMode ? 'bg-green-900 border-green-700' : 'bg-green-50 border-green-200'
  };

  return { isDarkMode, setIsDarkMode, themeClasses };
};



export default CustomTheme