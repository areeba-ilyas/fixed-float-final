"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiGlobe, FiSun, FiMoon, FiChevronDown, FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    const storedMode = localStorage.getItem('darkMode');
    if (storedMode === 'true' || (!storedMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
    }
    
    // Get language from URL or default to English
    const langParam = new URLSearchParams(window.location.search).get('lang');
    if (langParam && ['en', 'es', 'fr', 'de'].includes(langParam)) {
      setCurrentLang(langParam);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'API', href: '/api' },
    { name: 'Support', href: '/support' },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  const textColor = darkMode ? 'text-white' : 'text-black';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';
  const bgColor = darkMode ? 'bg-gray-900' : 'bg-white';

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setLanguageMenuOpen(false);
    
    // Update URL with language parameter
    const url = new URL(window.location.href);
    url.searchParams.set('lang', langCode);
    router.push(url.toString());
  };

  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white dark:bg-gray-900 shadow-md' : 'bg-transparent'}`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-8 h-8 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xl">FF</span>
              </div>
              <span className={`ml-2 font-bold text-xl ${textColor}`}>ff.io</span>
            </Link>
          </div>

          {/* Right Nav and Buttons */}
          <div className="flex items-center space-x-4">
            <nav className="hidden lg:flex space-x-6">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className={`font-medium text-sm transition duration-200 ${textColor} hover:opacity-80`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Language Selector */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className={`flex items-center px-2 py-1.5 text-sm rounded-md border ${borderColor} ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}
              >
                <span className="mr-1 text-xl">{currentLanguage.flag}</span>
                <FiChevronDown className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`} />
              </button>
              
              {languageMenuOpen && (
                <div className={`absolute right-0 mt-1 w-40 rounded-md border shadow-lg z-50 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="py-1">
                    {languages.map((lang) => (
                      <button 
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`flex items-center w-full text-left px-4 py-2 text-sm ${currentLang === lang.code ? 'bg-blue-50 dark:bg-gray-700' : ''} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                      >
                        <span className="mr-3 text-xl">{lang.flag}</span>
                        <span className={textColor}>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle - Desktop */}
            <div className="hidden md:flex items-center">
              <div className="relative inline-block w-10 align-middle select-none">
                <input 
                  type="checkbox"
                  name="themeToggle"
                  id="themeToggle"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  className="sr-only"
                />
                <label 
                  htmlFor="themeToggle"
                  className={`block overflow-hidden h-5 w-10 rounded-full cursor-pointer ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <span 
                    className={`block h-3 w-3 mt-1 rounded-full transform transition-transform duration-200 ease-in-out ${darkMode ? 'bg-white translate-x-6' : 'bg-white translate-x-1'}`}
                  />
                </label>
              </div>
            </div>

            {/* Auth Links */}
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/user/signin" className={`px-3 py-1.5 text-sm font-medium rounded-md ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}>
                Sign in
              </Link>
              <Link
                href="/user/signup"
                className="px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:opacity-90 transition-opacity"
              >
                Sign up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden ${textColor}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden ${bgColor} border-t ${borderColor}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${textColor} hover:bg-gray-100 dark:hover:bg-gray-800`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Language Selector */}
            <div className="px-3 py-2">
              <button 
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-md ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
              >
                <div className="flex items-center">
                  <span className="text-xl mr-3">{currentLanguage.flag}</span>
                  <span className={textColor}>{currentLanguage.name}</span>
                </div>
                <FiChevronDown className={`transform transition-transform ${languageMenuOpen ? 'rotate-180' : ''} ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </button>
              
              {languageMenuOpen && (
                <div className="mt-2 pl-8">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setLanguageMenuOpen(false);
                      }}
                      className={`flex items-center w-full text-left py-2 text-sm ${currentLang === lang.code ? 'text-blue-500 font-medium' : 'text-gray-500 dark:text-gray-400'}`}
                    >
                      <span className="text-xl mr-3">{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Mobile Theme Toggle */}
            <div className="px-3 py-2 flex items-center justify-between">
              <div className="flex items-center">
                <span className={textColor}>Theme</span>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input 
                  type="checkbox" 
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  className="sr-only"
                  id="mobile-theme-toggle"
                />
                <label 
                  htmlFor="mobile-theme-toggle"
                  className={`block overflow-hidden h-5 w-10 rounded-full cursor-pointer ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <span 
                    className={`block h-3 w-3 mt-1 rounded-full transform transition-transform duration-200 ease-in-out ${darkMode ? 'bg-white translate-x-6' : 'bg-white translate-x-1'}`}
                  />
                </label>
              </div>
            </div>
            
            {/* Mobile Auth Links */}
            <Link
              href="/user/signin"
              className={`block px-3 py-3 mt-2 text-center rounded-md ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} font-medium ${textColor}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign in
            </Link>
            <Link
              href="/user/signup"
              className="block px-3 py-3 mt-1 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;