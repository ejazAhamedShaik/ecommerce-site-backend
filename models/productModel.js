import { Schema, model } from "mongoose";

const productSchema = new Schema({
  productName: {
    type: String,
    required: [true, "Name cannot be empty"],
    unique: [true, "Name must be unique"],
    maxLength: [40, "Name is too long"],
  },
  price: {
    type: Number,
    required: [true, "Price cannot be empty"],
    validate: {
      validator: function () {
        return this.price > 0;
      },
      message: "Price cannot be negative",
    },
  },
  categories: {
    type: [String],
    required: [true, "Category is required"],
  },
  images: [String],
  averageRating: Number,
  discount: {
    type: Number,
    validate: {
      validator: function () {
        return this.discount < this.price;
      },
      message: "Discount should be less than price",
    },
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    maxLength: [200, "Description should not be greater than 200 characters"],
  },
  stock: {
    type: Number,
    required: [true, "Stock is required"],
    validate: {
      validator: function () {
        return this.stock >= 0;
      },
      message: "Stock should be greater than equal to 0",
    },
  },
  brand: {
    type: String,
    required: [true, "Product brand is required"],
  },
});

const validCategories = [
  "Electronics",
  "Clothing",
  "Furniture",
  "Stationery",
  "Accessories",
  "Travel",
  "Computers",
  "Entertainment",
  "Photography",
  "Men's Fashion",
  "Living Room",
  "Dining Room",
  "Bedroom",
  "Study Room",
];

productSchema.pre("save", function (next) {
  const invalidCategories = this.categories.filter((category) => {
    return !validCategories.includes(category);
  });

  if (invalidCategories.length)
    next(new Error(`Invalid categories ${invalidCategories.join(" ")}`));
  else next();
});

export const Product = model("Product", productSchema);
