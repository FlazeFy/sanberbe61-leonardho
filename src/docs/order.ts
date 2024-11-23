/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API for managing orders
 */

/**
 * @swagger
 * /api/order:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: string
 *                       example: "6740377c5ef42768273f1e4f"
 *                     qty:
 *                       type: integer
 *                       example: 3
 *     responses:
 *       200:
 *         description: Success create order
 *         content:
 *           application/json:
 *             examples:
 *               example-1:
 *                 value:
 *                   data:
 *                     grandTotal: 0
 *                     status: "pending"
 *                     createdBy: "6740337a021f88461c09fb02"
 *                     _id: "67405ba38cbdcfeacfd27e87"
 *                     createdAt: "2024-11-22T10:23:31.848Z"
 *                     updatedAt: "2024-11-22T10:23:31.848Z"
 *                     id: "67405ba38cbdcfeacfd27e87"
 *                   message: "Success create order. with item Intelligent Concrete Soap, Chair"
 *       500:
 *         description: Server errors
 *         content:
 *           application/json:
 *             examples:
 *               server-error:
 *                 value:
 *                   error: Something went wrong
 */

/**
 * @swagger
 * /api/order/{order_id}:
 *   post:
 *     summary: Add items to an order
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: string
 *           example: "67405191adce67f3378cd025"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *                 example: "6740377c5ef42768273f1e4f"
 *               qty:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Success create order item
 *         content:
 *           application/json:
 *             examples:
 *               example-1:
 *                 value:
 *                   data:
 *                     order:
 *                       _id: "67405191adce67f3378cd025"
 *                       grandTotal: 1889.1
 *                       status: "cancelled"
 *                       createdBy: "6740337a021f88461c09fb02"
 *                       createdAt: "2024-11-22T09:40:33.494Z"
 *                       updatedAt: "2024-11-22T10:09:55.583Z"
 *                       id: "67405191adce67f3378cd025"
 *                     items:
 *                       subTotal: 1889.1
 *                       qty: 3
 *                       orderId: "67405191adce67f3378cd025"
 *                       productId: "6740377c5ef42768273f1e4f"
 *                       _id: "6740587305fc7a2a25b679d3"
 *                       createdAt: "2024-11-22T10:09:55.487Z"
 *                       updatedAt: "2024-11-22T10:09:55.487Z"
 *                   message: "Success create order item"
 *       500:
 *         description: Server errors
 *         content:
 *           application/json:
 *             examples:
 *               server-error:
 *                 value:
 *                   error: Something went wrong
 */

/**
 * @swagger
 * /api/order/{order_id}:
 *   get:
 *     summary: Get order details by ID
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: string
 *           example: "67405191adce67f3378cd025"
 *     responses:
 *       200:
 *         description: Success get order details
 *         content:
 *           application/json:
 *             examples:
 *               example-1:
 *                 value:
 *                   data:
 *                     _id: "67405191adce67f3378cd025"
 *                     grandTotal: 1889.1
 *                     status: "cancelled"
 *                     createdBy:
 *                       _id: "6740337a021f88461c09fb02"
 *                       username: "Lucy_Rosenbaum41"
 *                       email: "Roy.Rolfson@hotmail.com"
 *                     createdAt: "2024-11-22T09:40:33.494Z"
 *                     updatedAt: "2024-11-22T10:09:55.583Z"
 *                     items:
 *                       - _id: "6740587305fc7a2a25b679d3"
 *                         subTotal: 1889.1
 *                         qty: 3
 *                         orderId: "67405191adce67f3378cd025"
 *                         productId:
 *                           _id: "6740377c5ef42768273f1e4f"
 *                           name: "Intelligent Concrete Soap"
 *                           category: "6740350d5ef42768273f1e36"
 *                         createdAt: "2024-11-22T10:09:55.487Z"
 *                         updatedAt: "2024-11-22T10:09:55.487Z"
 *                   message: "Success get order"
 *       500:
 *         description: Server errors
 *         content:
 *           application/json:
 *             examples:
 *               server-error:
 *                 value:
 *                   error: Something went wrong
 */

/**
 * @swagger
 * /api/order/status/{order_id}:
 *   put:
 *     summary: Update the status of an order
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: string
 *           example: "67405191adce67f3378cd025"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [cancelled, completed]
 *                 example: "cancelled"
 *     responses:
 *       200:
 *         description: Success update order status
 *         content:
 *           application/json:
 *             examples:
 *               example-1:
 *                 value:
 *                   message: "Success cancelled the order"
 *       500:
 *         description: Server errors
 *         content:
 *           application/json:
 *             examples:
 *               server-error:
 *                 value:
 *                   error: Something went wrong
 */

/**
 * @swagger
 * /api/order:
 *   get:
 *     summary: Get all order history
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Success get all orders
 *         content:
 *           application/json:
 *             examples:
 *               example-1:
 *                 value:
 *                   data:
 *                     - _id: "674033fe021f88461c09fb07"
 *                       grandTotal: 1889.1
 *                       status: "pending"
 *                       createdBy:
 *                         _id: "6740337a021f88461c09fb02"
 *                         username: "Lucy_Rosenbaum41"
 *                         email: "Roy.Rolfson@hotmail.com"
 *                       createdAt: "2024-11-22T07:34:22.136Z"
 *                       updatedAt: "2024-11-22T07:51:28.998Z"
 *                       items:
 *                         - _id: "674038005ef42768273f1e57"
 *                           subTotal: 1889.1
 *                           qty: 3
 *                           orderId: "674033fe021f88461c09fb07"
 *                           productId:
 *                             _id: "6740377c5ef42768273f1e4f"
 *                             name: "Intelligent Concrete Soap"
 *                             category: "6740350d5ef42768273f1e36"
 *                           createdAt: "2024-11-22T07:51:28.920Z"
 *                           updatedAt: "2024-11-22T07:51:28.920Z"
 *                   message: "Success get all order"
 *       500:
 *         description: Server errors
 *         content:
 *           application/json:
 *             examples:
 *               server-error:
 *                 value:
 *                   error: Something went wrong
 */
