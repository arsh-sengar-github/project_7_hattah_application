import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import CategoryModel from "@/models/category.model";

export async function PUT(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 410, "Unauthorized user");
    }
    await connectDatabase();
    const payload = await request.json();
    const ids = payload.ids || [];
    const deleteType = payload.deleteType;
    if (!Array.isArray(ids) || !ids.length) {
      return response(false, 401, "Invalid ID list");
    }
    const category = await CategoryModel.find({ _id: { $in: ids } }).lean();
    if (!category.length) {
      return response(false, 404, "Category not found");
    }
    if (!["SD", "RSD"].includes(deleteType)) {
      return response(false, 401, "Invalid delete operation");
    }
    if (deleteType === "SD") {
      await CategoryModel.updateMany(
        { _id: { $in: ids } },
        { $set: { deletedAt: new Date().toISOString() } }
      );
    } else {
      await CategoryModel.updateMany(
        { _id: { $in: ids } },
        { $set: { deletedAt: null } }
      );
    }
    return response(
      true,
      deleteType === "SD" ? 208 : 210,
      deleteType === "SD" ? "Category moved to trash" : "Category restored"
    );
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 410, "Unauthorized user");
    }
    await connectDatabase();
    const payload = await request.json();
    const ids = payload.ids || [];
    const deleteType = payload.deleteType;
    if (!Array.isArray(ids) || !ids.length) {
      return response(false, 401, "Invalid ID list");
    }
    const category = await CategoryModel.find({ _id: { $in: ids } }).lean();
    if (!category.length) {
      return response(false, 404, "Category not found");
    }
    if (deleteType !== "PD") {
      return response(false, 401, "Invalid delete operation");
    }
    await CategoryModel.deleteMany({ _id: { $in: ids } });
    return response(true, 209, "Category deleted");
  } catch (error) {
    return errorResponse(error);
  }
}
