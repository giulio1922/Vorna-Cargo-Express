import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, ShieldCheck, Anchor, CheckCircle2, Truck, Users, Network } from "lucide-react";

import heroImg from "./assets/hero.png";
import controlImg from "./assets/control.png";
import warehouseImg from "./assets/warehouse.png";
import fleetImg from "./assets/fleet.png";
import driverImg from "./assets/driver.png";

const queryClient = new QueryClient();

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="min-h-screen w-full bg-background font-sans overflow-hidden selection:bg-accent selection:text-secondary">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center text-white bg-secondary/80 backdrop-blur-sm">
        <div className="text-2xl font-black tracking-tighter uppercase">VORNA</div>
        <div className="hidden md:flex gap-8 font-medium text-sm uppercase tracking-widest">
          <a href="#services" className="hover:text-accent transition-colors">Servicios</a>
          <a href="#network" className="hover:text-accent transition-colors">Red</a>
          <a href="#about" className="hover:text-accent transition-colors">Nosotros</a>
          <a href="#contact" className="hover:text-accent transition-colors">Contacto</a>
        </div>
        <button className="bg-accent text-secondary px-6 py-3 font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors" data-testid="button-quote">
          Cotizar
        </button>
      </nav>

      {/* 1. Hero */}
      <section className="relative h-[100dvh] w-full flex items-end pb-20 px-6 md:px-20 overflow-hidden bg-secondary">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img src={heroImg} alt="Heavy cargo transport" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent mix-blend-multiply" />
        </motion.div>
        
        <div className="relative z-10 max-w-5xl text-white">
          <motion.p 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="text-accent font-bold tracking-widest uppercase mb-4 md:mb-6 text-sm md:text-base flex items-center gap-4"
          >
            <span className="w-12 h-[2px] bg-accent inline-block" /> Movemos confianza
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter mb-8"
          >
            En un mundo donde todo se mueve, <span className="text-accent italic">la confianza permanece.</span>
          </motion.h1>
        </div>
      </section>

      {/* 2. Intro / Stats */}
      <section className="py-24 md:py-32 px-6 md:px-20 bg-background text-secondary">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              No medimos nuestra logística en kilómetros, <br className="hidden md:block"/>sino en <span className="text-primary italic">tranquilidad.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2} className="flex flex-col justify-center">
            <p className="text-lg md:text-xl font-medium mb-12 text-primary/80 leading-relaxed">
              VORNA representa el impulso que transforma la logística tradicional en un sistema inteligente, humano y orientado al progreso. Cada entrega es una promesa cumplida. Cada ruta es una demostración de responsabilidad.
            </p>
            <div className="grid grid-cols-2 gap-8 border-t border-primary/20 pt-8">
              <div>
                <div className="text-5xl font-black text-primary mb-2">99.8%</div>
                <div className="text-sm font-bold uppercase tracking-widest text-primary/60">Entregas a tiempo</div>
              </div>
              <div>
                <div className="text-5xl font-black text-primary mb-2">24/7</div>
                <div className="text-sm font-bold uppercase tracking-widest text-primary/60">Monitoreo activo</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. Services Showcase */}
      <section id="services" className="py-24 md:py-32 px-6 md:px-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="mb-20">
            <h2 className="text-accent font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-4">
              <span className="w-12 h-[2px] bg-accent inline-block" /> Nuestras Soluciones
            </h2>
            <p className="text-4xl md:text-6xl font-bold tracking-tight">Impulsamos el progreso <br/>empresarial.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Transporte Pesado", desc: "Movilizamos carga de alto tonelaje con trazabilidad garantizada en cada trayecto.", icon: Truck },
              { title: "Gestión de Rutas", desc: "Dirección estratégica para optimizar tiempos y garantizar el cumplimiento normativo.", icon: MapPin },
              { title: "Seguridad Logística", desc: "Monitoreo en tiempo real y protocolos estrictos para la protección total de sus activos.", icon: ShieldCheck }
            ].map((service, i) => (
              <FadeIn key={i} delay={i * 0.1} className="bg-secondary/50 p-10 border border-white/10 hover:border-accent transition-colors group cursor-pointer">
                <service.icon className="w-12 h-12 text-accent mb-8 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-white/70 leading-relaxed">{service.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Infrastructure/Network */}
      <section id="network" className="py-24 md:py-32 px-6 md:px-20 bg-background text-secondary">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-4">
              <span className="w-12 h-[2px] bg-primary inline-block" /> Cobertura Nacional
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
              Una flota moderna, preparada para los desafíos del terreno ecuatoriano.
            </h3>
            <p className="text-lg text-primary/80 mb-8 leading-relaxed">
              Mantenemos una infraestructura rodante de última generación. Cada unidad es sometida a rigurosos mantenimientos preventivos para asegurar que su carga jamás se detenga por imprevistos técnicos.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-4"><Network className="text-accent bg-primary p-1 rounded-full w-8 h-8" /> <span className="font-bold">Monitoreo GPS Satelital 24/7</span></li>
              <li className="flex items-center gap-4"><Anchor className="text-accent bg-primary p-1 rounded-full w-8 h-8" /> <span className="font-bold">Capacidad para carga sobredimensionada</span></li>
            </ul>
          </FadeIn>
          <FadeIn delay={0.2} className="relative h-[600px] overflow-hidden">
            <img src={fleetImg} alt="Vorna Fleet" className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000" />
          </FadeIn>
        </div>
      </section>

      {/* 5. Image break / Quote */}
      <section className="relative h-[80vh] w-full flex items-center px-6 md:px-20 overflow-hidden bg-secondary">
        <motion.div style={{ y: yImage }} className="absolute inset-0 z-0">
          <img src={warehouseImg} alt="Logistics Warehouse" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" />
        </motion.div>
        
        <div className="relative z-10 max-w-4xl text-white">
          <FadeIn>
            <p className="text-4xl md:text-7xl font-bold leading-tight tracking-tight mb-8">
              "Trabajamos con estrategia, tecnología y compromiso para garantizar dirección en cada movimiento."
            </p>
            <div className="text-accent font-bold tracking-widest uppercase flex items-center gap-4">
              <span className="w-12 h-[2px] bg-accent inline-block" /> Nuestra Visión
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6. Human Element */}
      <section className="py-24 md:py-32 px-6 md:px-20 bg-[#e8e7e1] text-secondary">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <FadeIn className="order-2 lg:order-1 relative h-[700px] overflow-hidden">
            <img src={driverImg} alt="Professional Driver" className="w-full h-full object-cover object-top" />
          </FadeIn>
          <FadeIn className="order-1 lg:order-2">
            <Users className="w-16 h-16 text-primary mb-8" />
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
              La tecnología nos guía, pero <span className="text-primary italic">nuestra gente nos mueve.</span>
            </h2>
            <p className="text-lg text-primary/80 leading-relaxed">
              Detrás de cada ruta exitosa hay profesionales excepcionales. Invertimos continuamente en la capacitación, bienestar y seguridad de nuestros operadores y equipo de control, porque entendemos que un servicio humano y cercano es la verdadera diferencia en la logística.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 7. Values */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-20 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <img src={controlImg} alt="Logistics Control" className="w-full h-full object-cover min-h-[500px]" />
          </div>
          <div className="flex flex-col justify-center">
            <FadeIn>
              <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-4">
                <span className="w-12 h-[2px] bg-primary inline-block" /> Identidad VORNA
              </h2>
              <p className="text-4xl md:text-5xl font-bold text-secondary mb-12 tracking-tight">
                No somos un proveedor.<br/>Somos su aliado estratégico.
              </p>
              
              <div className="space-y-6">
                {[
                  "Dirección y Estrategia", 
                  "Confianza Inquebrantable", 
                  "Eficiencia Tecnológica", 
                  "Progreso Constante"
                ].map((val, i) => (
                  <div key={i} className="flex items-center gap-4 border-b border-primary/10 pb-6">
                    <CheckCircle2 className="text-primary w-6 h-6 shrink-0" />
                    <span className="text-xl font-bold text-secondary">{val}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section id="contact" className="py-32 px-6 md:px-20 bg-secondary text-white text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <FadeIn>
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">Listos para mover <br/><span className="text-accent italic">su progreso.</span></h2>
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              Transforme cómo gestiona su cadena de suministro. Combine dirección estratégica con un servicio humano y cercano.
            </p>
            <button className="bg-accent text-secondary px-10 py-5 text-lg font-black uppercase tracking-widest hover:bg-white hover:scale-105 transition-all flex items-center gap-4 mx-auto" data-testid="button-contact">
              Hablemos <ArrowRight className="w-6 h-6" />
            </button>
          </FadeIn>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="bg-[#02150D] text-white py-12 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="text-3xl font-black tracking-tighter uppercase mb-6 text-accent">VORNA</div>
            <p className="text-white/50 max-w-sm">Ecuador's most reliable and modern logistics brand, moving trust, security, and commitment.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-white/50">Contacto</h4>
            <ul className="space-y-4 font-medium">
              <li>+593 99 745 1510</li>
              <li>gabriel_martinez@vornalogistics.com</li>
              <li>Guayaquil, Ecuador</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-white/50">Legal</h4>
            <ul className="space-y-4 font-medium text-white/70">
              <li><a href="#" className="hover:text-accent">Términos de Servicio</a></li>
              <li><a href="#" className="hover:text-accent">Privacidad</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm font-medium text-white/30 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} VORNA Logistics.</p>
          <p>Movemos Confianza.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Home />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
