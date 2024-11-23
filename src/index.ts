import express from "express";
import db from "./utils/database";
import routes from "./routes/api";
import bodyParser from "body-parser";
import { swaggerUi, specs } from './docs/swagger'
const PORT = 3000;

async function init() {
  try {
    await db();
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
    app.use("/api", routes);

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
