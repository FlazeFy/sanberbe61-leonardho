/**
 * @swagger
 * tags:
 *   name: Category
 *   description: API for managing product categories
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Success get all categories
 *         content:
 *           application/json:
 *             examples:
 *               example-1:
 *                 value:
 *                   data:
 *                     - _id: "6740350d5ef42768273f1e36"
 *                       name: "Wooden"
 *                       createdAt: "2024-11-22T07:38:53.376Z"
 *                       updatedAt: "2024-11-22T07:38:53.376Z"
 *                   message: Success get all categories
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
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Wooden"
 *     responses:
 *       200:
 *         description: Success create category
 *         content:
 *           application/json:
 *             examples:
 *               example-1:
 *                 value:
 *                   data:
 *                     _id: "6740350d5ef42768273f1e36"
 *                     name: "Wooden"
 *                     createdAt: "2024-11-22T07:38:53.376Z"
 *                     updatedAt: "2024-11-22T07:38:53.376Z"
 *                   message: Success create category
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
 * /categories/{id}:
 *   get:
 *     summary: Get a single category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "673fc3fd9ded80b4fde5a141"
 *     responses:
 *       200:
 *         description: Success get one category
 *         content:
 *           application/json:
 *             examples:
 *               example-1:
 *                 value:
 *                   data:
 *                     _id: "673fc3fd9ded80b4fde5a141"
 *                     name: "Furniture"
 *                     createdAt: "2024-11-21T23:36:29.904Z"
 *                     updatedAt: "2024-11-21T23:36:29.904Z"
 *                   message: Success get one category
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
 * /categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "6740362e5ef42768273f1e3c"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Fantastic Fresh Bike"
 *     responses:
 *       200:
 *         description: Success update category
 *         content:
 *           application/json:
 *             examples:
 *               example-1:
 *                 value:
 *                   data:
 *                     _id: "6740362e5ef42768273f1e3c"
 *                     name: "Fantastic Fresh Bike"
 *                     createdAt: "2024-11-22T07:43:42.429Z"
 *                     updatedAt: "2024-11-22T07:43:42.429Z"
 *                   message: Success update category
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
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "6740362e5ef42768273f1e3c"
 *     responses:
 *       200:
 *         description: Success delete category
 *         content:
 *           application/json:
 *             examples:
 *               example-1:
 *                 value:
 *                   data:
 *                     _id: "6740362e5ef42768273f1e3c"
 *                     name: "Fantastic Fresh Bike"
 *                     createdAt: "2024-11-22T07:43:42.429Z"
 *                     updatedAt: "2024-11-22T07:43:42.429Z"
 *                   message: Success delete category
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
