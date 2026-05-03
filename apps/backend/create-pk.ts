import { ExecArgs } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";

export default async function createPublishableKey({ container }: ExecArgs) {
  const apiKeyModuleService = container.resolve(Modules.API_KEY);

  // 1. Lấy danh sách API keys hiện tại
  const apiKeys = await apiKeyModuleService.listApiKeys({ type: "publishable" });
  
  if (apiKeys.length > 0) {
    console.log("Publishable API Key already exists:", apiKeys[0].token);
    return;
  }

  // 2. Tạo API Key mới
  const newKey = await apiKeyModuleService.createApiKeys({
    title: "Storefront Key",
    type: "publishable",
    created_by: "system",
  });

  console.log("=========================================");
  console.log("NEW PUBLISHABLE API KEY CREATED:");
  console.log(newKey.token);
  console.log("=========================================");
}
