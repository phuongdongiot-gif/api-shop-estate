import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { SERVICE_BOOKING_MODULE } from "../../../modules/service-booking"
import ServiceBookingModuleService from "../../../modules/service-booking/service"

/**
 * GET /admin/bookings - Admin: Xem tất cả bookings với filter
 * POST /admin/bookings - Admin: Tạo booking thủ công
 */

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const bookingService: ServiceBookingModuleService = req.scope.resolve(SERVICE_BOOKING_MODULE)

  const { status, service_type, limit = "50", offset = "0" } = req.query as Record<string, string>
  const filters: Record<string, any> = {}

  if (status) filters.status = status
  if (service_type) filters.service_type = service_type

  const [bookings, count] = await bookingService.listAndCountServiceBookings(filters, {
    take: parseInt(limit),
    skip: parseInt(offset),
    order: { created_at: "DESC" },
  })

  return res.json({
    bookings,
    count,
    limit: parseInt(limit),
    offset: parseInt(offset),
  })
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const bookingService: ServiceBookingModuleService = req.scope.resolve(SERVICE_BOOKING_MODULE)

  const booking = await bookingService.createServiceBookings(req.body as any)
  return res.status(201).json({ booking })
}
