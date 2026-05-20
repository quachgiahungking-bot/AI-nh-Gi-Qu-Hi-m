import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanLine, Loader2 } from 'lucide-react';

interface Props {
  messages?: string[];
}

export function LoadingSimulation({ messages = [
  "Đang Thiết Lập Kênh Bảo Mật Lượng Tử...",
  "AI Online: Kích Hoạt Mạng Lưới Thẩm Định Toàn Cầu...",
  "Extended Analysis Mode: Đang Đối Chiếu Hồ Sơ Đấu Giá...",
  "Collector Intelligence Active: Đang Kiến Tạo DNA Cốt Truyện...",
  "Premium Valuation Running: Đang Trích Xuất Mật Độ Chất Liệu...",
  "Đang Tổng Hợp Mô Hình Định Giá Triệu Đô..."
]}: Props) {
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev < messages.length - 1) return prev + 1;
        return prev;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#D4AF37] flex flex-col items-center justify-center p-6 relative overflow-hidden">
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
         <ScanLine className="w-[800px] h-[800px] animate-pulse" />
       </div>
       
       <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
         
         <div className="w-24 h-24 border border-[#D4AF37]/30 rounded-full flex items-center justify-center mb-12 relative">
            <div className="absolute inset-0 border-t-2 border-[#D4AF37] rounded-full animate-spin"></div>
            <Loader2 className="w-8 h-8 opacity-50 animate-pulse" />
         </div>

         <div className="h-20 flex items-center justify-center relative w-full">
           <AnimatePresence mode="wait">
             <motion.div
               key={currentIndex}
               initial={{ opacity: 0, y: 10, position: 'absolute' }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="text-xs uppercase tracking-widest font-mono text-gray-400"
             >
               {messages[currentIndex]}
             </motion.div>
           </AnimatePresence>
         </div>
         
         <div className="w-full bg-[#111] h-1 rounded-full overflow-hidden mt-12">
            <motion.div 
               initial={{ width: "0%" }}
               animate={{ width: "100%" }}
               transition={{ duration: messages.length * 1.5, ease: "linear" }}
               className="h-1 bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.8)]"
            />
         </div>
         
         <div className="mt-6 text-[8px] tracking-[0.3em] font-bold opacity-30">
           MẠNG LƯỚI KHÁCH HÀNG VIP
         </div>
       </div>
    </div>
  );
}
