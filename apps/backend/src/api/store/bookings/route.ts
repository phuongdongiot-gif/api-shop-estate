import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { SERVICE_BOOKING_MODULE } from "../../../modules/service-booking"
import ServiceBookingModuleService from "../../../modules/service-booking/service"

/**
 * GET /store/bookings - Lấy danh sách booking (by phone)
 * POST /store/bookings - Tạo booking mới từ khách hàng
 */

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const bookingService: ServiceBookingModuleService = req.scope.resolve(SERVICE_BOOKING_MODULE)
  
  const { phone, status } = req.query as Record<string, string>
  const filters: Record<string, any> = {}
  
  if (phone) filters.customer_phone = phone
  if (status) filters.status = status

  const bookings = await bookingService.listServiceBookings(filters, {
    order: { created_at: "DESC" },
  })

  return res.json({ bookings })
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const bookingService: ServiceBookingModuleService = req.scope.resolve(SERVICE_BOOKING_MODULE)

  const {
    customer_name,
    customer_phone,
    customer_email,
    service_type,
    property_id,
    property_name,
    scheduled_date,
    scheduled_time,
    notes,
    address,
    budget,
  } = req.body as any

  // Validate required fields
  if (!customer_name || !customer_phone || !service_type) {
    return res.status(400).json({
      error: "Thiếu thông tin bắt buộc: customer_name, customer_phone, service_type",
    })
  }

  // Validate service type
  const validServiceTypes = ["viewing", "consulting", "repair", "deco", "rental", "furniture"]
  if (!validServiceTypes.includes(service_type)) {
    return res.status(400).json({
      error: `service_type không hợp lệ. Các loại hỗ trợ: ${validServiceTypes.join(", ")}`,
    })
  }

  const booking = await bookingService.createServiceBookings({
    customer_name,
    customer_phone,
    customer_email: customer_email || null,
    service_type,
    property_id: property_id || null,
    property_name: property_name || null,
    scheduled_date: scheduled_date ? new Date(scheduled_date) : null,
    scheduled_time: scheduled_time || null,
    notes: notes || null,
    address: address || null,
    budget: budget ? Number(budget) : null,
    status: "pending",
  })

  return res.status(201).json({ booking })
}
