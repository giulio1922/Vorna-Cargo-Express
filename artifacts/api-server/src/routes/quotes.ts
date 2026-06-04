import { Router } from "express";
import { desc, db, quoteRequestsTable } from "@workspace/db";
import { SubmitQuoteBody } from "@workspace/api-zod";
import { Resend } from "resend";

const resend = new Resend("re_5jd64ipE_9icnzPTwUgofSoWRPT21QHhd");

const router = Router();

/*
router.get("/quotes", async (req: any, res: any): Promise<void> => {
  const rows = await db
    .select()
    .from(quoteRequestsTable)
    .orderBy(desc(quoteRequestsTable.createdAt));

  req.log.info({ count: rows.length }, "Listed quote requests");
  res.json(rows);
});
*/

router.post("/quotes", async (req: any, res: any): Promise<void> => {
  const parsed = SubmitQuoteBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  /*
  const [row] = await db
    .insert(quoteRequestsTable)
    .values(parsed.data)
    .returning({ id: quoteRequestsTable.id });
  */

  try {
    await resend.emails.send({
      from: 'Vorna Logistics <noreply@vornalogistics.com>',
      to: ['manuel_martinez@vornalogistics.com', 'gabriel_martinez@vornalogistics.com'],
      subject: `Nueva Solicitud de Cotización: ${parsed.data.company}`,
      html: `
        <h2>Nueva Solicitud de Cotización</h2>
        <p><strong>Nombre:</strong> ${parsed.data.name}</p>
        <p><strong>Empresa:</strong> ${parsed.data.company}</p>
        <p><strong>Teléfono:</strong> ${parsed.data.phone}</p>
        <p><strong>Correo:</strong> ${parsed.data.email}</p>
        <p><strong>Origen:</strong> ${parsed.data.origin}</p>
        <p><strong>Destino:</strong> ${parsed.data.destination}</p>
        <p><strong>Tipo de Carga:</strong> ${parsed.data.cargoType}</p>
        <p><strong>Mensaje:</strong> ${parsed.data.message || 'N/A'}</p>
      `
    });
  } catch (error) {
    req.log.error({ error }, "Failed to send email with Resend");
  }

  req.log.info("Quote request received and email sent");

  res.status(201).json({ message: "Solicitud recibida. Nos pondremos en contacto pronto." });
});

export default router;
