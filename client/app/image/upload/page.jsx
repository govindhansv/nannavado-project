"use client";

import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const ImageUploadForm = () => {
  const [previewUrl, setPreviewUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle your form submission logic here
    console.log('Form submitted with image:', fileName);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
            ${previewUrl ? 'bg-gray-50' : 'bg-white'}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => handleFile(e.target.files[0])}
          />
          
          <div className="space-y-4">
            {previewUrl ? (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-48 mx-auto rounded-lg shadow-md"
                />
                <p className="mt-2 text-sm text-gray-500">{fileName}</p>
              </div>
            ) : (
              <>
                <div className="flex justify-center">
                  <Upload className="h-12 w-12 text-gray-400" />
                </div>
                <div>
                  <p className="text-base font-medium text-gray-700">
                    Drop your image here, or <span className="text-blue-500">browse</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Supports JPG, PNG, GIF up to 10MB
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-3 px-4 rounded-md text-white font-medium
            transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
            ${previewUrl 
              ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' 
              : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={!previewUrl}
        >
          Upload Image
        </button>
      </form>
    </div>
  );
};

export default ImageUploadForm;