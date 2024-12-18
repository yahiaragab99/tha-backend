import { Request, Response } from "express";
import { getAllCategoriesService } from "../services/category.service";
export const getItemCategories = async (req: Request, res: Response): Promise<any> => {
  try {
    const { success, message, categories } = await getAllCategoriesService();
    if (!success) {
      return res.status(404).json({ message });
    }
    res.status(200).json({
      message,
      categories,
    });
  } catch (error) {
    console.error("Error getting QR code", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
  }
};
