import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ScanLine, Diamond, Globe2, ChevronRight, ShieldCheck } from 'lucide-react';

interface Props {
  onStart: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export function LandingPage({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 relative overflow-hidden flex flex-col font-sans">
      {/* Background Cinematic effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay"></div>
      
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-full border-b border-[#1F1F1F] bg-[#0A0A0A]/50 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[#D4AF37]">
            <Diamond className="w-5 h-5" />
            <span className="font-serif text-xl tracking-widest font-bold uppercase">Sotheby's AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
            <button className="hover:text-[#D4AF37] transition-colors">Sàn Giao Dịch</button>
            <button className="hover:text-[#D4AF37] transition-colors">Thẩm Định</button>
            <button className="hover:text-[#D4AF37] transition-colors">Đặc Quyền VIP</button>
          </nav>
        </div>
      </motion.header>

      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 mt-16 md:mt-24 pb-32 max-w-7xl mx-auto w-full">
        <motion.div
           variants={containerVariants}
           initial="hidden"
           animate="show"
           className="text-center space-y-8 max-w-4xl"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-[0.2em] uppercase text-white">Quách Vũ Gia <span className="text-[#D4AF37]">Group</span></h2>
          </motion.div>
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold mb-4">
            <Sparkles className="w-3 h-3" />
            <span>Hệ Thống Phân Tích Xa Xỉ Trí Tuệ Nhân Tạo</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="font-serif italic text-6xl md:text-8xl text-white leading-[1.1] tracking-tight">
            Định Giá Tuyệt Tác <br/> <span className="text-[#D4AF37]">Của Bạn.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 font-serif max-w-2xl mx-auto leading-relaxed">
            Ứng dụng AI tiên tiến nhất thế giới để phân tích, thẩm định và giải mã di sản ẩn giấu trong thiên thạch, đá quý và cổ vật của bạn.
          </motion.p>
          
          <motion.div variants={itemVariants} className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={onStart}
              className="relative group overflow-hidden pl-8 pr-6 py-4 rounded bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-4 transition-all hover:brightness-110 shadow-[0_0_40px_rgba(212,175,55,0.2)]">
              <span className="relative z-10">Bắt Đầu Thẩm Định</span>
              <ScanLine className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </button>
            
            <button className="relative group px-8 py-4 rounded border border-white/20 text-white text-xs font-bold uppercase tracking-[0.2em] overflow-hidden">
              <span className="relative z-10 group-hover:text-[#D4AF37] transition-colors duration-300">Khám Phá Sàn Giao Dịch</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </motion.div>
        </motion.div>
        
        {/* Features preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 w-full mt-32 border-t border-[#1F1F1F] pt-16 mt-auto"
        >
           <div className="space-y-4 group">
              <Globe2 className="w-8 h-8 text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors duration-500" />
              <h3 className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Mạng Lưới Dữ Liệu Toàn Cầu</h3>
              <p className="text-sm font-serif text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-500">Kết nối sâu rộng với các cơ sở dữ liệu đấu giá tư nhân và thị trường xa xỉ toàn cầu.</p>
           </div>
           <div className="space-y-4 group">
              <ScanLine className="w-8 h-8 text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors duration-500" />
              <h3 className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Quét Cấu Trúc Khối Sâu</h3>
              <p className="text-sm font-serif text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-500">Hệ thống ma trận thị giác phân tích độ phong hóa, cấu trúc tinh thể và dấu vết lịch sử.</p>
           </div>
           <div className="space-y-4 group">
              <ShieldCheck className="w-8 h-8 text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors duration-500" />
              <h3 className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Bảo Mật Đặc Quyền VIP</h3>
              <p className="text-sm font-serif text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-500">Đảm bảo tuyệt mật thông tin vật phẩm trong phân khu an toàn cho đến khi bạn quyết định công bố.</p>
           </div>
        </motion.div>
      </main>
    </div>
  );
}
