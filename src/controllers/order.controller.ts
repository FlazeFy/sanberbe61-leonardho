import { Request, Response } from "express";
import { OrderStatus, Order } from "../models/order.model";
import { findWaitingPaymentOrderByUserId, create } from "../services/order.service";
import { ProductUpdateQty } from "../models/products.model";
import { findProductToOrder, createOrderDetail } from "../services/order_detail.service";
import { IRequestWithUser } from "../middlewares/auth.middleware";
import { OrderDetail } from "../models/order_detail.model";
import { updateProduct } from "../services/product.service";

export default {
    async createOrder(req: IRequestWithUser, res: Response) {
        try {
            const user_id = req.user?.id;
            if(user_id === undefined){
                res.status(401).json({
                    data: null,
                    message: "Unauthorized",
                });
            } else {
                // Validation : Check if any order owned by user that stil need payment
                const any_waiting_payment = await findWaitingPaymentOrderByUserId(user_id)
                if(!any_waiting_payment){
                    // Order declaration
                    const order_data: Order = {
                        grandTotal: 0,
                        status: OrderStatus.Pending, 
                        createdBy: user_id, 
                    };

                    const order = await create(order_data)
                    if(order){
                        res.status(201).json({
                            data: null,
                            message: "Success create order",
                        });
                    } else {
                        res.status(500).json({
                            data: null,
                            message: "Failed create order",
                        });
                    }
                } else {
                    res.status(409).json({
                        data: null,
                        message: "Failed to create order : There is still an order that need payment",
                    });
                }
            }
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed create order",
            });
        }
    },
    async createOrderDetail(req: IRequestWithUser, res: Response) {
        try {
            const user_id = req.user?.id;
            if(user_id === undefined){
                res.status(401).json({
                    data: null,
                    message: "Unauthorized",
                });
            } else {
                const qty = req.body.qty
                const product_id = req.body.product_id
                
                // Validation : Check if any product exist and have enough quantity
                const check_product = await findProductToOrder(product_id,qty)
                if(check_product.exist){
                    if(check_product.qty > 0 && check_product.price){
                        // Order declaration
                        const order_detail_data: OrderDetail = {
                            productId: product_id,
                            orderId: req.body.order_id,
                            qty: qty,
                            subTotal: qty * check_product.price 
                        };

                        const order = await createOrderDetail(order_detail_data)
                        if(order){
                            // Update product avaiablity
                            const remaining_stock = check_product.qty - qty
                            const remaining_product: ProductUpdateQty = {
                                qty: remaining_stock
                            }
                            const update_product = await updateProduct(product_id,remaining_product)
                            if(update_product){
                                res.status(201).json({
                                    data: null,
                                    message: "Success create order",
                                });
                            } else {
                                res.status(404).json({
                                    data: null,
                                    message: "Failed create order. Product not found",
                                });
                            }
                        } else {
                            res.status(500).json({
                                data: null,
                                message: "Failed create order",
                            });
                        }
                    } else {
                        res.status(404).json({
                            data: null,
                            message: "Failed to order : Product doesnt have enough stock to order",
                        });
                    }
                } else {
                    res.status(404).json({
                        data: null,
                        message: "Failed to order : Product not exist anymore",
                    });
                }
            }
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed create order",
            });
        }
    },
};
