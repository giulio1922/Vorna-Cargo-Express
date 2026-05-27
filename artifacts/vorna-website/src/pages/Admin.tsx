import { useListQuotes } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Inbox, Phone, Mail, MapPin, Package, Calendar, ArrowUpRight } from "lucide-react";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("es-EC", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function Admin() {
  const { data: quotes, isLoading, error, refetch } = useListQuotes();

  return (
    <div className="min-h-screen bg-[#032115] text-white font-sans">
      {/* Header */}
      <header className="border-b border-white/10 px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="text-2xl font-black tracking-tighter text-[#c7e77d] uppercase">VORNA</span>
          <span className="text-white/30 font-medium text-sm uppercase tracking-widest">Panel de solicitudes</span>
        </div>
        <div className="flex items-center gap-4">
          {quotes && (
            <span className="bg-[#c7e77d]/10 text-[#c7e77d] border border-[#c7e77d]/30 px-3 py-1 text-xs font-bold uppercase tracking-widest">
              {quotes.length} {quotes.length === 1 ? "solicitud" : "solicitudes"}
            </span>
          )}
          <button
            onClick={() => refetch()}
            className="text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest border border-white/10 hover:border-white/30 px-4 py-2"
            data-testid="button-refresh"
          >
            Actualizar
          </button>
          <a
            href="/"
            className="text-white/40 hover:text-[#c7e77d] transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-1"
            data-testid="link-back-site"
          >
            Sitio web <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </header>

      <main className="px-8 py-10 max-w-7xl mx-auto">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-[#c7e77d] border-t-transparent rounded-full"
            />
            <p className="text-white/40 text-sm uppercase tracking-widest font-bold">Cargando solicitudes...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-32">
            <p className="text-red-400 font-bold mb-2">Error al cargar las solicitudes</p>
            <button onClick={() => refetch()} className="text-[#c7e77d] text-sm underline">Reintentar</button>
          </div>
        )}

        {!isLoading && !error && quotes?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-white/30">
            <Inbox className="w-16 h-16" />
            <p className="text-xl font-bold uppercase tracking-widest">Sin solicitudes aún</p>
            <p className="text-sm">Las solicitudes de cotización aparecerán aquí.</p>
          </div>
        )}

        {!isLoading && !error && quotes && quotes.length > 0 && (
          <div className="space-y-4">
            {quotes.map((q, i) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="bg-white/4 border border-white/10 hover:border-[#c7e77d]/40 transition-colors p-6 md:p-8"
                data-testid={`card-quote-${q.id}`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#c7e77d]/10 border border-[#c7e77d]/20 text-[#c7e77d] w-10 h-10 flex items-center justify-center font-black text-sm shrink-0">
                      #{q.id}
                    </div>
                    <div>
                      <h3 className="text-lg font-black tracking-tight text-white">{q.name}</h3>
                      <p className="text-white/50 font-medium text-sm">{q.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/30 text-xs font-bold uppercase tracking-widest shrink-0">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(q.createdAt)}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#c7e77d]/60 shrink-0" />
                    <a href={`tel:${q.phone}`} className="text-sm font-medium text-white/70 hover:text-white transition-colors" data-testid={`link-phone-${q.id}`}>{q.phone}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#c7e77d]/60 shrink-0" />
                    <a href={`mailto:${q.email}`} className="text-sm font-medium text-white/70 hover:text-white transition-colors truncate" data-testid={`link-email-${q.id}`}>{q.email}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#c7e77d]/60 shrink-0" />
                    <span className="text-sm font-medium text-white/70">{q.origin} → {q.destination}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-[#c7e77d]/60 shrink-0" />
                    <span className="text-sm font-medium text-white/70">{q.cargoType}</span>
                  </div>
                </div>

                {q.message && (
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Mensaje</p>
                    <p className="text-white/60 text-sm leading-relaxed">{q.message}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
