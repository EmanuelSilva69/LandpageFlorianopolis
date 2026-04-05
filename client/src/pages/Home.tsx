import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Zap, CheckCircle2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { MapView } from "@/components/Map";
import { motion } from "framer-motion";

/**
 * Design: Minimalismo Corporativo Sofisticado - Luiz Althoff
 * Paleta: Azul Corporativo #004065, Branco, Cinza Elegante
 * Tipografia: Montserrat (títulos) + Inter (corpo)
 * Layout: Assimétrico com espaço em branco generoso
 * Identidade: Premium, elegante, confiável
 */

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitMessage(null);
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/ajax/contato@luizalthoff.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Falha no envio do formulário");
      }

      form.reset();
      setSubmitMessage("Cadastro enviado com sucesso! Em breve entraremos em contato.");
    } catch {
      setSubmitMessage("Não foi possível enviar agora. Tente novamente em instantes.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8 }
  };

  const locations = useMemo(
    () => [
      { lat: -27.590, lng: -48.552, title: "Rio Branco", description: "Projeto 1 - 20+ andares" },
      { lat: -27.592, lng: -48.553, title: "Osmar Cunha", description: "Projeto 2 - 20+ andares" },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-white text-foreground font-sans selection:bg-primary/10 selection:text-primary">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-[1200] transition-all duration-500 ${
          isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center flex-shrink-0 transition-transform hover:scale-105">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663238074295/H8noqWLowYgi5MJAjhGSi2/Designsemnome_922eaf0a.png"
              alt="Luiz Althoff - Soluções em Imóveis"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {["Tipologias", "Localização", "Marina"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
            <Button size="sm" className="bg-primary hover:bg-primary/90 px-6 shadow-md shadow-primary/20">
              <a href="#cadastro">Cadastro</a>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Image with subtle scale animation */}
        <motion.div
          className="absolute inset-0 z-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10 }}
          style={{
            backgroundImage:
              "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663238074295/H8noqWLowYgi5MJAjhGSi2/hero-florianopolis-bridge-8AzYaCvgsjPhHx3t6hBWLa.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </motion.div>

        {/* Content */}
        <div className="container relative z-10 max-w-3xl">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-white text-xs font-semibold tracking-widest uppercase">
                Florianópolis, Centro
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1]">
              Compactos que <span className="text-primary-foreground/90">Rentabilizam</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
              Investimento imobiliário estratégico com vista para a Ponte Hercílio Luz e mar. Mobiliados, equipados e prontos para gerar retorno.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 h-14 text-base shadow-xl shadow-primary/30">
                <a href="#tipologias" className="flex items-center">
                  Explorar Projetos
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <motion.div 
              className="w-1 h-2 bg-white rounded-full"
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Tipologias Section */}
      <section id="tipologias" className="py-24 md:py-40 bg-white">
        <div className="container">
          <motion.div 
            className="grid lg:grid-cols-2 gap-20 items-center"
            {...fadeInUp}
          >
            {/* Left: Content */}
            <div className="space-y-10">
              <div>
                <p className="text-primary font-display font-bold text-sm uppercase tracking-[0.2em] mb-4">
                  Opções de Investimento
                </p>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight">
                  Tipologias <br />Estratégicas
                </h2>
              </div>

              <p className="text-lg text-foreground/60 leading-relaxed max-w-lg">
                Três opções de unidades compactas projetadas para maximizar rentabilidade e ocupação. Cada tipologia é pensada para atender diferentes perfis de investidores.
              </p>

              <div className="space-y-6">
                {[
                  {
                    name: "Estúdio",
                    description: "Perfeito para investimento de entrada",
                  },
                  {
                    name: "1 Dormitório",
                    description: "Maior demanda de aluguel de curta duração",
                  },
                  {
                    name: "2 Dormitórios",
                    description: "Rentabilidade premium com ocupação consistente",
                  },
                ].map((tipo, idx) => (
                  <motion.div 
                    key={idx} 
                    className="flex gap-6 items-start p-4 rounded-xl hover:bg-secondary/20 transition-colors border border-transparent hover:border-border/50"
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0 border border-primary/10">
                      <span className="font-display font-bold text-primary text-xl">
                        0{idx + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold text-foreground mb-1">
                        {tipo.name}
                      </h3>
                      <p className="text-foreground/50">
                        {tipo.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/5 rounded-3xl -z-10 group-hover:bg-primary/10 transition-colors" />
              <div className="relative">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663238074295/H8noqWLowYgi5MJAjhGSi2/compact-apartment-interior-5CNbDvmne3KG4HxbXuwGEm.webp"
                  alt="Apartamento compacto mobiliado"
                  className="w-full rounded-2xl shadow-2xl object-cover aspect-[4/5]"
                />
                <p className="absolute bottom-2 right-2 text-[8px] text-white/60 bg-black/40 px-2 py-1 rounded">Imagens meramente ilustrativas</p>
              </div>
              <motion.div 
                className="absolute -bottom-8 -left-8 bg-primary text-white p-8 rounded-2xl shadow-2xl max-w-xs border border-white/10"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest mb-2 opacity-80">Pronto para Rentabilizar</p>
                <p className="text-3xl font-display font-bold">
                  100% Equipado
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Localização Section */}
      <section id="localizacao" className="py-24 md:py-40 bg-gradient-to-b from-secondary/35 via-white to-secondary/20">
        <div className="container">
          <motion.div 
            className="grid lg:grid-cols-2 gap-20 items-center"
            {...fadeInUp}
          >
            {/* Left: Map */}
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-4 border border-primary/20 bg-gradient-to-br from-primary/[0.14] via-primary/[0.04] to-transparent rounded-3xl -z-10" />
              <div className="overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-b from-white to-primary/[0.03] p-2 border border-primary/10">
                <MapView 
                  initialCenter={{ lat: -27.591, lng: -48.5525 }}
                  initialZoom={16}
                  className="w-full h-[550px] rounded-xl"
                  locations={locations}
                />
              </div>
              <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg border border-primary/20">
                <p className="text-xs font-bold text-primary flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
                  Localizações Estratégicas
                </p>
              </div>
            </div>

            {/* Right: Content */}
            <div className="order-1 lg:order-2 space-y-10">
              <div>
                <p className="text-primary font-display font-bold text-sm uppercase tracking-[0.2em] mb-4">
                  Localização Premium
                </p>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight">
                  Centro <br />Estratégico
                </h2>
              </div>

              <p className="text-lg text-foreground/60 leading-relaxed max-w-lg">
                Dois projetos em localizações privilegiadas no coração de Florianópolis. Proximidade com comércio, serviços e acesso direto à beira-mar.
              </p>

              <div className="space-y-4">
                {[
                  { local: "Rio Branco", detalhe: "Projeto 1 - 20+ andares", icon: <MapPin className="w-6 h-6" /> },
                  { local: "Osmar Cunha", detalhe: "Projeto 2 - 20+ andares", icon: <MapPin className="w-6 h-6" /> },
                ].map((proj, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-5 p-6 bg-gradient-to-r from-white via-white to-primary/[0.03] rounded-2xl border border-primary/15 shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 ring-4 ring-primary/5 flex items-center justify-center text-primary">
                      {proj.icon}
                    </div>
                    <div>
                      <p className="text-xl font-display font-bold text-foreground">
                        {proj.local}
                      </p>
                      <p className="text-sm text-foreground/50">
                        {proj.detalhe}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-8 border-t border-primary/15">
                <div className="flex flex-wrap gap-3">
                  {["Vista Mar", "Ponte Hercílio Luz", "Marina", "Píer"].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gradient-to-r from-primary/10 to-primary/[0.04] text-primary text-xs font-bold rounded-full border border-primary/20 shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marina Section */}
      <section id="marina" className="py-24 md:py-40 bg-white">
        <div className="container">
          <motion.div 
            className="grid lg:grid-cols-2 gap-20 items-center"
            {...fadeInUp}
          >
            {/* Left: Content */}
            <div className="space-y-10">
              <div>
                <p className="text-primary font-display font-bold text-sm uppercase tracking-[0.2em] mb-4">
                  Propulsor de Valorização
                </p>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight">
                  Futuro <br />Marina
                </h2>
              </div>

              <p className="text-lg text-foreground/60 leading-relaxed max-w-lg">
                A Marina de Florianópolis é o grande catalisador de valorização imobiliária na região. Histórico comprovado de apreciação em cidades com infraestrutura similar.
              </p>

              <div className="bg-primary/[0.02] p-8 rounded-3xl border border-primary/10 space-y-6">
                <h3 className="text-xl font-display font-bold text-foreground flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  Histórico de Valorização
                </h3>
                <div className="space-y-4">
                  {[
                    { cidade: "Itajaí", valorizacao: "100%" },
                    { cidade: "Itapema", valorizacao: "50%" },
                    { cidade: "Florianópolis", valorizacao: "Potencial Máximo" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center pb-4 border-b border-primary/5 last:border-0 last:pb-0">
                      <span className="text-foreground/70 font-medium">{item.cidade}</span>
                      <span className="font-display font-bold text-primary text-lg">
                        +{item.valorizacao}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-sm text-foreground/40 italic flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full" />
                Seu patrimônio crescendo sem complicação. Investimento que se valoriza enquanto gera renda.
              </p>
            </div>

            {/* Right: Image */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/5 rounded-3xl -z-10 group-hover:bg-primary/10 transition-colors" />
              <div className="relative">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663238074295/H8noqWLowYgi5MJAjhGSi2/marina-development-ZNp3JjWAFvFfYC3VoL5kSp.webp"
                  alt="Marina de Florianópolis"
                  className="w-full rounded-2xl shadow-2xl object-cover aspect-[4/5]"
                />
                <p className="absolute bottom-2 right-2 text-[8px] text-white/60 bg-black/40 px-2 py-1 rounded">Imagens meramente ilustrativas</p>
              </div>
              <motion.div 
                className="absolute top-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl flex items-center gap-4 border border-border"
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground/50 uppercase tracking-widest">Status</p>
                  <p className="text-lg font-display font-bold text-primary">Próximo ao Futuro</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cadastro" className="py-24 md:py-40 bg-primary relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="container max-w-5xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUp} className="text-white space-y-8">
              <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight">
                Seu Patrimônio <br />Crescendo
              </h2>
              <p className="text-xl text-white/80 leading-relaxed max-w-md">
                Sem complicação. Compactos que rentabilizam. Mobiliados, equipados e prontos para gerar retorno desde o primeiro dia.
              </p>
              <div className="space-y-4">
                {[
                  "Alta rentabilidade comprovada",
                  "Gestão simplificada de locação",
                  "Valorização imobiliária acelerada"
                ].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white/90 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              id="cadastro-form"
              className="bg-white p-10 md:p-12 rounded-3xl shadow-2xl border border-white/10"
              {...fadeInUp}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">Cadastre seu interesse</h3>
                <p className="text-foreground/50">Receba a apresentação completa e tabela de preços.</p>
              </div>
              <form
                className="space-y-5"
                action="https://formsubmit.co/contato@luizalthoff.com"
                method="POST"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="_subject" value="Novo lead - Landing Florianopolis Invest" />
                <input type="hidden" name="_captcha" value="false" />

                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Nome Completo</label>
                  <input
                    type="text"
                    name="nome"
                    placeholder="Ex: João Silva"
                    className="w-full px-5 py-4 rounded-xl bg-secondary/30 text-foreground placeholder-foreground/30 border border-transparent focus:outline-none focus:border-primary/30 focus:bg-white transition-all"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">E-mail</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="seu@email.com"
                      className="w-full px-5 py-4 rounded-xl bg-secondary/30 text-foreground placeholder-foreground/30 border border-transparent focus:outline-none focus:border-primary/30 focus:bg-white transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Telefone</label>
                    <input
                      type="tel"
                      name="telefone"
                      placeholder="(48) 99999-9999"
                      className="w-full px-5 py-4 rounded-xl bg-secondary/30 text-foreground placeholder-foreground/30 border border-transparent focus:outline-none focus:border-primary/30 focus:bg-white transition-all"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Tipo de Interesse</label>
                  <select
                    name="tipo_interesse"
                    className="w-full px-5 py-4 rounded-xl bg-secondary/30 text-foreground border border-transparent focus:outline-none focus:border-primary/30 focus:bg-white transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="studio">Estúdio</option>
                    <option value="1bed">1 Dormitório</option>
                    <option value="2bed">2 Dormitórios</option>
                    <option value="all">Todos os tipos</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Mensagem</label>
                  <textarea
                    name="mensagem"
                    placeholder="Me conte qual tipologia você busca e melhor horário para contato."
                    className="w-full min-h-28 px-5 py-4 rounded-xl bg-secondary/30 text-foreground placeholder-foreground/30 border border-transparent focus:outline-none focus:border-primary/30 focus:bg-white transition-all"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-16 rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] mt-4"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Cadastro"}
                  {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2" />}
                </Button>
                {submitMessage && (
                  <p
                    className={`text-sm text-center mt-2 ${
                      submitMessage.includes("Não foi possível") ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {submitMessage}
                  </p>
                )}
                <p className="text-[10px] text-foreground/40 text-center mt-4">
                  Ao enviar, você concorda com nossa política de privacidade e termos de uso.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-20 border-t border-white/5">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
            <div className="space-y-6">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663238074295/H8noqWLowYgi5MJAjhGSi2/Designsemnome_922eaf0a.png"
                alt="Luiz Althoff"
                className="h-10 w-auto object-contain brightness-0 invert opacity-80"
              />
              <p className="text-sm text-white/50 leading-relaxed">
                Soluções em imóveis. Investimento estratégico em Florianópolis. Especialistas em compactos de alta rentabilidade.
              </p>
            </div>
            
            <div>
              <h4 className="font-display font-bold mb-8 text-lg">Projetos</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li>
                  <a href="#localizacao" className="hover:text-white transition-colors">
                    Rio Branco
                  </a>
                </li>
                <li>
                  <a href="#localizacao" className="hover:text-white transition-colors">
                    Osmar Cunha
                  </a>
                </li>
                <li>
                  <a href="#tipologias" className="hover:text-white transition-colors">
                    Tipologias
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold mb-8 text-lg">Institucional</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sobre a Luiz Althoff
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a href="#cadastro" className="hover:text-white transition-colors">
                    Trabalhe Conosco
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold mb-8 text-lg">Contato</h4>
              <div className="space-y-4 text-sm text-white/50">
                <p className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  Florianópolis, SC
                </p>
                <p className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-primary" />
                  contato@luizalthoff.com.br
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/30 text-center md:text-left">
              © 2026 Luiz Althoff - Soluções em Imóveis. Todos os direitos reservados.
            </p>
            <p className="text-[10px] text-white/20 uppercase tracking-widest">
              Desenvolvido com excelência
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
