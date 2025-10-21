import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, ChevronDown, Globe } from 'lucide-react';
import { Button } from './ui/button';

const ImageUpload = ({ onImageUpload, isLoading, language = 'english', onLanguageChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      
      <LanguageSelector 
        language={language} 
        onLanguageChange={onLanguageChange} 
        isLoading={isLoading} 
      />

      <div
        className={`relative w-96 h-96 border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${isLoading ? 'pointer-events-none opacity-50' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
          disabled={isLoading}
        />
        
        <div className="flex flex-col items-center justify-center h-full p-8">
          <div className={`mb-4 ${isLoading ? 'animate-pulse-slow' : 'animate-pulse'}`}>
            {isLoading ? (
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <div className="p-4 bg-blue-100 rounded-full">
                <ImageIcon className="w-8 h-8 text-blue-600" />
              </div>
            )}
          </div>
          
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {isLoading ? 'Analyzing Image...' : 'Add Photo Here'}
          </h3>
          
          {!isLoading && (
            <>
              <p className="text-gray-500 text-center mb-4">
                Drag and drop your image or click to browse
              </p>
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Choose File
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const LanguageSelector = ({ language, onLanguageChange, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const languages = [
    { code: 'english', name: 'English', flag: '🇺🇸' },
    { code: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'spanish', name: 'Español', flag: '🇪🇸' },
    { code: 'french', name: 'Français', flag: '🇫🇷' },
    { code: 'german', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'japanese', name: '日本語', flag: '🇯🇵' },
    { code: 'korean', name: '한국어', flag: '🇰🇷' },
    { code: 'chinese', name: '中文', flag: '🇨🇳' },
    { code: 'arabic', name: 'العربية', flag: '🇸🇦' },
    { code: 'portuguese', name: 'Português', flag: '🇧🇷' }
  ];
  
  const currentLang = languages.find(l => l.code === language) || languages[0];
  
  return (
    <div className="mb-8 relative">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 max-w-sm mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Caption Language</h3>
        </div>
        
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => !isLoading && setIsOpen(!isOpen)}
            disabled={isLoading}
            className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{currentLang.flag}</span>
              <span className="font-medium text-gray-700">{currentLang.name}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange && onLanguageChange(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 hover:bg-blue-50 transition-colors text-left ${
                    language === lang.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                  {language === lang.code && (
                    <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;