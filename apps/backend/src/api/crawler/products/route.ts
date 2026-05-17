import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { IProductModuleService } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";

import { createProductsWorkflow, deleteProductsWorkflow, createProductCategoriesWorkflow } from "@medusajs/core-flows";

export async function POST(
  request: MedusaRequest,
  response: MedusaResponse
): Promise<void> {
  // 1. Basic Security Check using our admin token
  const authHeader = request.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.MEDUSA_ADMIN_TOKEN}`) {
    response.status(401).json({ message: "Unauthorized Custom Route" });
    return;
  }

  const payload = request.body as any;

  try {
    const productModuleService: IProductModuleService = request.scope.resolve(Modules.PRODUCT);

    // 2. Check if product already exists by handle, if so delete it so we can update it
    const existingProducts = await productModuleService.listProducts({ handle: payload.handle });
    if (existingProducts && existingProducts.length > 0) {
      await deleteProductsWorkflow(request.scope).run({
        input: { ids: [existingProducts[0].id] }
      });
    }

    // 3. Handle Categories
    const categoryIds: string[] = [];
    if (payload.category) {
      const existingCategories = await productModuleService.listProductCategories({ handle: payload.category.handle });
      
      if (existingCategories && existingCategories.length > 0) {
        categoryIds.push(existingCategories[0].id);
      } else {
        const { result: categoryResult } = await createProductCategoriesWorkflow(request.scope).run({
          input: {
            product_categories: [
              {
                name: payload.category.name,
                handle: payload.category.handle,
                is_active: true,
                is_internal: false
              }
            ]
          }
        });
        if (categoryResult && categoryResult.length > 0) {
          categoryIds.push(categoryResult[0].id);
        }
      }
    }

    // 4. Create the product using the core workflow
    const { result } = await createProductsWorkflow(request.scope).run({
      input: {
        products: [
          {
            title: payload.title,
            handle: payload.handle,
            description: payload.description,
            subtitle: payload.subtitle,
            status: payload.status,
            options: payload.options,
            variants: payload.variants,
            images: payload.images ? payload.images.map(url => ({ url })) : [],
            metadata: payload.metadata,
            category_ids: categoryIds.length > 0 ? categoryIds : undefined,
          }
        ]
      }
    });

    response.status(200).json({ product: result[0] });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}
