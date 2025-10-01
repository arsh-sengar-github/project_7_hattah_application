import { z } from "zod";

export const zSchema = z.object({
  fullName: z
    .string()
    .min(4, {
      message: "Full name must be at least 4 characters long",
    })
    .max(32, {
      message: "Full name must be at most 32 characters long",
    })
    .regex(/^[a-zA-Z\s\-_]+$/, {
      message:
        "Full name can only contain letters, spaces, hyphens and underscores",
    }),
  emailAddress: z.string().email({
    message: "Invalid email address",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(64, {
      message: "Password must be at most 64 characters long",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
  otp: z.string().regex(/^\d{6}$/, {
    message: "OTP must be a 6-digit number",
  }),
  _id: z.string().min(4, "ID must be at least 4 characters long"),
  alt: z.string().min(4, "Alternate name must be at least 4 characters long"),
  title: z.string().min(4, "Title must be at least 4 characters long"),
  slug: z.string().min(4, "Slug must be at least 4 characters long"),
  category: z.string().min(4, "Category must be at least 4 characters long"),
  description: z
    .string()
    .min(4, "Description must be at least 4 characters long"),
  maximumRetailPrice: z.union([
    z.number().positive("Maximum retail price must be a positive number"),
    z
      .string()
      .transform((value) => Number(value))
      .refine(
        (value) => !isNaN(value) && value > 0,
        "Maximum retail price must be a positive number"
      ),
  ]),
  sellingPrice: z.union([
    z.number().positive("Selling price must be a positive number"),
    z
      .string()
      .transform((value) => Number(value))
      .refine(
        (value) => !isNaN(value) && value > 0,
        "Selling price must be a positive number"
      ),
  ]),
  discountPercentage: z.union([
    z
      .number()
      .min(0, "Discount percentage must be at least 0")
      .max(100, "Discount percentage must be at most 100"),
    z
      .string()
      .transform((value) => Number(value))
      .refine(
        (value) => !isNaN(value) && value >= 0 && value <= 100,
        "Discount percentage must be a number, between 0, and 100"
      ),
  ]),
  media: z.array(z.string()),
  product: z.string().min(4, "Product-ID must be at least 4 characters long"),
  color: z.string().min(2, "Color must be at least 2 characters long"),
  size: z.string().min(1, "Size must be at least 1 character long"),
  stockKeepingUnit: z
    .string()
    .min(1, "Stock Keeping Unit must be at least 1 character long"),
  code: z.string().min(3, "Code must be at least 3 characters long"),
  minimumPurchaseAmount: z.union([
    z.number().positive("Minimum purchase amount must be a positive number"),
    z
      .string()
      .transform((value) => Number(value))
      .refine(
        (value) => !isNaN(value) && value > 0,
        "Minimum purchase amount must be a positive number"
      ),
  ]),
  validity: z.coerce.date({
    required_error: "Validity date is required",
    invalid_type_error: "Validity must be a valid date",
  }),
  user: z.string().min(4, "User-ID must be at least 4 characters long"),
  rating: z.union([
    z.number().positive("Rating must be a positive number"),
    z
      .string()
      .transform((value) => Number(value))
      .refine(
        (value) => !isNaN(value) && value > 0,
        "Rating must be a positive number"
      ),
  ]),
  review: z.string().min(4, "Review must be at least 4 characters long"),
  phoneNumber: z
    .string()
    .transform((value) => value.replace(/[\s-]/g, ""))
    .refine((value) => /^\+?[1-9]\d{7,14}$/.test(value), {
      message: "Phone Number must in accordance with E.164 standards",
    }),
  country: z.string().min(4, "Country must be at least 4 characters long"),
  state: z.string().min(4, "State must be at least 4 characters long"),
  city: z.string().min(4, "City must be at least 4 characters long"),
  landmark: z.string().min(4, "Landmark must be at least 4 characters long"),
  road: z.string().min(4, "Road must be at least 4 characters long"),
  house: z.string().min(4, "House must be at least 4 characters long"),
  personalIdentificationNumberCode: z
    .string()
    .regex(
      /^\d{4,6}$/,
      "Personal Identification Number(PIN) Code must be 4 to 6 digits long"
    ),
  orderNote: z.string().optional(),
  amount: z.union([
    z.number().positive("Amount must be a positive number"),
    z
      .string()
      .transform((value) => Number(value))
      .refine(
        (value) => !isNaN(value) && value > 0,
        "Amount must be a positive number"
      ),
  ]),
  address: z.string().min(4, "Address must be at least 4 characters long"),
});
