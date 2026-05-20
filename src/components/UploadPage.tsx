import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImagePlus, X, ChevronRight, Loader2, Target } from 'lucide-react';
import { ArtifactFormData } from '../types';

interface Props {
  onAnalyze: (images: string[], data: ArtifactFormData) => void;
  isLoading: boolean;
  error: string | null;
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function UploadPage({ onAnalyze, isLoading, error }: Props) {
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState<ArtifactFormData>({
    name: "Ngọc Bội Quý Trần Triều",
    weight: "412.5g",
    dimensions: "120 x 8mm",
    material: "Ngọc Cẩm Thạch Thượng Hạng (Type A)",
    origin: "Được đấu giá từ một bộ sưu tập kín tại Paris, trước đó thuộc sở hữu hoàng gia.",
    history: "Một cực phẩm dùng trong cung đình mang tính kết nối nguyên khí đất trời.",
    discovery: "Đấu Giá Nghệ Thuật Châu Á Sotheby's 2002",
    condition: "Tuyệt mỹ; bắt đầu phong hóa nhẹ viền theo năm tháng."
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files) as File[];
      const filesToProcess = files.slice(0, 5 - images.length);
      filesToProcess.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 800;
            const MAX_HEIGHT = 800;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height = Math.round(height * (MAX_WIDTH / width));
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width = Math.round(width * (MAX_HEIGHT / height));
                height = MAX_HEIGHT;
              }
            }
            
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              const dataUrl = canvas.toDataURL('image/jpeg', 0.65);
              setImages(prev => [...prev, dataUrl]);
            }
          };
          img.src = reader.result as string;
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(images, formData);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 p-6 md:p-12 relative overflow-hidden">
      {/* Cinematic ambient background glow */}
      <div className="fixed top-0 left-[20%] w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-4xl mx-auto relative z-10">
        
        <motion.header variants={fadeUp} className="mb-12 border-b border-[#1F1F1F] pb-6 flex items-center justify-between">
           <div>
             <span className="text-[10px] tracking-[0.3em] uppercase opacity-40">Khởi Tạo Hệ Thống</span>
             <h1 className="font-serif italic text-3xl text-[#D4AF37] mt-2">Lập Hồ Sơ Lưu Trữ</h1>
           </div>
           <div className="text-right">
             <div className="text-[10px] tracking-widest opacity-40 uppercase">Trạng Thái Mạng</div>
             <div className="text-xs text-green-500 font-mono flex items-center gap-2 justify-end mt-1">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               PHÂN KHU BẢO MẬT
             </div>
           </div>
        </motion.header>

        <form onSubmit={handleSubmit} className="space-y-12">
          
          {/* Main Visual Matrix */}
          <motion.section variants={fadeUp} className="bg-[#050505] border border-[#1F1F1F] p-8 rounded shadow-2xl relative overflow-hidden group/section transition-colors hover:border-[#D4AF37]/30">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover/section:opacity-10 transition-opacity duration-700">
              <Target className="w-48 h-48 rotate-90 group-hover/section:rotate-0 transition-transform duration-[2s] ease-out" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-[10px] uppercase tracking-widest text-[#D4AF37] mb-6 font-bold flex items-center gap-2">
                <span className="w-1 h-3 bg-[#D4AF37]"></span>
                Ma Trận Thị Giác Đa Góc (Tối Đa 5)
              </h2>
              
              <div className="flex flex-wrap gap-4">
                <AnimatePresence>
                  {images.map((img, i) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      key={img} className="relative w-32 h-40 rounded bg-[#111] overflow-hidden border border-[#222] group hover:border-[#D4AF37] transition-colors shadow-xl">
                      <img src={img} alt={`Vật phẩm ${i}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity mix-blend-luminosity hover:mix-blend-normal hover:scale-110 duration-700 ease-out" />
                      <button type="button" onClick={() => removeImage(i)} className="absolute top-2 right-2 bg-black/80 backdrop-blur-md p-1 rounded-full text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity z-10">
                         <X className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                        <span className="text-[8px] font-mono text-[#D4AF37]">GÓC 0{i+1}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {images.length < 5 && (
                  <motion.label layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-32 h-40 rounded border border-dashed border-[#333] bg-[#0A0A0A] flex flex-col items-center justify-center cursor-pointer hover:bg-[#111] hover:border-[#D4AF37]/50 transition-colors group">
                    <ImagePlus className="w-6 h-6 text-gray-600 group-hover:text-[#D4AF37] mb-3 transition-colors group-hover:scale-110 duration-300" />
                    <span className="text-[8px] text-gray-500 uppercase tracking-widest font-bold group-hover:text-gray-300">Tải Ảnh Lên</span>
                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </motion.label>
                )}
              </div>
            </div>
          </motion.section>

          {/* Data Grid */}
          <motion.section variants={fadeUp} className="bg-[#080808] border border-[#1F1F1F] p-8 rounded shadow-2xl hover:border-[#1a1a1a] transition-colors duration-500">
             <h2 className="text-[10px] uppercase tracking-widest text-gray-400 mb-8 font-bold flex items-center gap-2">
                <span className="w-1 h-3 bg-gray-600"></span>
                Thông Tin Đặc Điểm
              </h2>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="space-y-2 col-span-1 md:col-span-2 group/input">
                  <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Tên Cổ Vật / Vật Phẩm</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-[#111] border-b border-[#222] focus:border-[#D4AF37] px-4 py-3 text-lg font-serif italic text-white placeholder-gray-700 outline-none transition-all focus:bg-[#151515]" placeholder="VD: Thiên thạch Mặt Trăng ALH84001, Ngọc Đời Thanh..." />
                </div>

                <div className="space-y-2 group/input">
                  <label className="text-[10px] uppercase tracking-widest opacity-60 text-gray-400 font-bold block group-hover/input:text-[#D4AF37] transition-colors">Trọng Lượng</label>
                  <input type="text" name="weight" value={formData.weight} onChange={handleChange} className="w-full bg-[#111] border border-[#1F1F1F] rounded px-4 py-3 text-sm font-mono text-gray-300 outline-none focus:border-[#D4AF37]/50 focus:bg-[#151515] transition-all" placeholder="412.5g" />
                </div>

                <div className="space-y-2 group/input">
                  <label className="text-[10px] uppercase tracking-widest opacity-60 text-gray-400 font-bold block group-hover/input:text-[#D4AF37] transition-colors">Kích Thước</label>
                  <input type="text" name="dimensions" value={formData.dimensions} onChange={handleChange} className="w-full bg-[#111] border border-[#1F1F1F] rounded px-4 py-3 text-sm font-mono text-gray-300 outline-none focus:border-[#D4AF37]/50 focus:bg-[#151515] transition-all" placeholder="120 x 8mm" />
                </div>

                <div className="space-y-2 group/input">
                  <label className="text-[10px] uppercase tracking-widest opacity-60 text-gray-400 font-bold block group-hover/input:text-[#D4AF37] transition-colors">Chất Liệu / Cấu Tạo</label>
                  <input type="text" name="material" value={formData.material} onChange={handleChange} className="w-full bg-[#111] border border-[#1F1F1F] rounded px-4 py-3 text-sm font-mono text-gray-300 outline-none focus:border-[#D4AF37]/50 focus:bg-[#151515] transition-all" />
                </div>

                <div className="space-y-2 group/input">
                  <label className="text-[10px] uppercase tracking-widest opacity-60 text-gray-400 font-bold block group-hover/input:text-[#D4AF37] transition-colors">Tình Trạng</label>
                  <input type="text" name="condition" value={formData.condition} onChange={handleChange} className="w-full bg-[#111] border border-[#1F1F1F] rounded px-4 py-3 text-sm font-mono text-gray-300 outline-none focus:border-[#D4AF37]/50 focus:bg-[#151515] transition-all" />
                </div>

                <div className="space-y-2 col-span-1 md:col-span-2 group/input">
                  <label className="text-[10px] uppercase tracking-widest opacity-60 text-gray-400 font-bold block group-hover/input:text-[#D4AF37] transition-colors">Nguồn Gốc / Khám Phá</label>
                  <input type="text" name="origin" value={formData.origin} onChange={handleChange} className="w-full bg-[#111] border border-[#1F1F1F] rounded px-4 py-3 text-sm font-serif text-gray-300 outline-none focus:border-[#D4AF37]/50 focus:bg-[#151515] transition-all" />
                </div>

                <div className="space-y-2 col-span-1 md:col-span-2 group/input">
                  <label className="text-[10px] uppercase tracking-widest opacity-60 text-gray-400 font-bold block group-hover/input:text-[#D4AF37] transition-colors">Lịch Sử & Cốt Truyện Đi Kèm</label>
                  <textarea name="history" value={formData.history} onChange={handleChange} rows={4} className="w-full resize-none bg-[#111] border border-[#1F1F1F] rounded px-4 py-4 text-sm font-serif leading-relaxed text-gray-300 outline-none focus:border-[#D4AF37]/50 focus:bg-[#151515] transition-all"></textarea>
                </div>

             </div>
          </motion.section>

          {error && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-4 bg-red-950/20 border-l-2 border-red-800 text-red-500 font-mono text-[10px] uppercase tracking-widest">
              LỖI: {error}
            </motion.div>
          )}

          <motion.div variants={fadeUp} className="flex justify-end pt-6 border-t border-[#1F1F1F]">
             <button 
                type="submit"
                disabled={isLoading || images.length === 0}
                className="group relative px-8 py-4 bg-[#D4AF37] text-black font-bold text-[10px] uppercase tracking-[0.2em] rounded flex items-center justify-center min-w-[240px] disabled:opacity-50 hover:brightness-110 transition-all shadow-[0_0_30px_rgba(212,175,55,0.15)] overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                {isLoading ? (
                  <span className="relative z-10 flex items-center">
                     <Loader2 className="w-4 h-4 animate-spin mr-3" />
                     Đang Khởi Chạy Chuỗi Máy Chủ...
                  </span>
                ) : (
                  <span className="relative z-10 flex items-center">
                    Phân Tích Chuyên Sâu
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
             </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
