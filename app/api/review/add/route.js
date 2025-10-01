import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import { zSchema } from "@/lib/zodSchema";
import ReviewModel from "@/models/review.model";

export async function POST(request) {
  try {
    const auth = await isAuthenticated("user");
    if (!auth.isAuth) {
      return response(false, 410, "Unauthorized user");
    }
    await connectDatabase();
    const payload = await request.json();
    const formSchema = zSchema.pick({
      user: true,
      product: true,
      title: true,
      rating: true,
      review: true,
    });
    const validateData = formSchema.safeParse(payload);
    if (!validateData.success) {
      return response(false, 401, "Invalid data", validateData.error);
    }
    const { user, product, title, rating, review } = validateData.data;
    const newReview = new ReviewModel({
      user,
      product,
      title,
      rating,
      review,
    });
    await newReview.save();
    return response(true, 213, "Review added");
  } catch (error) {
    return errorResponse(error);
  }
}
