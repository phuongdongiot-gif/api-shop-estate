import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { SERVICE_BOOKING_MODULE } from "../../../../modules/service-booking"
import ServiceBookingModuleService from "../../../../modules/service-booking/service"

/**
 * GET  /admin/bookings/:id - Lấy chi tiết booking
 * PUT  /admin/bookings/:id - Cập nhật status, ghi chú, phân công
 * DELETE /admin/bookings/:id - Xóa booking
 */

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const bookingService: ServiceBookingModuleService = req.scope.resolve(SERVICE_BOOKING_MODULE)
  const booking = await bookingService.retrieveServiceBooking(req.params.id)
  return res.json({ booking })
}

export const PUT = async (req: MedusaRequest, res: MedusaResponse) => {
  const bookingService: ServiceBookingModuleService = req.scope.resolve(SERVICE_BOOKING_MODULE)
  const { id } = req.params

  const {
    status,
    admin_notes,
    assigned_to,
    scheduled_date,
    scheduled_time,
    notes,
  } = req.body as any

  const updated = await bookingService.updateServiceBookings({
    id,
    ...(status && { status }),
    ...(admin_notes !== undefined && { admin_notes }),
    ...(assigned_to !== undefined && { assigned_to }),
    ...(scheduled_date && { scheduled_date: new Date(scheduled_date) }),
    ...(scheduled_time !== undefined && { scheduled_time }),
    ...(notes !== undefined && { notes }),
  })

  return res.json({ booking: updated })
}

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const bookingService: ServiceBookingModuleService = req.scope.resolve(SERVICE_BOOKING_MODULE)
  await bookingService.deleteServiceBookings(req.params.id)
  return res.json({ deleted: true, id: req.params.id })
}
