import { model } from "@medusajs/framework/utils"

/**
 * ServiceBooking Model - Đặt lịch xem nhà, tư vấn, sửa chữa, deco
 * Lưu trữ thông tin đặt lịch dịch vụ BĐS từ khách hàng
 */
export const ServiceBooking = model.define("service_booking", {
  id: model.id().primaryKey(),

  // Thông tin khách hàng
  customer_name: model.text(),
  customer_phone: model.text(),
  customer_email: model.text().nullable(),

  // Loại dịch vụ
  // viewing = Xem nhà | consulting = Tư vấn có phí | repair = Sửa chữa
  // deco = Trang trí nội thất | rental = Hợp đồng cho thuê | furniture = Mua nội thất
  service_type: model.text(),

  // BĐS liên quan (từ NestJS backend, lưu ID dạng string)
  property_id: model.text().nullable(),
  property_name: model.text().nullable(),

  // Thời gian đặt lịch
  scheduled_date: model.dateTime().nullable(),
  scheduled_time: model.text().nullable(), // "09:00", "14:30", etc.

  // Thông tin chi tiết
  notes: model.text().nullable(),
  address: model.text().nullable(), // Địa chỉ dịch vụ (nếu sửa chữa/deco tại nhà)
  budget: model.bigNumber().nullable(), // Ngân sách ước tính (VND)

  // Trạng thái
  // pending = Chờ xác nhận | confirmed = Đã xác nhận | completed = Hoàn thành | cancelled = Đã hủy
  status: model.text().default("pending"),

  // Ghi chú nội bộ của admin
  admin_notes: model.text().nullable(),
  assigned_to: model.text().nullable(), // Tên nhân viên phụ trách
})
