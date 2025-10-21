import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Copy, Instagram, Linkedin, Tag, Heart, Eye } from 'lucide-react';

const ResultDisplay = ({ image, analysis, onReset }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <Button 
          onClick={onReset} 
          variant="outline" 
          className="mb-6"
        >
          ← Upload New Image
        </Button>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Image Display */}
          <Card>
            <CardContent className="p-6">
              <img 
                src={image} 
                alt="Uploaded" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </CardContent>
          </Card>

          {/* Analytics */}
          <div className="space-y-4">
            {/* Keywords */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Tag className="w-5 h-5" />
                  Keywords
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords?.map((keyword, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Vibe/Mood */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="w-5 h-5" />
                  Vibe & Mood
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{analysis.vibe}</p>
              </CardContent>
            </Card>

            {/* Alt Text */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Eye className="w-5 h-5" />
                  Alt Text
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-gray-700">{analysis.altText}</p>
                  <Button 
                    onClick={() => copyToClipboard(analysis.altText)}
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Captions */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Instagram Caption */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Instagram className="w-5 h-5 text-pink-600" />
                Instagram Caption
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {analysis.instagramCaption}
                </p>
                <Button 
                  onClick={() => copyToClipboard(analysis.instagramCaption)}
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* LinkedIn Caption */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Linkedin className="w-5 h-5 text-blue-600" />
                LinkedIn Caption
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {analysis.linkedinCaption}
                </p>
                <Button 
                  onClick={() => copyToClipboard(analysis.linkedinCaption)}
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;