import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema;
export interface Category {
    _id?: Types.ObjectId;
    name: string;
    createdAt: string;
    updatedAt: string;
}

const CategoriesSchema = new Schema<Category>(
    {
        name: {
            type: Schema.Types.String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const CategoriesModel = mongoose.model("Categories", CategoriesSchema);

export default CategoriesModel;
