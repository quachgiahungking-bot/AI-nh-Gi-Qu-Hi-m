export function generateMockAnalysis(body: any) {
  const name = body.name || "Tuyệt Tác Ẩn Danh";
  const material = body.material || "Khoáng vật/Chất liệu thượng lưu chưa xác định";
  
  const rarity = Math.floor(Math.random() * 9) + 90; // 90 to 98
  const mysteryScore = Math.floor(Math.random() * 11) + 85; 
  const investmentStrength = Math.floor(Math.random() * 8) + 92;

  // Base price generator simulating real auction estimates
  const baseValue = Math.floor(Math.random() * 50) + 15; // 15 to 64
  const multiplier = Math.floor(Math.random() * 3) === 0 ? 10000 : 1000;
  const lowerBound = baseValue * multiplier;
  const upperBound = (baseValue + Math.floor(Math.random() * 30) + 10) * multiplier;
  
  const formatPrice = (price: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

  return {
    valuation: `${formatPrice(lowerBound)} - ${formatPrice(upperBound)} Ước tính chuyên gia`,
    reference_price_range: {
      lowest: formatPrice(lowerBound * 0.7),
      highest: formatPrice(upperBound * 1.8),
    },
    comparable_sales: `Các mẫu vật với đặc tính tương đương từ nguồn gốc này thường thu hút sự chú ý tại các phiên đấu giá kín của Sotheby's và Christie's, dao động ở mức ${formatPrice(lowerBound * 0.8)} đến mức kỷ lục ${formatPrice(upperBound * 1.5)}.`,
    rarity_score: rarity,
    historical_mystery_score: mysteryScore,
    investment_strength: investmentStrength,
    age_and_origin: `Mặc dù hệ thống đang trong quá trình đối chiếu vi lượng, cấu tạo của "${name}" gợi lên nguồn gốc từ một thời kỳ địa chất hoặc lịch sử biến động dữ dội. Sự kết tinh của nó là kết quả của hàng thế kỷ (thậm chí hàng thiên niên kỷ) chịu đựng áp suất và biến đổi tự nhiên.`,
    surface_structure: `Các dấu hiệu bào mòn và oxy hóa bề mặt cho thấy một quá trình "patina" tự nhiên vô giá. Cấu trúc của ${material} không hề sao chép được bằng công nghệ hiện đại, minh chứng cho một kỷ nguyên hình thành độc bản.`,
    story: `Vật phẩm này không đơn thuần là một mảnh vật chất. Nó là dấu ấn của thời gian vũ trụ, của sự hoang dã và vĩnh cửu. Sở hữu nó giống như nắm giữ một mảnh ghép bí mật của trái đất mà thiên nhiên đã quyết định cất giấu hàng triệu năm trước khi vươn ra ánh sáng.`,
    collector_appeal: `Giới sưu tập tinh hoa không tìm kiếm những thứ dễ dãi. Họ tìm kiếm câu chuyện và sự độc quyền tuyệt đối. "${name}" mang đầy đủ DNA của một "Holy Grail" – thứ mà khi đưa vào bộ sưu tập cá nhân, nó lập tức nâng tầm vị thế và tri thức của chủ nhân.`,
    sales_post: {
      facebook: `Có những kiệt tác sinh ra không dành cho số đông. Mẫu ${name} này đang được hệ thống của chúng tôi định giá nội bộ và dự kiến sẽ sớm xuất hiện trên radar của các nhà sưu tập tư nhân. Sự kín tiếng tạo nên đẳng cấp. #BillionaireCollection #RareArtifact`,
      tiktok: `[Visual: Cinematic slow pan qua các khối mặt cắt của vật phẩm]\n[Text]: Bạn đang chiêm ngưỡng thứ mà 99% thế giới chỉ được thấy qua màn hình.\n[Audio]: Hans Zimmer phong cách hùng tráng, sâu lắng.\n[Text]: Định giá vượt mốc tầm nhìn thông thường.`,
      auction: `Hiện vật mang mã danh dự [RESTRICTED] đang trong giai đoạn tiền thẩm định (Pre-Appraisal). Với độ hiếm ${rarity}/100, đây là cơ hội hiếm hoi cho các nhà đấu giá lớn bổ sung một tuyệt tác mang tính di sản vào danh mục Mega-Lots cuối năm.`
    }
  };
}
