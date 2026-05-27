import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import { db } from "@workspace/db";
import { quoteRequestsTable } from "@workspace/db/schema";
import { SubmitQuoteBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/quotes", async (req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(quoteRequestsTable)
    .orderBy(desc(quoteRequestsTable.createdAt));

  req.log.info({ count: rows.length }, "Listed quote requests");
  res.json(rows);
});

router.post("/quotes", async (req, res): Promise<void> => {
  const parsed = SubmitQuoteBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [row] = await db
    .insert(quoteRequestsTable)
    .values(parsed.data)
    .returning({ id: quoteRequestsTable.id });

  req.log.info({ quoteId: row.id }, "Quote request received");

  res.status(201).json({ id: row.id, message: "Solicitud recibida. Nos pondremos en contacto pronto." });
});

export default router;
