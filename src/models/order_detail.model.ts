import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema;

export interface OrderDetail {
    _id?: Types.ObjectId;
    subTotal: number;
    qty: number,
    orderId: Types.ObjectId;
    productId: Types.ObjectId;
}

const OrdersSchema = new Schema<OrderDetail>(
    {
        subTotal: {
            type: Schema.Types.Number,
            required: false,
            default: 0, 
        },
        qty: {
            type: Schema.Types.Number,
            required: true,
        },
        orderId: {
            type: Schema.Types.ObjectId,
            ref: "Orders",
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Products",
        },
    },
    {
        timestamps: true,
    }
);

const OrderModel = mongoose.model("OrdersDetails", OrdersSchema);

export default OrderModel;
