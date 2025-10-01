import { NextResponse } from "next/server";

export const response = (success, statusCode, message, data = {}) => {
  return NextResponse.json({
    success,
    statusCode,
    message,
    data,
  });
};

export const errorResponse = (error, customMessage) => {
  if (error.code === 11000) {
    const keys = Object.keys(error.keyPattern).join(", ");
    error.message = `Duplicate value for ${keys}`;
  }
  let errorObject = {};
  if (process.env.NODE_ENV === "development") {
    errorObject = {
      error,
      message: error.message,
    };
  } else {
    errorObject = {
      message: customMessage || "Something went wrong",
    };
  }
  return NextResponse.json({
    success: false,
    statusCode: 500,
    ...errorObject,
  });
};

export const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
};

export const columnConfig = (
  column,
  isCreatedAt = false,
  isUpdatedAt = false,
  isDeletedAt = false
) => {
  const newColumn = [...column];
  if (isCreatedAt) {
    newColumn.push({
      accessorKey: "createdAt",
      header: "Created At",
      Cell: ({ renderedCellValue }) =>
        new Date(renderedCellValue).toLocaleString(),
    });
  }
  if (isUpdatedAt) {
    newColumn.push({
      accessorKey: "updatedAt",
      header: "Updated At",
      Cell: ({ renderedCellValue }) =>
        new Date(renderedCellValue).toLocaleString(),
    });
  }
  if (isDeletedAt) {
    newColumn.push({
      accessorKey: "deletedAt",
      header: "Deleted At",
      Cell: ({ renderedCellValue }) =>
        new Date(renderedCellValue).toLocaleString(),
    });
  }
  return newColumn;
};

export const dashboardOrderStatus = (status) => {
  const statusColorConfig = {
    unverified: "bg-gray-500",
    pending: "bg-amber-500",
    processing: "bg-blue-500",
    shipped: "bg-indigo-500",
    delivered: "bg-green-500",
    cancelled: "bg-red-500",
  };
  return (
    <span
      className={`rounded-full px-2 py-1 capitalize text-sm text-white ${statusColorConfig[status]}`}
    >
      {status}
    </span>
  );
};
