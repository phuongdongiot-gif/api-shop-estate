import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { SERVICE_BOOKING_MODULE } from "../../../../modules/service-booking"
import ServiceBookingModuleService from "../../../../modules/service-booking/service"

/**
 * GET /store/bookings/:id - Lấy chi tiết một booking
 */

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const bookingService: ServiceBookingModuleService = req.scope.resolve(SERVICE_BOOKING_MODULE)
  const { id } = req.params

  const booking = await bookingService.retrieveServiceBooking(id)

  if (!booking) {
    return res.status(404).json({ error: "Booking không tồn tại" })
  }

  return res.json({ booking })
}
