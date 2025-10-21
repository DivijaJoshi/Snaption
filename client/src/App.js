import React, { useState } from 'react';
import axios from 'axios';
import ImageUpload from './components/ImageUpload';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('snaption-language') || 'english';
  });
  
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('snaption-language', newLanguage);
  };

  const handleImageUpload = async (file) => {
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('language', language);

      const response = await axios.post('http://localhost:4000/api/analyze-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setAnalysis(response.data);
      setUploadedImage(URL.createObjectURL(file));
    } catch (error) {
      console.error('Error analyzing image:', error);
      alert('Failed to analyze image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setUploadedImage(null);
    setAnalysis(null);
  };

  return (
    <div className="App">
      {!uploadedImage || !analysis ? (
        <ImageUpload 
          onImageUpload={handleImageUpload} 
          isLoading={isLoading}
          language={language || 'english'}
          onLanguageChange={handleLanguageChange}
        />
      ) : (
        <ResultDisplay 
          image={uploadedImage} 
          analysis={analysis} 
          onReset={handleReset} 
        />
      )}
    </div>
  );
}

export default App;