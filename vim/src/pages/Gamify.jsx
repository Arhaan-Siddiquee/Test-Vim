import React, { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

const Gamify = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const [exerciseCount, setExerciseCount] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [loadingState, setLoadingState] = useState('initial');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showManualMode, setShowManualMode] = useState(false);

  // Setup webcam with better error handling
  useEffect(() => {
    const setupCamera = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setErrorMessage('Browser does not support camera access. Try using Chrome or Firefox.');
        return;
      }
      
      try {
        setLoadingState('camera');
        
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user'
          },
          audio: false,
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            setIsWebcamReady(true);
            setLoadingProgress(50);
            startSimpleTracking();
          };
        }
      } catch (error) {
        console.error('Camera access error:', error);
        if (error.name === 'NotAllowedError') {
          setErrorMessage('Camera access denied. Please allow camera access and reload the page.');
        } else if (error.name === 'NotFoundError') {
          setErrorMessage('No camera found. Please connect a camera and reload the page.');
        } else {
          setErrorMessage(`Camera error: ${error.message}. Try using manual mode instead.`);
          setShowManualMode(true);
        }
      }
    };
    
    setupCamera();
    
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Simple tracking for devices that may have issues with TensorFlow.js
  const startSimpleTracking = () => {
    setLoadingState('ready');
    setLoadingProgress(100);
    
    // Simple motion detection using canvas comparison
    if (canvasRef.current && videoRef.current && isWebcamReady) {
      const ctx = canvasRef.current.getContext('2d');
      const width = videoRef.current.videoWidth;
      const height = videoRef.current.videoHeight;
      
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      
      let previousImageData = null;
      let motionCounter = 0;
      let motionState = 'up';
      let motionThreshold = 15; // Adjust based on testing
      
      const detectMotion = () => {
        if (!isTracking) return;
        
        ctx.drawImage(videoRef.current, 0, 0, width, height);
        const currentImageData = ctx.getImageData(0, 0, width, height);
        
        // Draw person outline for visual feedback
        ctx.strokeStyle = 'aqua';
        ctx.lineWidth = 3;
        ctx.strokeRect(width * 0.25, height * 0.2, width * 0.5, height * 0.6);
        
        if (previousImageData) {
          const motionScore = calculateMotionScore(
            previousImageData.data, 
            currentImageData.data
          );
          
          // Display motion score for debugging
          ctx.fillStyle = 'white';
          ctx.font = '16px Arial';
          ctx.fillText(`Motion: ${motionScore.toFixed(2)}`, 10, 30);
          
          // Track push-up motion
          if (motionState === 'up' && motionScore > motionThreshold) {
            motionState = 'down';
            setFeedback('Going down... good!');
          } else if (motionState === 'down' && motionScore > motionThreshold) {
            motionState = 'up';
            setExerciseCount(prev => prev + 1);
            setFeedback('Push-up completed! Great job!');
          }
        }
        
        previousImageData = currentImageData;
        
        // Continue detection loop
        requestAnimationFrame(detectMotion);
      };
      
      detectMotion();
    }
  };

  // Simple motion detection algorithm
  const calculateMotionScore = (previous, current) => {
    let score = 0;
    const sampleSize = previous.length / 40; // Sample every Nth pixel for performance
    
    for (let i = 0; i < previous.length; i += sampleSize) {
      const pixelDiff = Math.abs(previous[i] - current[i]) + 
                       Math.abs(previous[i+1] - current[i+1]) + 
                       Math.abs(previous[i+2] - current[i+2]);
      score += pixelDiff;
    }
    
    return score / (previous.length / sampleSize);
  };

  // Manual tracking functions
  const handleManualCount = () => {
    setExerciseCount(prev => prev + 1);
    setFeedback('Push-up counted!');
  };

  const toggleTracking = () => {
    setIsTracking(!isTracking);
    setFeedback(isTracking ? 'Tracking paused' : 'Tracking started');
  };

  const resetStats = () => {
    setExerciseCount(0);
    setFeedback('Stats reset');
  };

  // Render loading state UI
  const renderLoadingState = () => {
    if (loadingState === 'initial' || loadingState === 'camera') {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-30">
          <div className="text-center max-w-md px-6">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg mb-4">
              {loadingState === 'initial' ? 'Initializing...' : 'Accessing camera...'}
            </p>
            <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Render error state UI
  const renderErrorState = () => {
    if (errorMessage) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-40">
          <div className="bg-gray-800 p-6 rounded-xl max-w-md text-center">
            <div className="w-16 h-16 mx-auto mb-4 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Camera Error</h3>
            <p className="text-gray-300 mb-6">{errorMessage}</p>
            {showManualMode && (
              <button 
                onClick={() => {
                  setErrorMessage('');
                  setLoadingState('ready');
                  setShowManualMode(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Continue with Manual Mode
              </button>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-[#48c4a4] mb-6">
          Fitness Gamified
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats & Controls */}
          <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3">Your Workout</h2>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-700 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-400">Exercise</p>
                  <p className="text-xl font-bold text-blue-400">Push-ups</p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-400">Completed</p>
                  <p className="text-3xl font-bold text-purple-400">{exerciseCount}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3">Controls</h2>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={toggleTracking}
                  className={`${isTracking 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-green-600 hover:bg-green-700'} 
                    px-4 py-2 rounded-lg font-bold transition-colors`}
                  disabled={loadingState !== 'ready'}
                >
                  {isTracking ? 'Stop Tracking' : 'Start Tracking'}
                </button>
                
                <button 
                  onClick={resetStats}
                  className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-bold transition-colors"
                >
                  Reset Counter
                </button>
                
                {showManualMode && (
                  <button 
                    onClick={handleManualCount}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-bold transition-colors mt-4"
                  >
                    Count Push-up Manually
                  </button>
                )}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">Tips</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Face the camera from the side view</li>
                <li>Ensure good lighting in your room</li>
                <li>Keep your entire body visible in frame</li>
                <li>Maintain proper form throughout</li>
              </ul>
            </div>
          </div>
          
          {/* Middle & Right Column - Camera/Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <video 
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  playsInline
                  muted
                />
                <canvas 
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full object-cover z-10"
                />
                
                {/* Render loading state */}
                {renderLoadingState()}
                
                {/* Render error state */}
                {renderErrorState()}
                
                {/* Overlay Elements */}
                {loadingState === 'ready' && (
                  <>
                    <div className="absolute top-4 left-4 z-20">
                      <div className="bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                        {isTracking ? 'Tracking Active' : 'Tracking Paused'}
                      </div>
                    </div>
                    
                    {/* Exercise Counter */}
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-black/60 text-white px-4 py-2 rounded-lg">
                        <span className="text-3xl font-bold">{exerciseCount}</span>
                        <span className="ml-2">Push-ups</span>
                      </div>
                    </div>
                    
                    {/* Feedback */}
                    {feedback && (
                      <div className="absolute bottom-4 left-4 right-4 z-20 text-center">
                        <div className="bg-black/60 text-white px-4 py-2 rounded-lg inline-block mx-auto">
                          {feedback}
                        </div>
                      </div>
                    )}
                  </>
                )}
                
                {/* Manual Mode Overlay */}
                {showManualMode && loadingState === 'ready' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-2">Manual Tracking Mode</h3>
                      <p className="text-white mb-4">Press the button to count your push-ups</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Progress */}
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-2">Today's Goal</h3>
                <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(100, (exerciseCount / 20) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>0</span>
                  <span>Goal: 20 push-ups</span>
                </div>
              </div>
              
              {/* Quick Guide */}
              <div className="mt-6 bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Quick Troubleshooting</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>• If tracking is slow, try closing other browser tabs</p>
                  <p>• Make sure you're in a well-lit environment</p>
                  <p>• If camera doesn't load, try refreshing the page</p>
                  <p>• For best results, position camera at waist height</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Gamify;