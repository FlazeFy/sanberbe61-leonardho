/**
 * @swagger
 * tags:
 *   name: Product
 *   description: API for managing products
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Success get all products
 *         content:
 *           application/json:
 *             examples:
 *               example-1:
 *                 value:
 *                   data:
 *                     - _id: "6740377c5ef42768273f1e4f"
 *                       name: "Intelligent Concrete Soap"
 *                       description: "Incidunt nesciunt voluptatem porro sint recusandae..."
 *                       images: []
 *                       price: 629.7
 *                       qty: 838
 *                       category:
 *                         _id: "6740350d5ef42768273f1e36"
 *                         name: "Wooden"
 *                         createdAt: "2024-11-22T07:38:53.376Z"
 *                         updatedAt: "2024-11-22T07:38:53.376Z"
 *                       createdAt: "2024-11-22T07:49:16.053Z"
 *                       updatedAt: "2024-11-22T07:49:16.053Z"
 *                   message: Success get all products
 *       500:
 *         description: Server errors
 *         content:
 *           application/json:
 *             examples:
 *               server-error:
 *                 summary: Internal server error
 *                 value:
 *                   error: Something went wrong
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Intelligent Concrete Soap"
 *               description:
 *                 type: string
 *                 example: "Incidunt nesciunt voluptatem porro sint recusandae..."
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               price:
 *                 type: number
 *                 example: 629.7
 *               qty:
 *                 type: integer
 *                 example: 838
 *               category:
 *                 type: string
 *                 example: "6740350d5ef42768273f1e36"
 *     responses:
 *       200:
 *         description: Success create product
 *         content:
 *           application/json:
 *             examples:
 *               example-1:
 *                 value:
 *                   data:
 *                     _id: "6740377c5ef42768273f1e4f"
 *                     name: "Intelligent Concrete Soap"
 *                     description: "Incidunt nesciunt voluptatem porro sint recusandae..."
 *                     images: []
 *                     price: 629.7
 *                     qty: 838
 *                     category: "6740350d5ef42768273f1e36"
 *                     createdAt: "2024-11-22T07:49:16.053Z"
 *                     updatedAt: "2024-11-22T07:49:16.053Z"
 *                   message: Success create product
 *       500:
 *         description: Server errors
 *         content:
 *           application/json:
 *             examples:
 *               server-error:
 *                 summary: Internal server error
 *                 value:
 *                   error: Something went wrong
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "673fc42d9ded80b4fde5a144"
 *     responses:
 *       200:
 *         description: Success get one product
 *         content:
 *           application/json:
 *             examples:
 *               example-1:
 *                 value:
 *                   data:
 *                     _id: "673fc42d9ded80b4fde5a144"
 *                     name: "Chair"
 *                     description: "lorem"
 *                     images: []
 *                     price: 1000
 *                     qty: 16
 *                     category: "673fc3fd9ded80b4fde5a141"
 *                     createdAt: "2024-11-21T23:37:17.021Z"
 *                     updatedAt: "2024-11-22T04:02:20.372Z"
 *                   message: Success get one product
 *       500:
 *         description: Server errors
 *         content:
 *           application/json:
 *             examples:
 *               server-error:
 *                 summary: Internal server error
 *                 value:
 *                   error: Something went wrong
 */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "674036475ef42768273f1e40"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Licensed Wooden Table"
 *               description:
 *                 type: string
 *                 example: "Autem provident voluptas autem iure nobis..."
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               price:
 *                 type: number
 *                 example: 771.51
 *               qty:
 *                 type: integer
 *                 example: 787
 *     responses:
 *       200:
 *         description: Success update product
 *         content:
 *           application/json:
 *             examples:
 *               example-1:
 *                 value:
 *                   data:
 *                     _id: "674036475ef42768273f1e40"
 *                     name: "Licensed Wooden Table"
 *                     description: "Autem provident voluptas autem iure nobis..."
 *                     images: []
 *                     price: 771.51
 *                     qty: 787
 *                     createdAt: "2024-11-22T07:44:07.411Z"
 *                     updatedAt: "2024-11-22T07:44:07.411Z"
 *                   message: Success update product
 *       500:
 *         description: Server errors
 *         content:
 *           application/json:
 *             examples:
 *               server-error:
 *                 summary: Internal server error
 *                 value:
 *                   error: Something went wrong
 */

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "674036475ef42768273f1e40"
 *     responses:
 *       200:
 *         description: Success delete product
 *         content:
 *           application/json:
 *             examples:
 *               example-1:
 *                 value:
 *                   data:
 *                     _id: "674036475ef42768273f1e40"
 *                     name: "Licensed Wooden Table"
 *                     description: "Autem provident voluptas autem iure nobis..."
 *                     images: []
 *                     price: 771.51
 *                     qty: 787
 *                     createdAt: "2024-11-22T07:44:07.411Z"
 *                     updatedAt: "2024-11-22T07:44:07.411Z"
 *                   message: Success delete product
 *       500:
 *         description: Server errors
 *         content:
 *           application/json:
 *             examples:
 *               server-error:
 *                 summary: Internal server error
 *                 value:
 *                   error: Something went wrong
 */
