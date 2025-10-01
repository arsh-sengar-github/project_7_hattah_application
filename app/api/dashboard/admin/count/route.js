import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import CategoryModel from "@/models/category.model";
import ProductModel from "@/models/product.model";
import OrderModel from "@/models/order.model";
import UserModel from "@/models/user.model";

export async function GET(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 410, "Unauthorized user");
    }
    await connectDatabase();
    const [category, product, orders, customers] = await Promise.all([
      CategoryModel.countDocuments({ deletedAt: null }),
      ProductModel.countDocuments({ deletedAt: null }),
      OrderModel.countDocuments({ deletedAt: null }),
      UserModel.countDocuments({ deletedAt: null }),
    ]);
    return response(true, 215, "Dashboard count fetched", {
      category,
      product,
      orders,
      customers,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
