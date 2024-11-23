import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema;

export enum OrderStatus {
    Pending = "pending",
    Completed = "completed",
    Cancelled = "cancelled",
}
export interface Order {
    _id?: Types.ObjectId;
    grandTotal: number;
    status: OrderStatus,
    createdBy: Types.ObjectId;
    items?: Types.ObjectId;
}
export interface OrderUpdateGrandTotal {
    grandTotal: number;
}
export interface OrderUpdateStatus {
    status: OrderStatus,
}

const OrdersSchema = new Schema<Order>(
    {
        grandTotal: {
            type: Schema.Types.Number,
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(OrderStatus),
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);
OrdersSchema.virtual("items", {
    ref: "OrdersDetails", 
    localField: "_id", 
    foreignField: "orderId", 
});

const OrderModel = mongoose.model("Orders", OrdersSchema);

export default OrderModel;
