import swaggerJsdoc, { Options } from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Final Project Sanbercode (NodeJS)',
            version: '1.0.0',
            description: 'API Documentation for Sanbercode NodeJS Bootcamp Final Project Batch 61. By Leonardho R Sitanggang',
            contact: {
                name: 'Developer Support',
                email: 'flazen.edu@gmail.com',
            },
        },
    },
    apis: [
        './src/docs/*.ts',
    ],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
