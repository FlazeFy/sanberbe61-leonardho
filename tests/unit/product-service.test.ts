import mongoose from "mongoose";
import ProductModel, { Product } from "../../src/models/products.model";
import { create, findOne, updateProduct, remove } from "../../src/services/product.service";

jest.mock("../../src/models/products.model");

describe("Test Product Service", () => {  
    const mockProduct: Product = {
        _id: new mongoose.Types.ObjectId(), 
        name: "Product A",
        description: "A sample product",
        images: ["image1.jpg", "image2.jpg"],
        price: 100,
        qty: 10,
        category: new mongoose.Types.ObjectId(),
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
    };

    test("1. POST - Create Product (POSITIVE CASE)", async () => {
        (ProductModel.create as jest.Mock).mockResolvedValue(mockProduct)
        const result = await create(mockProduct);

        // Assertions
        console.log(`Result: ${JSON.stringify(result, null, 2)}\nExpected: ${JSON.stringify(mockProduct, null, 2)}`)
        expect(result?._id).toBe(mockProduct._id)
        expect(result?.name).toBe(mockProduct.name)
        expect(result?.description).toBe(mockProduct.description)
        expect(result?.images).toEqual(mockProduct.images)
        expect(result?.price).toBe(mockProduct.price)
        expect(result?.qty).toBe(mockProduct.qty)
        expect(result?.category).toBe(mockProduct.category)
        expect(ProductModel.create).toHaveBeenCalledWith(mockProduct)
    });

    test("2. GET - Find one Product by ID (POSITIVE CASE)", async () => {
        const validProductId = new mongoose.Types.ObjectId();
        const mockProductWithValidId: Product = {
            _id: validProductId,
            name: "Product A",
            description: "A sample product",
            images: ["image1.jpg", "image2.jpg"],
            price: 100,
            qty: 10,
            category: new mongoose.Types.ObjectId(),
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
        };

        (ProductModel.findById as jest.Mock).mockResolvedValue(mockProductWithValidId);
        const result = await findOne(validProductId.toString());

        // Assertions
        console.log(`Result: ${JSON.stringify(result, null, 2)}\nExpected: ${JSON.stringify(mockProductWithValidId, null, 2)}`)
        expect(result?._id).toBe(mockProductWithValidId._id)
        expect(result?.name).toBe(mockProductWithValidId.name)
        expect(result?.description).toBe(mockProductWithValidId.description)
        expect(result?.images).toEqual(mockProductWithValidId.images)
        expect(result?.price).toBe(mockProductWithValidId.price)
        expect(result?.qty).toBe(mockProductWithValidId.qty)
        expect(result?.category).toBe(mockProductWithValidId.category);
        expect(ProductModel.findById).toHaveBeenCalledWith(validProductId.toString())
    });

    test("3. PUT - Update Product By ID (POSITIVE CASE)", async () => {
        const updatedProduct: Product = {
            _id: mockProduct._id,
            name: "Updated Product A",
            description: "Updated description",
            images: ["image1.jpg", "image3.jpg"],
            price: 120,
            qty: 15,
            category: mockProduct.category,
            createdAt: mockProduct.createdAt,
            updatedAt: new Date().toString(),
        };

        (ProductModel.findOneAndUpdate as jest.Mock).mockResolvedValue(updatedProduct)

        if (mockProduct._id) {
            const result = await updateProduct(mockProduct._id.toString(), updatedProduct)

            // Assertions
            console.log(`Result: ${JSON.stringify(result, null, 2)}\nExpected: ${JSON.stringify(updatedProduct, null, 2)}`)
            expect(result?.name).toBe(updatedProduct.name)
            expect(result?.description).toBe(updatedProduct.description)
            expect(result?.images).toEqual(updatedProduct.images)
            expect(result?.price).toBe(updatedProduct.price)
            expect(result?.qty).toBe(updatedProduct.qty)
            expect(ProductModel.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: mockProduct._id.toString() },
                updatedProduct,
                { new: true }
            );
        }
    });

    test("4. DELETE - Permanently Delete Product By ID (POSITIVE CASE)", async () => {
        (ProductModel.findOneAndDelete as jest.Mock).mockResolvedValue(mockProduct)

        if (mockProduct._id) {
            const result = await remove(mockProduct._id.toString())

            // Assertions
            console.log(`Result: ${JSON.stringify(result, null, 2)}\nExpected: ${JSON.stringify(mockProduct, null, 2)}`)
            expect(result?._id).toBe(mockProduct._id)
            expect(ProductModel.findOneAndDelete).toHaveBeenCalledWith({ _id: mockProduct._id.toString() })
        }
    });
});
