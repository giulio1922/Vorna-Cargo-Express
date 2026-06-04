import express from "express";
import * as corsModule from "cors";
import { Resend } from "resend";

const cors = (corsModule as any).default ?? corsModule;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const resend = new Resend("re_5jd64ipE_9icnzPTwUgofSoWRPT21QHhd");

app.get("/api/health", (_req: any, res: any) => {
  res.json({ status: "ok" });
});

app.post("/api/quotes", async (req: any, res: any): Promise<void> => {
  const { name, company, phone, email, origin, destination, cargoType, message } = req.body ?? {};

  if (!name || !company || !phone || !email || !origin || !destination || !cargoType) {
    res.status(400).json({ error: "Todos los campos requeridos deben estar presentes." });
    return;
  }

  try {
    await resend.emails.send({
      from: "Vorna Logistics <noreply@vornalogistics.com>",
      to: ["manuel_martinez@vornalogistics.com", "gabriel_martinez@vornalogistics.com"],
      subject: `Nueva Solicitud de Cotización: ${company}`,
      html: `
        <h2>Nueva Solicitud de Cotización</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Empresa:</strong> ${company}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Origen:</strong> ${origin}</p>
        <p><strong>Destino:</strong> ${destination}</p>
        <p><strong>Tipo de Carga:</strong> ${cargoType}</p>
        <p><strong>Mensaje:</strong> ${message || "N/A"}</p>
      `,
    });
  } catch (error) {
    console.error("Failed to send email with Resend:", error);
  }

  res.status(201).json({ message: "Solicitud recibida. Nos pondremos en contacto pronto." });
});

export default app;
