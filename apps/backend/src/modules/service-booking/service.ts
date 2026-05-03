import { MedusaService } from "@medusajs/framework/utils"
import { ServiceBooking } from "./models/service-booking"

/**
 * ServiceBookingModuleService - Business logic cho module đặt lịch dịch vụ
 * Kế thừa MedusaService để có sẵn CRUD operations
 */
class ServiceBookingModuleService extends MedusaService({
  ServiceBooking,
}) {}

export default ServiceBookingModuleService
