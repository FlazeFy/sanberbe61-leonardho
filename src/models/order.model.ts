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
}
export interface OrderUpdateGrandTotal {
    grandTotal: number;
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
    }
);

const OrderModel = mongoose.model("Orders", OrdersSchema);

export default OrderModel;
