/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LandingPage } from './components/LandingPage';
import { UploadPage } from './components/UploadPage';
import { LoadingSimulation } from './components/LoadingSimulation';
import { ReportPage } from './components/ReportPage';
import { ArtifactFormData, ValuationResult } from './types';

type AppState = 'landing' | 'upload' | 'loading' | 'report';

// Page transition configuration
const pageVariants = {
  initial: { opacity: 0, y: 10, filter: 'blur(10px)' },
  in: { opacity: 1, y: 0, filter: 'blur(0px)' },
  out: { opacity: 0, y: -10, filter: 'blur(10px)' }
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.6
};

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [formData, setFormData] = useState<ArtifactFormData | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setAppState('upload');
  };

  const handleAnalyze = async (uploadedImages: string[], data: ArtifactFormData) => {
    setImages(uploadedImages);
    setFormData(data);
    setError(null);
    setAppState('loading');

    try {
      const res = await fetch("/api/appraise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          images: uploadedImages,
          ...data
        })
      });
      const responseData = await res.json();
      
      if (res.ok) {
        setResult(responseData);
        // Small delay so the loading animation feels complete
        setTimeout(() => {
          setAppState('report');
        }, 1500);
      } else {
        setError(responseData.error || "Có lỗi xảy ra");
        setAppState('upload');
      }
    } catch (err: any) {
      setError("Lỗi kết nối máy chủ: " + err.message);
      setAppState('upload');
    }
  };

  return (
    <AnimatePresence mode="wait">
      {appState === 'landing' && (
        <motion.div key="landing" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="h-full w-full">
          <LandingPage onStart={handleStart} />
        </motion.div>
      )}
      {appState === 'upload' && (
        <motion.div key="upload" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="h-full w-full">
          <UploadPage 
             onAnalyze={handleAnalyze} 
             isLoading={false} 
             error={error} 
          />
        </motion.div>
      )}
      {appState === 'loading' && (
        <motion.div key="loading" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="h-full w-full flex items-center justify-center min-h-screen">
          <LoadingSimulation />
        </motion.div>
      )}
      {appState === 'report' && result && formData && (
        <motion.div key="report" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="h-full w-full">
          <ReportPage 
            result={result} 
            formData={formData} 
            images={images} 
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
