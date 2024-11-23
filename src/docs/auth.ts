/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: For User or Admin Auth
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login to the Apps using email and password. Session expired in 3 hours 
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             examples:
 *               example-1:
 *                 summary: Successful login
 *                 value:
 *                   message: Login successful
 *                   data: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       500:
 *         description: Server errors
 *         content:
 *           application/json:
 *             examples:
 *               validation-failed:
 *                 summary: Validation Failed
 *                 value:
 *                   error: email or password is wrong
 *               server-error:
 *                 summary: Internal server error
 *                 value:
 *                   error: Something went wrong
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - fullName
 *               - password
 *               - username
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               password:
 *                 type: string
 *                 example: "securePassword123"
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               role:
 *                 type: string
 *                 example: "user"
 *     responses:
 *       201:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 summary: Registration Success
 *                 value:
 *                   message: "registration success!"
 *                   data:
 *                     fullName: "Joann Gutkowski"
 *                     username: "Lucy_Rosenbaum41"
 *                     email: "Roy.Rolfson@hotmail.com"
 *                     roles:
 *                       - "user"
 *                     profilePicture: "user.jpg"
 *                     _id: "6740337a021f88461c09fb02"
 *                     createdAt: "2024-11-22T07:32:10.155Z"
 *                     updatedAt: "2024-11-22T07:32:10.155Z"
 *       400:
 *         description: Validation errors
 *         content:
 *           application/json:
 *             examples:
 *               invalid-input:
 *                 summary: Invalid input
 *                 value:
 *                   error: "Validation failed"
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
 * /api/auth/me:
 *   get:
 *     summary: Fetch current user's profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched user profile
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 summary: User Profile
 *                 value:
 *                   message: "success fetch user profile"
 *                   data:
 *                     _id: "6740337a021f88461c09fb02"
 *                     fullName: "Joann Gutkowski"
 *                     username: "Lucy_Rosenbaum41"
 *                     email: "Roy.Rolfson@hotmail.com"
 *                     roles:
 *                       - "user"
 *                     profilePicture: "user.jpg"
 *                     createdAt: "2024-11-22T07:32:10.155Z"
 *                     updatedAt: "2024-11-22T07:32:10.155Z"
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *         content:
 *           application/json:
 *             examples:
 *               unauthorized:
 *                 summary: Invalid Token
 *                 value:
 *                   error: "Unauthorized access"
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
 * /api/auth/update-profile:
 *   put:
 *     summary: Update current user's profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "Jane Doe"
 *               username:
 *                 type: string
 *                 example: "jane_doe"
 *               profilePicture:
 *                 type: string
 *                 example: "profile.jpg"
 *     responses:
 *       200:
 *         description: Profile successfully updated
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 summary: Update Success
 *                 value:
 *                   message: "profile updated successfully"
 *                   data:
 *                     fullName: "Jane Doe"
 *                     username: "jane_doe"
 *                     email: "Roy.Rolfson@hotmail.com"
 *                     roles:
 *                       - "user"
 *                     profilePicture: "profile.jpg"
 *                     _id: "6740337a021f88461c09fb02"
 *                     createdAt: "2024-11-22T07:32:10.155Z"
 *                     updatedAt: "2024-11-22T08:32:10.155Z"
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *         content:
 *           application/json:
 *             examples:
 *               unauthorized:
 *                 summary: Invalid Token
 *                 value:
 *                   error: "Unauthorized access"
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