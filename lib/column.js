import { Chip } from "@mui/material";
import dayjs from "dayjs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import User from "@/public/assets/icons/user.png";

export const CATEGORY_TABLE_COLUMN = [
  {
    accessorKey: "fullName",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
];

export const PRODUCT_TABLE_COLUMN = [
  {
    accessorKey: "fullName",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "maximumRetailPrice",
    header: "Maximum Retail Price(MRP)",
  },
  {
    accessorKey: "sellingPrice",
    header: "Selling Price",
  },
  {
    accessorKey: "discountPercentage",
    header: "Discount Percentage(%)",
  },
];

export const VARIANT_TABLE_COLUMN = [
  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "maximumRetailPrice",
    header: "Maximum Retail Price(MRP)",
  },
  {
    accessorKey: "sellingPrice",
    header: "Selling Price",
  },
  {
    accessorKey: "discountPercentage",
    header: "Discount Percentage(%)",
  },
  {
    accessorKey: "stockKeepingUnit",
    header: "Stock Keeping Unit",
  },
];

export const COUPON_TABLE_COLUMN = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "discountPercentage",
    header: "Discount Percentage(%)",
  },
  {
    accessorKey: "minimumPurchaseAmount",
    header: "Minimum Purchase Amount",
  },
  {
    accessorKey: "validity",
    header: "Validity",
    Cell: ({ renderedCellValue }) =>
      new Date() > new Date(renderedCellValue) ? (
        <Chip
          color="error"
          label={dayjs(renderedCellValue).format("DD/MM/YYYY")}
        />
      ) : (
        <Chip
          color="success"
          label={dayjs(renderedCellValue).format("DD/MM/YYYY")}
        />
      ),
  },
];

export const ORDERS_TABLE_COLUMN = [
  {
    accessorKey: "payment_id",
    header: "Payment-ID",
  },
  {
    accessorKey: "order_id",
    header: "Order-ID",
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "emailAddress",
    header: "Email Address",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "landmark",
    header: "Landmark",
  },
  {
    accessorKey: "road",
    header: "Road",
  },
  {
    accessorKey: "house",
    header: "House",
  },
  {
    accessorKey: "personalIdentificationNumberCode",
    header: "PIN Code",
  },
  {
    accessorKey: "items",
    header: "Items",
    Cell: ({ renderedCellValue, row }) => (
      <span>{row?.original?.products?.length || 0}</span>
    ),
  },
  {
    accessorKey: "discount",
    header: "Discount",
    Cell: ({ renderedCellValue }) => (
      <span>{Math.round(renderedCellValue)}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "extraDiscount",
    header: "Extra Discount",
    Cell: ({ renderedCellValue }) => (
      <span>{Math.round(renderedCellValue)}</span>
    ),
  },
  {
    accessorKey: "payable",
    header: "Payable",
    Cell: ({ renderedCellValue }) => (
      <span>{Math.round(renderedCellValue)}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

export const CUSTOMERS_TABLE_COLUMN = [
  {
    accessorKey: "avatar",
    header: "Avatar",
    Cell: ({ renderedCellValue }) => (
      <Avatar>
        <AvatarImage src={renderedCellValue?.url || User.src} />
      </Avatar>
    ),
  },
  {
    accessorKey: "fullName",
    header: "Name",
  },
  {
    accessorKey: "emailAddress",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "isVerified",
    header: "Verified",
    Cell: ({ renderedCellValue }) =>
      renderedCellValue ? (
        <Chip color="success" label="Verified" />
      ) : (
        <Chip color="error" label="Unverfied" />
      ),
  },
];

export const REVIEW_TABLE_COLUMN = [
  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "user",
    header: "User",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "review",
    header: "Review",
  },
];
