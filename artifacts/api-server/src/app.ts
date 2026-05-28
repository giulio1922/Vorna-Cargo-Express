import express from "express";
import * as corsModule from "cors";
import * as pinoHttpModule from "pino-http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cors = (corsModule as any).default ?? corsModule;
const pinoHttp = (pinoHttpModule as any).default ?? pinoHttpModule;

const app = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req: any) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: any) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

if (process.env.NODE_ENV !== "development" && !process.env.VERCEL) {
  const frontendDistPath = path.join(__dirname, "../../vorna-website/dist");
  app.use(express.static(frontendDistPath));

  app.get("*", (req: any, res: any) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

export default app;
