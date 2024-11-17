"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Upload, Loader, X } from 'lucide-react';
import * as faceapi from 'face-api.js';

const FaceEmotionDetection = () => {
  const [previewUrl, setPreviewUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [detectionResults, setDetectionResults] = useState(null);
  const [error, setError] = useState(null);
  const imageRef = useRef();
  const canvasRef = useRef();
  const fileInputRef = useRef();

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    try {
      setIsLoading(true);
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]);
      setModelLoaded(true);
    } catch (error) {
      setError('Failed to load face detection models');
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setPreviewUrl('');
    setDetectionResults(null);
    setError(null);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFile = async (file) => {
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.onerror = () => {
        setError('Failed to read the image file');
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setError('Error processing the image');
      setIsLoading(false);
    }
  };

  const detectFaceAndEmotion = async () => {
    if (!imageRef.current || !modelLoaded) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const detections = await faceapi
        .detectAllFaces(imageRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detections.length === 0) {
        setError('No faces detected in the image');
        setDetectionResults(null);
        return;
      }

      const displaySize = { 
        width: imageRef.current.width, 
        height: imageRef.current.height 
      };

      if (canvasRef.current) {
        canvasRef.current.width = displaySize.width;
        canvasRef.current.height = displaySize.height;
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, displaySize.width, displaySize.height);
        
        faceapi.draw.drawDetections(canvasRef.current, 
          faceapi.resizeResults(detections, displaySize));

        const results = detections.map(detection => ({
          box: detection.detection.box,
          expressions: Object.entries(detection.expressions)
            .sort(([,a], [,b]) => b - a)
            .reduce((obj, [key, value]) => {
              obj[key] = (value * 100).toFixed(1) + '%';
              return obj;
            }, {})
        }));
        setDetectionResults(results);
      }
    } catch (error) {
      setError('Error analyzing the image');
      setDetectionResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleImageLoad = () => {
    if (previewUrl) {
      detectFaceAndEmotion();
    }
  };

  const handleRemoveImage = () => {
    resetState();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {!modelLoaded && !error && (
        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          <p className="text-yellow-700">Loading face detection models...</p>
        </div>
      )}

      {error && (
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${previewUrl ? 'bg-gray-50' : 'bg-white'}`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => handleFile(e.target.files[0])}
          disabled={!modelLoaded || isLoading}
        />
        
        {previewUrl ? (
          <div className="relative inline-block">
            <img
              ref={imageRef}
              src={previewUrl}
              alt="Preview"
              className="max-h-96 mx-auto rounded-lg"
              onLoad={handleImageLoad}
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                handleRemoveImage();
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <Upload className="h-12 w-12 text-gray-400" />
            </div>
            <div>
              <p className="text-base font-medium text-gray-700">
                Drop your image here, or <span className="text-blue-500">browse</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Supports JPG, PNG images
              </p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 bg-white/75 flex items-center justify-center">
            <Loader className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        )}
      </div>

      {detectionResults && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-3">Detection Results:</h3>
          {detectionResults.map((result, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <p className="font-medium text-gray-700">Face {index + 1}</p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {Object.entries(result.expressions).slice(0, 3).map(([emotion, probability]) => (
                  <div key={emotion} className="flex justify-between bg-gray-50 p-2 rounded">
                    <span className="capitalize">{emotion}</span>
                    <span className="font-medium">{probability}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FaceEmotionDetection;