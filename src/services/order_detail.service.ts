import { Types } from "mongoose";
import OrderDetailModel, { OrderDetail } from "../models/order_detail.model";
import { findOne } from "../services/product.service";

export const createOrderDetail = async (payload: OrderDetail): Promise<OrderDetail> => {
    const result = await OrderDetailModel.create(payload);
    return result;
};

export const findProductToOrder = async (product_id: Types.ObjectId, qty_order: number): Promise<{ exist: boolean; qty: number, price: number | null, name: string | null}> => {
    const product = await findOne(product_id.toString())
    const exist = product ? true : false
    const qty = product ? product.qty : 0
    const price = product ? product.price : null
    const name = product ? product.name : null
    return { exist, qty, price, name }
};

export const findOrderDetailByOrderId = async (order_id: string): Promise<OrderDetail[]> => {
    const result = await OrderDetailModel.find({ orderId: order_id })
    return result
}

export const deleteOrderDetailByOrderId = async (order_id: string): Promise<{ deletedCount: number } | null> => {
    const result = await OrderDetailModel.deleteMany({ orderId: order_id });
    return result.deletedCount ? { deletedCount: result.deletedCount } : null;
};

  