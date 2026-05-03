/**
 * Seed Script: Tạo dữ liệu mẫu cho Alize Đà Nẵng
 * Chạy: npx ts-node seed-alize.ts
 * 
 * Tạo:
 * - Categories (Dịch vụ BĐS, Nội thất, Trang trí, Sửa chữa)
 * - Products mẫu cho từng category
 * - Viet Nam region với VND currency
 */

import Medusa from "@medusajs/js-sdk"

const medusa = new Medusa({
  baseUrl: "http://localhost:9000",
  auth: {
    type: "session",
  },
})

const ADMIN_EMAIL = "admin@alize-danang.com"
const ADMIN_PASSWORD = "AlizeDaNang2026!"

async function seedData() {
  console.log("🌱 Bắt đầu seed dữ liệu Alize Đà Nẵng...")

  // 1. Login
  await medusa.auth.login("user", "emailpass", {
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  })
  console.log("✅ Đã đăng nhập admin")

  // 2. Tạo Product Categories
  const categories = [
    {
      name: "Dịch Vụ BĐS",
      handle: "dich-vu-bds",
      description: "Các gói dịch vụ bất động sản chuyên nghiệp",
      is_active: true,
    },
    {
      name: "Gói Tư Vấn",
      handle: "goi-tu-van",
      description: "Các gói tư vấn mua bán và cho thuê BĐS",
      is_active: true,
    },
    {
      name: "Nội Thất & Trang Trí",
      handle: "noi-that-trang-tri",
      description: "Sản phẩm nội thất và trang trí cao cấp cho không gian sống",
      is_active: true,
    },
    {
      name: "Sửa Chữa & Cải Tạo",
      handle: "sua-chua-cai-tao",
      description: "Dịch vụ sửa chữa, cải tạo và renovation nhà ở",
      is_active: true,
    },
    {
      name: "Thiết Kế Nội Thất",
      handle: "thiet-ke-noi-that",
      description: "Dịch vụ thiết kế và thi công nội thất theo yêu cầu",
      is_active: true,
    },
  ]

  console.log("📁 Tạo product categories...")
  const createdCategories: Record<string, string> = {}

  for (const cat of categories) {
    try {
      const { product_category } = await medusa.admin.productCategory.create(cat)
      createdCategories[cat.handle] = product_category.id
      console.log(`  ✅ ${cat.name}: ${product_category.id}`)
    } catch (err: any) {
      console.log(`  ⚠️ ${cat.name}: Đã tồn tại hoặc lỗi - ${err.message}`)
    }
  }

  // 3. Tạo Products mẫu
  const products = [
    // ---- GÓI TƯ VẤN ----
    {
      title: "Gói Tư Vấn Mua BĐS Premium",
      handle: "goi-tu-van-mua-bds-premium",
      description: "Gói tư vấn toàn diện cho khách hàng muốn mua BĐS tại Đà Nẵng. Bao gồm: phân tích thị trường, đánh giá pháp lý, thương lượng giá, hỗ trợ ký hợp đồng.",
      status: "published",
      variants: [
        { title: "1 Tháng", prices: [{ amount: 2000000, currency_code: "vnd" }] },
        { title: "3 Tháng", prices: [{ amount: 5000000, currency_code: "vnd" }] },
        { title: "6 Tháng", prices: [{ amount: 8000000, currency_code: "vnd" }] },
      ],
    },
    {
      title: "Gói Quản Lý Cho Thuê",
      handle: "goi-quan-ly-cho-thue",
      description: "Dịch vụ quản lý bất động sản cho thuê chuyên nghiệp. Tìm khách thuê, thu tiền thuê, bảo trì định kỳ, báo cáo doanh thu hàng tháng.",
      status: "published",
      variants: [
        { title: "3 Tháng", prices: [{ amount: 3000000, currency_code: "vnd" }] },
        { title: "6 Tháng", prices: [{ amount: 5500000, currency_code: "vnd" }] },
        { title: "12 Tháng", prices: [{ amount: 9000000, currency_code: "vnd" }] },
      ],
    },
    // ---- SỬA CHỮA & DECO ----
    {
      title: "Gói Sơn Sửa Căn Hộ",
      handle: "goi-son-sua-can-ho",
      description: "Dịch vụ sơn lại toàn bộ nội thất căn hộ, bao gồm tường, trần, cửa. Sử dụng sơn Dulux cao cấp, bảo hành 2 năm.",
      status: "published",
      variants: [
        { title: "Căn hộ 1PN (40-60m²)", prices: [{ amount: 8000000, currency_code: "vnd" }] },
        { title: "Căn hộ 2PN (70-90m²)", prices: [{ amount: 12000000, currency_code: "vnd" }] },
        { title: "Căn hộ 3PN (100-130m²)", prices: [{ amount: 18000000, currency_code: "vnd" }] },
      ],
    },
    {
      title: "Gói Thiết Kế Nội Thất 2D/3D",
      handle: "goi-thiet-ke-noi-that",
      description: "Thiết kế nội thất trọn gói 2D và 3D, bao gồm bản vẽ kỹ thuật, phối màu, tư vấn vật liệu và thi công.",
      status: "published",
      variants: [
        { title: "Gói Basic (Bản vẽ 2D)", prices: [{ amount: 5000000, currency_code: "vnd" }] },
        { title: "Gói Premium (2D+3D Render)", prices: [{ amount: 12000000, currency_code: "vnd" }] },
        { title: "Gói Luxury (Thi công trọn gói)", prices: [{ amount: 50000000, currency_code: "vnd" }] },
      ],
    },
    // ---- NỘI THẤT TRANG TRÍ ----
    {
      title: "Sofa Luxury Minimalist",
      handle: "sofa-luxury-minimalist",
      description: "Sofa da thật nhập khẩu Italy, thiết kế tối giản sang trọng, phù hợp cho căn hộ cao cấp Alize Đà Nẵng. Khung gỗ sồi Mỹ, đệm foam mật độ cao.",
      status: "published",
      variants: [
        { title: "2 Chỗ (Trắng ngà)", prices: [{ amount: 15000000, currency_code: "vnd" }] },
        { title: "3 Chỗ (Trắng ngà)", prices: [{ amount: 22000000, currency_code: "vnd" }] },
        { title: "L-Shape (Xám tro)", prices: [{ amount: 35000000, currency_code: "vnd" }] },
      ],
    },
    {
      title: "Đèn Trần Decor Nordic",
      handle: "den-tran-decor-nordic",
      description: "Đèn trần phong cách Bắc Âu, khung nhôm mạ vàng, chao mây sữa, ánh sáng ấm 3000K. Phù hợp phòng khách và phòng ngủ.",
      status: "published",
      variants: [
        { title: "Đường kính 40cm", prices: [{ amount: 2500000, currency_code: "vnd" }] },
        { title: "Đường kính 60cm", prices: [{ amount: 4000000, currency_code: "vnd" }] },
        { title: "Đường kính 80cm", prices: [{ amount: 6500000, currency_code: "vnd" }] },
      ],
    },
    {
      title: "Tranh Tường Canvas Đà Nẵng",
      handle: "tranh-tuong-canvas-da-nang",
      description: "Bộ tranh canvas phong cảnh Đà Nẵng: cầu Rồng, biển Mỹ Khê, bán đảo Sơn Trà. In UV bảo vệ màu sắc, khung gỗ thông cao cấp.",
      status: "published",
      variants: [
        { title: "Bộ 2 tấm 40x60cm", prices: [{ amount: 1200000, currency_code: "vnd" }] },
        { title: "Bộ 3 tấm 40x60cm", prices: [{ amount: 1800000, currency_code: "vnd" }] },
        { title: "1 tấm lớn 80x120cm", prices: [{ amount: 2500000, currency_code: "vnd" }] },
      ],
    },
    {
      title: "Bộ Chăn Ga Gối Cotton Luxury",
      handle: "bo-chan-ga-goi-cotton-luxury",
      description: "Chăn ga gối cotton Ai Cập 1000 thread count, cảm giác mềm mại và thoáng mát, màu sắc thanh lịch phù hợp nội thất cao cấp.",
      status: "published",
      variants: [
        { title: "Single (1.2m)", prices: [{ amount: 2800000, currency_code: "vnd" }] },
        { title: "Double (1.6m)", prices: [{ amount: 4200000, currency_code: "vnd" }] },
        { title: "Queen (1.8m)", prices: [{ amount: 5500000, currency_code: "vnd" }] },
      ],
    },
  ]

  console.log("\n📦 Tạo sản phẩm mẫu...")
  for (const product of products) {
    try {
      const { product: created } = await medusa.admin.product.create(product as any)
      console.log(`  ✅ ${created.title}: ${created.id}`)
    } catch (err: any) {
      console.log(`  ⚠️ ${product.title}: ${err.message}`)
    }
  }

  console.log("\n✨ Seed hoàn tất! Bật Medusa server: npx medusa develop")
  console.log("🌐 Admin panel: http://localhost:9000/app")
  console.log(`🔑 Login: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`)
}

seedData().catch(console.error)
