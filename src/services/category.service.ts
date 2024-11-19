import CategoriesModel, { Category } from "../models/category.model";

export interface IFindAll {
    query?: unknown;
    limit: number;
    page: number;
}

export const create = async (payload: Category): Promise<Category> => {
    const result = await CategoriesModel.create(payload);
    return result;
};

export const findAll = async (query: any,limit: number = 10,page: number = 1): Promise<Category[]> => {
    const result = await CategoriesModel.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });
    return result;
};

export const findOne = async (id: string): Promise<Category | null> => {
    const result = await CategoriesModel.findById(id);
    return result;
};

export const update = async (id: string, payload: Category): Promise<Category | null> => {
    const result = await CategoriesModel.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};

export const remove = async (id: string): Promise<Category | null> => {
    const result = await CategoriesModel.findOneAndDelete({
        _id: id,
    });
    return result;
};
