import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import VariantModel from "@/models/variant.model";

export async function GET(request) {
  try {
    await connectDatabase();
    const currVariantSize = await VariantModel.aggregate([
      { $sort: { _id: 1 } },
      {
        $group: {
          _id: "$size",
          first: {
            $first: "$_id",
          },
        },
      },
      { $sort: { first: 1 } },
      { $project: { _id: 0, size: "$_id" } },
    ]);
    if (!currVariantSize || !currVariantSize.length) {
      return response(false, 404, "Size not found");
    }
    const sizes = currVariantSize.map((item) => item.size);
    return response(true, 211, "Size found", sizes);
  } catch (error) {
    return errorResponse(error);
  }
}
