export function generateMockAnalysis(body: any) {
  const name = body.name || "Bảo vật vô danh";
  const material = body.material || "Chất liệu quý hiếm";
  
  // Random rarity between 85 and 99 for premium feel
  const rarity = Math.floor(Math.random() * 15) + 85; 
  
  return {
    valuation: "Đang Cập Nhật Ước Tính Nội Bộ...",
    rarity_score: rarity,
    age: "Cần giám định đồng vị phóng xạ / Carbon-14 thêm",
    origin_analysis: "Ngay cả khi quy trình phân tích tự động tạm gián đoạn do lưu lượng siêu nạp, cấu trúc của tuyệt tác này vẫn toát lên một nguồn gốc bí ẩn, mang đậm hơi thở của những kỹ tác nhân loại hoặc tự nhiên vĩ đại.",
    analysis: `Trung tâm thẩm định chuyên sâu đang đưa vật phẩm "${name}" làm từ "${material}" vào quy trình phân tích độc lập. Giao diện trực quan xác nhận đây là một hiện vật sở hữu phẩm chất vượt thời gian, xứng đáng với sự chờ đợi khắt khe nhất của giới tinh hoa.`,
    story: "Trong thế giới xa xỉ, những tuyệt tác đích thực đôi khi đòi hỏi sự kiên nhẫn. Sự gián đoạn tức thời của trí tuệ nhân tạo chỉ làm tăng thêm phần bí ẩn và giá trị vượt thời gian của báu vật rực rỡ này.",
    collector_appeal: "Bất chấp việc hệ thống lượng tử đang bận rộn với các siêu phẩm khác, các nhà sưu tập lão lõi hiểu rằng những vật phẩm mang khí chất này luôn thu hút những ánh nhìn khao khát từ giới mộ điệu trên toàn cầu.",
    sales_post: {
      facebook: "Sự bí ẩn làm nên đẳng cấp. Chờ đón sự xuất hiện của một tuyệt tác vượt mọi ranh giới phân tích thông thường. Dành cho những vị khách không thỏa hiệp với sự tầm thường. #Luxury #Masterpiece",
      tiktok: "[Visual: Slow pan qua vật phẩm]\n[Text]: Khi cả hệ thống AI tối tân nhất cũng phải nín thở đo góc độ.\n[Audio]: Nhạc classic cực chill.\nBạn sẵn sàng cho siêu phẩm này chưa?",
      auction: "Phiên bản giới hạn đang trong quy trình xác thực bổ sung tại các phòng lab chuyên biệt. Một tác phẩm nghệ thuật, một di sản đang chờ định giá cuối cùng từ giới siêu giàu."
    }
  };
}
