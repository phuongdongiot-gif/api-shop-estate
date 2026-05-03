import ServiceBookingModuleService from "./service"
import { Module } from "@medusajs/framework/utils"

// Định nghĩa key của module để dùng trong container
export const SERVICE_BOOKING_MODULE = "serviceBookingModuleService"

export default Module(SERVICE_BOOKING_MODULE, {
  service: ServiceBookingModuleService,
})
