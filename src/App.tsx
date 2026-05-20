/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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

export interface HistoryItem {
  id: string;
  date: string;
  formData: ArtifactFormData;
  result: ValuationResult;
  images: string[];
}

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [formData, setFormData] = useState<ArtifactFormData | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('valuation_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const saveToHistory = (data: ArtifactFormData, res: ValuationResult, imgs: string[]) => {
    const newItem: HistoryItem = {
      id: Math.random().toString(36).substring(7),
      date: new Date().toISOString(),
      formData: data,
      result: res,
      images: imgs,
    };
    const newHistory = [newItem, ...history];
    setHistory(newHistory);
    localStorage.setItem('valuation_history', JSON.stringify(newHistory));
  };

  const handleStart = () => {
    setAppState('upload');
  };

  const handleViewHistoryItem = (item: HistoryItem) => {
    setFormData(item.formData);
    setResult(item.result);
    setImages(item.images);
    setAppState('report');
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
        saveToHistory(data, responseData, uploadedImages);
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
             history={history}
             onViewHistory={handleViewHistoryItem}
          />
        </motion.div>
      )}
      {appState === 'loading' && (
        <motion.div key="loading" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="h-full w-full flex items-center justify-center min-h-screen">
          <LoadingSimulation />
        </motion.div>
      )}
      {appState === 'report' && result && formData && (
        <motion.div key="report" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="h-full w-full relative">
          <button 
             onClick={() => setAppState('upload')}
             className="absolute top-6 left-6 z-[100] px-4 py-2 bg-[#111] border border-[#333] hover:border-[#D4AF37] hover:text-[#D4AF37] text-gray-400 text-[10px] uppercase tracking-widest rounded transition-colors shadow-lg"
          >
            ← Bảng Điều Khiển
          </button>
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
