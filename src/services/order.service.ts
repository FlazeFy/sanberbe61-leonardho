import { Types } from "mongoose";
import OrderModel, { Order, OrderUpdateGrandTotal } from "../models/order.model";

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

export const updateOrder = async (
    id: string,
    payload: Order | OrderUpdateGrandTotal
): Promise<Order | OrderUpdateGrandTotal | null> => {
    const result = await OrderModel.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return result;
};

export const findAllOrOne = async (
    user_id: string | null,
    order_id: string| null,
    limit: number = 10,
    page: number = 1
): Promise<Order[]> => {
    const query: any = {}
    if (user_id) query.createdBy = user_id
    if (order_id) query._id = order_id

    const result = await OrderModel.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .populate("createdBy");
    
    return result;
};