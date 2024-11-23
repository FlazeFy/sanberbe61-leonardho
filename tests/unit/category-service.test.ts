import mongoose from "mongoose";
import CategoryModel, { Category } from "../../src/models/category.model";
import { create, findAll, findOne, update, remove } from "../../src/services/category.service";
import { query } from "express";

jest.mock("../../src/models/category.model");

describe("Test Category Service", () => {  
    const mockCategory: Category = {
        _id: new mongoose.Types.ObjectId(), 
        name: "Category A",
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
    };

    test("1. POST - Create Category (POSITIVE CASE)", async () => {
        (CategoryModel.create as jest.Mock).mockResolvedValue(mockCategory)
        const result = await create(mockCategory)

        // Assertions
        console.log(`Result: ${JSON.stringify(result, null, 2)}\nExpected: ${JSON.stringify(mockCategory, null, 2)}`)
        expect(result?._id).toBe(mockCategory._id)
        expect(result?.name).toBe(mockCategory.name)
        expect(result?.createdAt).toBe(mockCategory.createdAt)
        expect(result?.updatedAt).toBe(mockCategory.updatedAt)
        expect(CategoryModel.create).toHaveBeenCalledWith(mockCategory)
    });

    test("2. GET - Find one Category by ID (POSITIVE CASE)", async () => {
        const validCategoryId = new mongoose.Types.ObjectId();
        const mockCategoryWithValidId: Category = {
            _id: validCategoryId, 
            name: "Category A",
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
        };
        (CategoryModel.findById as jest.Mock).mockResolvedValue(mockCategoryWithValidId)
        const result = await findOne(validCategoryId.toString())

        // Assertions
        console.log(`Result: ${JSON.stringify(result, null, 2)}\nExpected: ${JSON.stringify(mockCategoryWithValidId, null, 2)}`)
        expect(result?._id).toBe(mockCategoryWithValidId._id)
        expect(result?.name).toBe(mockCategoryWithValidId.name)
        expect(CategoryModel.findById).toHaveBeenCalledWith(validCategoryId.toString())
    });

    test("3. PUT - Update Category By ID (POSITIVE CASE)", async () => {
        const updatedCategory: Category = {
            _id: mockCategory._id,
            name: "Updated Category A",
            createdAt: mockCategory.createdAt,
            updatedAt: new Date().toString(),
        };
        (CategoryModel.findOneAndUpdate as jest.Mock).mockResolvedValue(updatedCategory)

        if(mockCategory._id) {
            const result = await update(mockCategory._id.toString(), updatedCategory)

            // Assertions
            console.log(`Result: ${JSON.stringify(result, null, 2)}\nExpected: ${JSON.stringify(updatedCategory, null, 2)}`)
            expect(result?.name).toBe(updatedCategory.name)
            expect(CategoryModel.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: mockCategory._id.toString() },
                updatedCategory,
                { new: true }
            );
        }
    });

    test("4. DELETE - Permanentally Delete Category By ID (POSITIVE CASE)", async () => {
        (CategoryModel.findOneAndDelete as jest.Mock).mockResolvedValue(mockCategory)

        if(mockCategory._id) {
            const result = await remove(mockCategory._id.toString())
            
            // Assertions
            console.log(`Result: ${JSON.stringify(result, null, 2)}\nExpected: ${JSON.stringify(mockCategory, null, 2)}`)
            expect(result?._id).toBe(mockCategory._id)
            expect(CategoryModel.findOneAndDelete).toHaveBeenCalledWith({ _id: mockCategory._id.toString() })
        }
    });
});
