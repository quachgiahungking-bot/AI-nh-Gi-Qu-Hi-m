import React from 'react';
import { motion } from 'framer-motion';
import { ValuationResult, ArtifactFormData } from '../types';
import { ShieldAlert, Gavel, Scale, Radar, Share2, Award, History, Sparkles } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar as RechartsRadar } from 'recharts';

interface Props {
  result: ValuationResult;
  formData: ArtifactFormData;
  images: string[];
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

export function ReportPage({ result, formData, images }: Props) {
  
  // Fake chart data based on rarity score to make it look premium
  const chartData = [
    { subject: 'Độ Hiếm', A: Math.min(100, result.rarity_score), fullMark: 100 },
    { subject: 'Khí Chất Bí Ẩn', A: Math.min(100, result.historical_mystery_score), fullMark: 100 },
    { subject: 'Tiềm Năng Đầu Tư', A: Math.max(50, result.investment_strength), fullMark: 100 },
    { subject: 'Nhu Cầu', A: Math.min(100, result.rarity_score + 10), fullMark: 100 },
    { subject: 'Lịch Sử', A: Math.min(100, result.historical_mystery_score + 5), fullMark: 100 },
  ];

  return (
    <div className="bg-[#0A0A0A] text-gray-200 min-h-screen flex flex-col md:flex-row border-[6px] border-[#000]">
      
      {/* Sidebar Navigation */}
      <nav className="hidden md:flex w-20 border-r border-[#1F1F1F] flex-col items-center py-8 space-y-12 bg-[#050505]">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }} className="w-10 h-10 bg-[#D4AF37] rounded flex items-center justify-center text-black font-bold text-xs shadow-[0_0_15px_rgba(212,175,55,0.3)]">
          AAI
        </motion.div>
        <div className="flex flex-col space-y-8 opacity-40">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="w-6 h-6 border-2 border-white rounded-sm"></motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="w-6 h-6 border-2 border-white rounded-full"></motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="w-6 h-6 border-2 border-white transform rotate-45"></motion.div>
        </div>
        <div className="mt-auto mb-16 text-[10px] uppercase tracking-widest style-vertical opacity-30 whitespace-nowrap -rotate-90">
          Phân Khu Kín VIP
        </div>
      </nav>

      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Header */}
        <header className="h-20 border-b border-[#1F1F1F] flex items-center justify-between px-6 md:px-10 bg-[#0A0A0A] sticky top-0 z-50">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex flex-col">
            <span className="text-[8px] tracking-[0.3em] uppercase opacity-40 text-[#D4AF37]">Báo Cáo Thẩm Định Độc Bản</span>
            <span className="font-serif italic text-lg md:text-xl text-white">{formData.name}</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex items-center space-x-6">
            <div className="text-right hidden sm:block">
              <div className="text-[8px] tracking-[0.2em] opacity-40 uppercase">Chỉ Số Chuyên Gia</div>
              <div className="text-xs text-[#D4AF37] font-mono">Cấp Độ VIP</div>
            </div>
            <button className="h-10 px-6 bg-white/5 border border-white/10 rounded text-[10px] uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2 group">
              <Share2 className="w-3 h-3 group-hover:text-[#D4AF37] transition-colors" /> Xuất Hồi Ký
            </button>
          </motion.div>
        </header>

        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex-1 flex flex-col xl:flex-row">
          
          {/* Left Column: Visuals & Metrics */}
          <section className="xl:w-[450px] p-6 md:p-10 border-b xl:border-b-0 xl:border-r border-[#1F1F1F] flex flex-col space-y-6 bg-[#080808]">
            
            {/* Primary Visual */}
            <motion.div variants={scaleIn} className="w-full aspect-[4/5] bg-[#111] rounded border border-[#222] relative overflow-hidden group">
              {images[0] && (
                <img src={images[0]} alt="Primary Scan" className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal hover:scale-105 transition-all duration-1000 ease-out opacity-80" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[transparent_60%] to-transparent"></div>
              
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur px-3 py-1.5 rounded flex items-center gap-2 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
                <span className="text-[8px] tracking-[0.2em] font-mono uppercase text-[#D4AF37]">Phân Tích Sâu (Deep Scan)</span>
              </div>
              
              <div className="absolute bottom-6 left-6 right-6">
                 <div className="flex justify-between items-end">
                   <div>
                     <div className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mb-1">Chỉ Số Độ Hiếm</div>
                     <div className="text-5xl font-serif text-white">{result.rarity_score}<span className="text-xl text-gray-500">/100</span></div>
                   </div>
                   <Award className="w-10 h-10 text-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors" />
                 </div>
              </div>
            </motion.div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div variants={fadeUp} className="p-4 border border-[#1F1F1F] rounded bg-[#0A0A0A] hover:border-[#333] transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#D4AF37]/5 rounded-full blur-xl"></div>
                <div className="text-[10px] uppercase tracking-widest opacity-60 mb-2">Độ Mạnh Đầu Tư</div>
                <div className="text-2xl font-serif text-white">{result.investment_strength}<span className="text-[10px] text-gray-500 ml-1">/100</span></div>
              </motion.div>
              <motion.div variants={fadeUp} className="p-4 border border-[#1F1F1F] rounded bg-[#0A0A0A] hover:border-[#333] transition-colors group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-16 h-16 bg-blue-500/5 rounded-full blur-xl"></div>
                <div className="text-[10px] uppercase tracking-widest opacity-60 mb-2">Bí Ẩn Lịch Sử</div>
                <div className="text-2xl font-serif text-white">{result.historical_mystery_score}<span className="text-[10px] text-gray-500 ml-1">/100</span></div>
              </motion.div>
            </div>

            {/* Radar Chart */}
            <motion.div variants={fadeUp} className="p-4 border border-[#1F1F1F] rounded bg-[#0A0A0A] h-[250px] relative flex flex-col items-center justify-center hover:border-[#333] transition-colors">
              <div className="absolute top-4 left-4 text-[10px] uppercase tracking-widest opacity-40 font-bold">Ma Trận Giá Trị VIP</div>
              <div className="w-full h-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="60%" data={chartData}>
                    <PolarGrid stroke="#333" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 10, fontFamily: 'monospace' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <RechartsRadar name="Artifact" dataKey="A" stroke="#D4AF37" fill="#D4AF37" fillOpacity={0.2} animationBegin={800} animationDuration={1500} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

          </section>

          {/* Right Column: Deep Narrative & Value */}
          <section className="flex-1 p-6 md:p-10 flex flex-col bg-[#0A0A0A] overflow-y-auto">
            
            <div className="max-w-3xl">
              
              {/* Valuation Focus */}
              <motion.div 
                variants={fadeUp}
                className="mb-12 p-8 rounded border border-[#D4AF37]/30 bg-[#D4AF37]/5 relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3 group-hover:bg-[#D4AF37]/20 transition-colors duration-1000"></div>
                <div className="relative z-10 flex flex-col md:flex-row shadow-sm justify-between gap-6">
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-2 flex items-center gap-2">
                       <Gavel className="w-3 h-3" /> ĐỊNH GIÁ TOÀN CẦU ƯỚC TÍNH
                    </h3>
                    <div className="font-serif italic text-4xl md:text-5xl lg:text-5xl text-white tracking-tight mb-4">
                      {result.valuation}
                    </div>
                    
                    {result.reference_price_range && (
                      <div className="grid grid-cols-2 gap-4 mt-2 mb-4">
                        <div className="border border-[#D4AF37]/20 bg-black/30 rounded p-3">
                          <div className="text-[9px] uppercase tracking-widest text-[#D4AF37]/70 mb-1">Thấp Nhất Ghi Nhận</div>
                          <div className="text-lg text-gray-300 font-serif">{result.reference_price_range.lowest}</div>
                        </div>
                        <div className="border border-[#D4AF37]/40 bg-[#D4AF37]/10 rounded p-3">
                          <div className="text-[9px] uppercase tracking-widest text-[#D4AF37] mb-1">Kỷ Lục Cao Nhất</div>
                          <div className="text-lg text-[#D4AF37] font-serif">{result.reference_price_range.highest}</div>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4 pt-4 border-t border-[#D4AF37]/20">
                      <h4 className="text-[9px] uppercase tracking-widest text-gray-500 font-bold mb-2">Thị Trường Xác Thực</h4>
                      <p className="text-xs text-gray-400 font-serif leading-relaxed italic">{result.comparable_sales}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Narrative Sections */}
              <div className="space-y-12">
                
                <motion.div variants={fadeUp}>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="w-3 h-3" /> Chạm Đáy Lịch Sử & Thời Gian
                  </h4>
                  <p className="font-serif text-lg md:text-xl leading-relaxed text-gray-300 whitespace-pre-wrap">
                    "{result.story}"
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <motion.div variants={fadeUp} className="space-y-4">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] opacity-50 font-bold border-b border-[#1F1F1F] pb-2">Bề Mặt & Cấu Trúc Độc Bản</h4>
                    <p className="font-serif text-sm leading-loose text-gray-400 whitespace-pre-wrap">
                      {result.surface_structure}
                    </p>
                  </motion.div>

                  <motion.div variants={fadeUp} className="space-y-4">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] opacity-50 font-bold border-b border-[#1F1F1F] pb-2">Sức Hút Tới Giới Mộ Điệu</h4>
                    <p className="font-serif text-sm leading-loose text-gray-400 whitespace-pre-wrap">
                      {result.collector_appeal}
                    </p>
                  </motion.div>
                </div>
                
                <motion.div variants={fadeUp} className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] opacity-50 font-bold border-b border-[#1F1F1F] pb-2">Niên Đại & Nguồn Gốc Sâu Xa</h4>
                  <p className="font-serif text-sm leading-loose text-gray-400 whitespace-pre-wrap">
                    {result.age_and_origin}
                  </p>
                </motion.div>

                {/* Sales Post Generator output */}
                <motion.div variants={fadeUp} className="pt-8 border-t border-[#1F1F1F]">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-6 flex items-center gap-2">
                    <Share2 className="w-3 h-3" /> Hành Trang Cọ Xát Thị Trường
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 rounded bg-[#111] border border-[#1F1F1F] hover:border-[#D4AF37]/40 transition-colors">
                      <h5 className="text-[10px] uppercase tracking-widest opacity-60 mb-3 font-bold border-b border-[#222] pb-2">Sàn Đấu Giá Tập Trung</h5>
                      <p className="text-xs font-serif leading-relaxed text-gray-400 h-40 overflow-y-auto custom-scrollbar whitespace-pre-wrap">
                        {result.sales_post?.auction || "Dữ liệu đang được phân tích thêm..."}
                      </p>
                    </div>
                    <div className="p-5 rounded bg-[#111] border border-[#1F1F1F] hover:border-[#D4AF37]/40 transition-colors">
                      <h5 className="text-[10px] uppercase tracking-widest opacity-60 mb-3 font-bold border-b border-[#222] pb-2">Mạng Lưới Kín (Facebook)</h5>
                      <p className="text-xs font-serif leading-relaxed text-gray-400 h-40 overflow-y-auto custom-scrollbar whitespace-pre-wrap">
                        {result.sales_post?.facebook || "Dữ liệu đang được phân tích thêm..."}
                      </p>
                    </div>
                    <div className="p-5 rounded bg-[#111] border border-[#1F1F1F] hover:border-[#D4AF37]/40 transition-colors">
                      <h5 className="text-[10px] uppercase tracking-widest opacity-60 mb-3 font-bold border-b border-[#222] pb-2">Giải Trí Xa Xỉ (TikTok)</h5>
                      <p className="text-xs font-serif leading-relaxed text-gray-400 h-40 overflow-y-auto custom-scrollbar whitespace-pre-wrap">
                        {result.sales_post?.tiktok || "Dữ liệu đang được phân tích thêm..."}
                      </p>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </section>
        </motion.div>
      </main>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0A0A0A;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #D4AF37;
        }
      `}</style>
    </div>
  );
}
