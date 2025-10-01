import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import VariantModel from "@/models/variant.model";

export async function GET(request) {
  try {
    await connectDatabase();
    const currVariantColor = await VariantModel.aggregate([
      { $sort: { _id: 1 } },
      {
        $group: {
          _id: "$color",
          first: {
            $first: "$_id",
          },
        },
      },
      { $sort: { first: 1 } },
      { $project: { _id: 0, color: "$_id" } },
    ]);
    if (!currVariantColor || !currVariantColor.length) {
      return response(false, 404, "Color not found");
    }
    const colors = currVariantColor.map((item) => item.color);
    return response(true, 211, "Color found", colors);
  } catch (error) {
    return errorResponse(error);
  }
}
