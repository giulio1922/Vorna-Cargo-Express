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
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Nueva Solicitud de Cotización</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f3ed;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f3ed;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background-color:#032115;padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 8px 0;color:#c7e77d;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">
                      &#8212;&nbsp; Solicitud de Cotización
                    </p>
                    <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:900;letter-spacing:-0.03em;line-height:1.1;">
                      VORNA <span style="color:#c7e77d;font-style:italic;">Logistics</span>
                    </h1>
                  </td>
                  <td align="right" valign="middle">
                    <div style="width:48px;height:48px;background-color:#c7e77d;border-radius:50%;display:inline-block;"></div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Subheader -->
          <tr>
            <td style="background-color:#045035;padding:16px 40px;">
              <p style="margin:0;color:#f4f3ed;font-size:13px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;">
                Nueva solicitud recibida &mdash; ${new Date().toLocaleDateString("es-EC", { day:"2-digit", month:"long", year:"numeric" })}
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color:#ffffff;padding:40px;">

              <!-- Intro -->
              <p style="margin:0 0 32px 0;color:#032115;font-size:15px;line-height:1.6;">
                Se ha recibido una nueva solicitud de cotización de transporte a través del sitio web de VORNA. A continuación se presentan los detalles proporcionados por el cliente.
              </p>

              <!-- Section: Contacto -->
              <p style="margin:0 0 12px 0;color:#c7e77d;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;display:flex;align-items:center;gap:8px;">
                <span style="display:inline-block;width:24px;height:2px;background:#045035;vertical-align:middle;margin-right:8px;"></span>Información de contacto
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;border:1px solid #e8e7e1;border-radius:2px;overflow:hidden;">
                <tr style="background-color:#f4f3ed;">
                  <td style="padding:12px 16px;width:35%;color:#045035;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;border-bottom:1px solid #e8e7e1;">Nombre</td>
                  <td style="padding:12px 16px;color:#032115;font-size:14px;font-weight:600;border-bottom:1px solid #e8e7e1;">${name}</td>
                </tr>
                <tr style="background-color:#ffffff;">
                  <td style="padding:12px 16px;color:#045035;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;border-bottom:1px solid #e8e7e1;">Empresa</td>
                  <td style="padding:12px 16px;color:#032115;font-size:14px;font-weight:600;border-bottom:1px solid #e8e7e1;">${company}</td>
                </tr>
                <tr style="background-color:#f4f3ed;">
                  <td style="padding:12px 16px;color:#045035;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;border-bottom:1px solid #e8e7e1;">Teléfono</td>
                  <td style="padding:12px 16px;border-bottom:1px solid #e8e7e1;"><a href="tel:${phone}" style="color:#032115;font-size:14px;font-weight:600;text-decoration:none;">${phone}</a></td>
                </tr>
                <tr style="background-color:#ffffff;">
                  <td style="padding:12px 16px;color:#045035;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">Correo</td>
                  <td style="padding:12px 16px;"><a href="mailto:${email}" style="color:#045035;font-size:14px;font-weight:600;text-decoration:underline;">${email}</a></td>
                </tr>
              </table>

              <!-- Section: Logística -->
              <p style="margin:0 0 12px 0;color:#c7e77d;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">
                <span style="display:inline-block;width:24px;height:2px;background:#045035;vertical-align:middle;margin-right:8px;"></span>Detalles del envío
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;border:1px solid #e8e7e1;overflow:hidden;">
                <tr style="background-color:#f4f3ed;">
                  <td style="padding:12px 16px;width:35%;color:#045035;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;border-bottom:1px solid #e8e7e1;">Origen</td>
                  <td style="padding:12px 16px;color:#032115;font-size:14px;font-weight:600;border-bottom:1px solid #e8e7e1;">${origin}</td>
                </tr>
                <tr style="background-color:#ffffff;">
                  <td style="padding:12px 16px;color:#045035;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;border-bottom:1px solid #e8e7e1;">Destino</td>
                  <td style="padding:12px 16px;color:#032115;font-size:14px;font-weight:600;border-bottom:1px solid #e8e7e1;">${destination}</td>
                </tr>
                <tr style="background-color:#f4f3ed;">
                  <td style="padding:12px 16px;color:#045035;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">Tipo de Carga</td>
                  <td style="padding:12px 16px;">
                    <span style="display:inline-block;background-color:#032115;color:#c7e77d;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:4px 12px;">${cargoType}</span>
                  </td>
                </tr>
              </table>

              <!-- Section: Mensaje -->
              ${message ? `
              <p style="margin:0 0 12px 0;color:#c7e77d;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">
                <span style="display:inline-block;width:24px;height:2px;background:#045035;vertical-align:middle;margin-right:8px;"></span>Mensaje adicional
              </p>
              <div style="background-color:#f4f3ed;border-left:3px solid #c7e77d;padding:16px 20px;margin-bottom:28px;">
                <p style="margin:0;color:#032115;font-size:14px;line-height:1.6;">${message}</p>
              </div>
              ` : ""}

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-top:8px;">
                    <a href="mailto:${email}" style="display:inline-block;background-color:#032115;color:#c7e77d;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;padding:14px 32px;text-decoration:none;">
                      Responder al cliente &rarr;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#02150d;padding:24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px 0;color:#c7e77d;font-size:14px;font-weight:900;letter-spacing:-0.02em;text-transform:uppercase;">VORNA</p>
                    <p style="margin:0;color:rgba(244,243,237,0.4);font-size:11px;">Movemos Confianza &mdash; Guayaquil, Ecuador</p>
                  </td>
                  <td align="right" valign="middle">
                    <p style="margin:0;color:rgba(244,243,237,0.3);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;">Correo automático</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });
  } catch (error) {
    console.error("Failed to send email with Resend:", error);
  }

  res.status(201).json({ message: "Solicitud recibida. Nos pondremos en contacto pronto." });
});

export default app;
