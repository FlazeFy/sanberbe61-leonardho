import { Types } from "mongoose";
import OrderModel, { Order } from "../models/order.model";

export const create = async (payload: Order): Promise<Order> => {
    const result = await OrderModel.create(payload);
    return result;
};

export const findWaitingPaymentOrderByUserId = async (user_id: Types.ObjectId): Promise<boolean> => {
    const exists = await OrderModel.exists({ 
        createdBy: user_id,
        status: 'pending'
    })
    return !!exists
};