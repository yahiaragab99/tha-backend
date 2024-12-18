import { ItemCategory } from "../entities/itemCategory.entity";

export const getAllCategoriesService = async (): Promise<{
  success: boolean;
  message: string;
  categories?: ItemCategory[];
}> => {
  try {
    const categories = await ItemCategory.find();
    if (!categories) return { success: false, message: "Item categories not found" };
    return { success: true, message: "Item categories found", categories };
  } catch (erroe) {
    return { success: false, message: "Internal server error" };
  }
};
