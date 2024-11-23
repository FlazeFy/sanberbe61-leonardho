import { Request, Response } from "express";
import { OrderStatus, Order, OrderUpdateGrandTotal, OrderUpdateStatus } from "../models/order.model";
import { findWaitingPaymentOrderByUserId, create, updateOrder, findAllOrOne } from "../services/order.service";
import { Product } from "../models/products.model";
import { findProductToOrder, createOrderDetail, findOrderDetailByOrderId, deleteOrderDetailByOrderId } from "../services/order_detail.service";
import { IRequestWithUser } from "../middlewares/auth.middleware";
import { OrderDetail } from "../models/order_detail.model";
import { updateProduct, findOne } from "../services/product.service";
import { me } from "../services/auth.service";
import { Types } from "mongoose";
import { IPaginationQuery } from "../utils/interfaces";
import { sendEmail } from "../mailers/mailer";
import path from "path";
import ejs from "ejs";

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
                        const list_item = req.body.orderItems
                        let msg = "Success create order"
                        if(list_item != null && Array.isArray(list_item)){
                            msg += ". with item "
                            let list_founded_product = []
                            for (const el of list_item) {
                                const product_id = el.product_id
                                const qty = el.qty
                            
                                const check_product = await findProductToOrder(product_id, qty)
                            
                                if (check_product.exist) {
                                    if (check_product.qty > 0 && check_product.price) {
                                        const order_id = order._id
                                        const order_detail_data: OrderDetail = {
                                            productId: product_id,
                                            orderId: new Types.ObjectId(order_id),
                                            qty: qty,
                                            subTotal: qty * check_product.price
                                        };
                            
                                        const order_detail = await createOrderDetail(order_detail_data)
                                        if (order_detail && order_id) {
                                            msg += `${check_product.name}, `
                                            list_founded_product.push({
                                                name : check_product.name,
                                                qty : qty,
                                                price : check_product.price
                                            })

                                            // Update product avaiablity
                                            const remaining_stock = check_product.qty - qty
                                            const remaining_product: Product = {
                                                qty: remaining_stock
                                            }
                                            const update_product = await updateProduct(product_id,remaining_product)
                                            if(update_product){
                                                // Update order
                                                const order_details = await findOrderDetailByOrderId(order_id.toString())
                                                const grandTotal = order_details.reduce((total, el) => total + el.subTotal, 0)
                                                const order_data: OrderUpdateGrandTotal = { grandTotal: grandTotal };
                            
                                                const order = await updateOrder(order_id.toString(),order_data)
                                            } 
                                        }
                                    }
                                }
                            }

                            // Mailer receipt
                            const user = await me(user_id.toString())
                            if(user && user.email){
                                // Render EJS template
                                const templatePath = path.join(__dirname, "../mailers/invoice.ejs");
                                const orderDetails = list_founded_product.map((item: any) => ({
                                    name: item.name,
                                    quantity: item.qty,
                                    price: item.price,
                                    total: item.qty * item.price,
                                }));
                                const grandTotal = orderDetails.reduce((sum, item) => sum + item.total, 0);

                                const emailHtml = await ejs.renderFile(templatePath, {
                                    customerName: user.fullName,
                                    orderItems: orderDetails,
                                    grandTotal,
                                    contactEmail: "newbie8801@gmail.com",
                                    companyName: "Sanbercode",
                                    year: new Date().getFullYear(),
                                });

                                // Send Email
                                await sendEmail(
                                    user.email,
                                    "Order Receipt",
                                    "Thank you for your order!",
                                    emailHtml
                                );
                            }
                        }

                        res.status(201).json({
                            data: order,
                            message: msg,
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
                const order_id = req.params.order_id
                
                // Validation : Check if any product exist and have enough quantity
                const check_product = await findProductToOrder(product_id,qty)
                if(check_product.exist){
                    if(check_product.qty > 0 && check_product.price){
                        // Order declaration
                        const order_detail_data: OrderDetail = {
                            productId: product_id,
                            orderId: new Types.ObjectId(order_id),
                            qty: qty,
                            subTotal: qty * check_product.price 
                        };

                        const order_detail = await createOrderDetail(order_detail_data)
                        if(order_detail){
                            // Update product avaiablity
                            const remaining_stock = check_product.qty - qty
                            const remaining_product: Product = {
                                qty: remaining_stock
                            }
                            const update_product = await updateProduct(product_id,remaining_product)
                            if(update_product){
                                // Update order
                                const order_details = await findOrderDetailByOrderId(order_id)
                                const grandTotal = order_details.reduce((total, el) => total + el.subTotal, 0)
                                const order_data: OrderUpdateGrandTotal = { grandTotal: grandTotal };
            
                                const order = await updateOrder(order_id,order_data)
                                res.status(201).json({
                                    data: {
                                        order : order,
                                        items : order_detail
                                    },
                                    message: order ? "Success create order" : "Success create order. but failed to update order",
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
    async getMyOrderHistory(req: IRequestWithUser, res: Response) {
        try {
            const user_id = req.user?.id;
            if(user_id === undefined){
                res.status(401).json({
                    data: null,
                    message: "Unauthorized",
                });
            } else {
                const user_id_str = user_id.toString()
                const order_id = req.params.order_id
                const { limit = 1, page = 1 } = req.query as unknown as IPaginationQuery;
                const result = await findAllOrOne(user_id_str, order_id, limit, page);
                res.status(200).json({
                    data: result[0],
                    message: "Success get order",
                });
            }
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed get order",
            });
        }
    },
    async getAllOrderHistory(req: IRequestWithUser, res: Response) {
        try {
            const user_id = req.user?.id;
            if(user_id === undefined){
                res.status(401).json({
                    data: null,
                    message: "Unauthorized",
                });
            } else {
                const user_id_str = user_id.toString()
                const { limit = 10, page = 1 } = req.query as unknown as IPaginationQuery;
                const user = await me(user_id_str)
                const result = await findAllOrOne(user.roles[0] == 'user' ? user_id_str : null, null, limit, page);
                res.status(200).json({
                    data: result,
                    message: "Success get all order",
                });
            }
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed get order",
            });
        }
    },
    async updateOrderStatus(req: IRequestWithUser, res: Response) {
        try {
            const user_id = req.user?.id;
            if(user_id === undefined){
                res.status(401).json({
                    data: null,
                    message: "Unauthorized",
                });
            } else {
                const user_id_str = user_id.toString()
                const order_id = req.params.order_id
                const status = req.body.status
                const order = await findAllOrOne(user_id_str,order_id,1,1);
                if(status == 'cancelled'){
                    const order_data: OrderUpdateStatus = { status: status };
                    const order_update = await updateOrder(order_id,order_data)
                    if(order_update){
                        const order_detail = await findOrderDetailByOrderId(order_id)
                        if(order_detail.length > 0){
                            for (const el of order_detail) {
                                const product_id = el.productId.toString()
                                const product = await findOne(product_id)
                                console.log(product)
                                if(product){
                                    const remaining_stock = el.qty + product?.qty
                                    const remaining_product: Product = {
                                        qty: remaining_stock
                                    }
                                    await updateProduct(product_id,remaining_product)
                                }
                            }
                        }
                        const order_detail_delete = await deleteOrderDetailByOrderId(order_id)
                        res.status(200).json({
                            message: order_detail_delete ? "Success cancelled the order" : "Success cancelled the order but failed to remove the items",
                        });
                    } else {
                        res.status(500).json({
                            data: null,
                            message: "Failed to cancelled the order",
                        });
                    }
                } else if(status == 'completed'){
                    const order_details = await findOrderDetailByOrderId(order_id)
                    if(order_details.length > 0){
                        const order_data: OrderUpdateStatus = { status: status };
                        const order_update = await updateOrder(order_id,order_data)
                        res.status(order_update ? 200 : 500).json({
                            message: order_update ? "Success completed the order" :  "Failed to compeleted the order",
                        });
                    } else {
                        res.status(404).json({
                            data: null,
                            message: "This order is empty. You can checkout if at least one product on the cart",
                        });
                    }
                } else {
                    res.status(422).json({
                        data: null,
                        message: "Status invalid",
                    });
                }
            }
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed update order",
            });
        }
    },
};
