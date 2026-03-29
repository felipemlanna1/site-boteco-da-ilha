import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import {
  BeerStein, Phone, MapPin, Star, WhatsappLogo, InstagramLogo,
  FacebookLogo, List, X, Clock, ArrowRight, MusicNotes,
  SunHorizon, Waves, ForkKnife, Users, CaretDown,
  MapTrifold, Timer, Binoculars, Guitar, Confetti
} from "@phosphor-icons/react"

const WA = "554833335457"
const PH = "(48) 3333-5457"
const ADDR = "Av. Jornalista Rubens de Arruda Ramos, 2106 - Centro"
const IG = "https://www.instagram.com/botecodailhafloripa/"
const FB = "https://www.facebook.com/BotecodaIlha/"

const fade = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const stag = { visible: { transition: { staggerChildren: 0.08 } } }

function Section({ children, id, className = "" }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <section id={id} ref={ref} className={className}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        {children}
      </motion.div>
    </section>
  )
}

/* ====== TIDE TIMER — happy hour countdown ====== */
function HappyHourTimer() {
  const [timeLeft, setTimeLeft] = useState("")
  const [isHappy, setIsHappy] = useState(false)

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const day = now.getDay()
      const hour = now.getHours()

      if (day >= 1 && day <= 5 && hour >= 18 && hour < 20) {
        setIsHappy(true)
        const end = new Date(now)
        end.setHours(20, 0, 0, 0)
        const diff = end - now
        const h = Math.floor(diff / 3600000)
        const m = Math.floor((diff % 3600000) / 60000)
        const s = Math.floor((diff % 60000) / 1000)
        setTimeLeft(`${h}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`)
      } else {
        setIsHappy(false)
        const next = new Date(now)
        if (day === 0 || day === 6 || (day >= 1 && day <= 5 && hour >= 20)) {
          next.setDate(now.getDate() + (day === 5 && hour >= 20 ? 3 : day === 6 ? 2 : day === 0 ? 1 : 1))
          next.setHours(18, 0, 0, 0)
        } else {
          next.setHours(18, 0, 0, 0)
        }
        const diff = next - now
        if (diff > 0) {
          const h = Math.floor(diff / 3600000)
          const m = Math.floor((diff % 3600000) / 60000)
          setTimeLeft(`${h}h ${String(m).padStart(2, "0")}m`)
        }
      }
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`inline-flex items-center gap-3 rounded-full px-5 py-2 ${isHappy ? "bg-orange-500/20 border border-orange-400/30" : "bg-sky-500/10 border border-sky-400/20"}`}>
      <Timer size={18} weight="duotone" className={isHappy ? "text-orange-400" : "text-sky-400"} />
      <div>
        <div className={`text-xs font-semibold ${isHappy ? "text-orange-300" : "text-sky-300"}`}>
          {isHappy ? "HAPPY HOUR AGORA!" : "Happy Hour em:"}
        </div>
        <div className={`text-sm font-bold ${isHappy ? "text-orange-200" : "text-sky-200"}`}>{timeLeft}</div>
      </div>
    </div>
  )
}

/* ====== DATA ====== */
const petiscos = [
  { nome: "Casquinha de Siri", desc: "Recheio cremoso de siri gratinado na casca, tempero especial da casa.", preco: "R$ 28,00", img: "./images/seafood.jpg", destaque: true },
  { nome: "Bolinho de Bacalhau", desc: "Crocante por fora, macio por dentro. Receita portuguesa com toque ilhéu.", preco: "R$ 34,00", img: "./images/pastel.jpg" },
  { nome: "Tiras de Mignon com Cebola", desc: "Mignon grelhado com cebola caramelizada e molho especial.", preco: "R$ 45,00", img: "./images/pastel.jpg" },
  { nome: "Linguicinha Blumenau", desc: "Linguiça artesanal catarinense, grelhada na brasa, com mostarda.", preco: "R$ 32,00", img: "./images/pastel.jpg" },
  { nome: "Chopp Brahma 600ml", desc: "Gelado na temperatura perfeita, direto da Beira-Mar.", preco: "R$ 14,00", img: "./images/chopp-bar.jpg" },
  { nome: "Caipirinha da Ilha", desc: "Limão, cachaça premium e muito gelo. A cara de Floripa.", preco: "R$ 24,00", img: "./images/drinks.jpg" },
]

const agenda = [
  { dia: "Segunda", estilo: "MPB & Surf Music", hours: "18h - 00h" },
  { dia: "Terça", estilo: "Pagode & Samba", hours: "18h - 00h" },
  { dia: "Quarta", estilo: "Sertanejo Raiz", hours: "18h - 00h" },
  { dia: "Quinta", estilo: "Pop Rock & Internacional", hours: "18h - 00h" },
  { dia: "Sexta", estilo: "Reggae & MPB", hours: "18h - 01h" },
  { dia: "Sábado", estilo: "Pop Rock & Especiais", hours: "18h30 - 01h" },
]

const depoimentos = [
  { nome: "Lucas M.", texto: "Melhor bar da Beira-Mar! Vista linda, chopp gelado e a banda de sexta é sensacional. Ponto obrigatório em Floripa!", nota: 5 },
  { nome: "Camila R.", texto: "A casquinha de siri é divina e o atendimento é muito bom. Adoro ir no pôr do sol, o visual é de tirar o fôlego.", nota: 5 },
  { nome: "André P.", texto: "Frequento há anos. Happy hour perfeito, preço justo, som ao vivo todo dia. O melhor boteco da ilha!", nota: 5 },
  { nome: "Marina S.", texto: "Levei meus amigos turistas e eles amaram! Petiscos deliciosos, cerveja gelada e aquela brisa da Beira-Mar.", nota: 4 },
  { nome: "Felipe G.", texto: "Bar com personalidade. Diferente dos lugares genéricos. Tem alma, tem história. Recomendo demais!", nota: 5 },
]

const perguntas = [
  { q: "Onde fica o Boteco da Ilha?", a: "Na Av. Beira-Mar Norte (Av. Jornalista Rubens de Arruda Ramos, 2106), no Centro de Florianópolis. Com vista para o mar!" },
  { q: "Qual o horário de funcionamento?", a: "Segunda a quinta: 18h às 00h. Sexta: 18h à 01h. Sábado: 18h30 à 01h. Domingo: 18h30 às 00h." },
  { q: "Tem estacionamento?", a: "Não temos estacionamento próprio, mas a região possui estacionamentos rotativos e vagas na via." },
  { q: "Aceita reserva?", a: "Sim! Faça sua reserva pelo WhatsApp ou telefone, especialmente para sextas e sábados." },
  { q: "Tem transmissão de jogos?", a: "Sim! Transmitimos os principais jogos de futebol com telão e som." },
  { q: "Aceitam cartão?", a: "Sim! Aceitamos todas as bandeiras de crédito, débito e PIX." },
]

const translations = {
  pt: { about: "Sobre", menu: "Petiscos", schedule: "Agenda", reviews: "Avaliações", faq: "FAQ", contact: "Contato", cta: "Reservar", lang: "EN" },
  en: { about: "About", menu: "Snacks", schedule: "Schedule", reviews: "Reviews", faq: "FAQ", contact: "Contact", cta: "Book", lang: "PT" },
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lang, setLang] = useState("pt")
  const [activeFaq, setActiveFaq] = useState(null)
  const t = translations[lang]

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const navLinks = [
    { label: t.about, href: "#sobre" },
    { label: t.menu, href: "#petiscos" },
    { label: t.schedule, href: "#agenda" },
    { label: t.reviews, href: "#depoimentos" },
    { label: t.faq, href: "#faq" },
    { label: t.contact, href: "#contato" },
  ]

  return (
    <div className="min-h-screen bg-sky-950 font-sans text-sky-100">

      {/* ===== NAVBAR ===== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-sky-950/95 shadow-lg shadow-sky-900/30" : "bg-sky-950/70"
      }`} style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-18">
          <a href="#" className="flex items-center gap-2">
            <img src="./images/logo.svg" alt="Boteco da Ilha" className="h-10" />
          </a>
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-sky-300/70 hover:text-orange-400 transition">{link.label}</a>
            ))}
            <button onClick={() => setLang(lang === "pt" ? "en" : "pt")} className="text-xs font-bold border border-sky-500/30 rounded px-2 py-1 text-sky-400 hover:bg-sky-500/10 transition">
              {t.lang}
            </button>
            <a href={`https://wa.me/${WA}?text=Olá! Gostaria de reservar uma mesa no Boteco da Ilha.`} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition">
              <WhatsappLogo size={18} weight="fill" className="flex-shrink-0" />
              {t.cta}
            </a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-sky-200 p-2">
            {menuOpen ? <X size={28} /> : <List size={28} />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-sky-950/98 border-t border-sky-800/30">
              <div className="px-4 py-4 space-y-3">
                {navLinks.map(link => (
                  <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block text-sky-200 font-medium py-2">{link.label}</a>
                ))}
                <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 bg-orange-500 text-white font-semibold px-5 py-3 rounded-lg w-full justify-center mt-2">
                  <WhatsappLogo size={20} weight="fill" className="flex-shrink-0" />
                  {t.cta}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="./images/hero-sunset.jpg" alt="Pôr do sol na Beira-Mar" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-950 via-sky-950/80 to-sky-950/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div initial="hidden" animate="visible" variants={stag} className="max-w-2xl">
            <motion.div variants={fade}>
              <HappyHourTimer />
            </motion.div>
            <motion.h1 variants={fade} className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 mt-6">
              O melhor <span className="text-orange-400">happy hour</span><br />
              da Beira-Mar Norte
            </motion.h1>
            <motion.p variants={fade} className="text-lg text-sky-200/70 mb-8 max-w-lg">
              Chopp gelado, petiscos do mar, som ao vivo todos os dias e a vista mais bonita de Floripa. Desde 2002 reunindo amigos na Beira-Mar.
            </motion.p>
            <motion.div variants={fade} className="flex flex-wrap gap-4">
              <a href={`https://wa.me/${WA}?text=Olá! Quero reservar uma mesa no Boteco da Ilha para hoje!`} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold px-7 py-3.5 rounded-xl transition text-lg shadow-lg shadow-orange-900/30">
                <WhatsappLogo size={22} weight="fill" className="flex-shrink-0" />
                Reservar Mesa
              </a>
              <a href="#petiscos"
                 className="inline-flex items-center gap-2 border-2 border-sky-400/40 hover:border-orange-400/50 text-sky-200 hover:text-orange-300 font-semibold px-7 py-3.5 rounded-xl transition text-lg">
                <ForkKnife size={22} weight="duotone" className="flex-shrink-0" />
                Ver Petiscos
              </a>
            </motion.div>
            <motion.div variants={fade} className="flex items-center gap-6 mt-10">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} weight="fill" className={i < 4 ? "text-orange-400" : "text-orange-400/40"} />)}
                <span className="text-sky-300 text-sm ml-2">4.5 no Google</span>
              </div>
              <span className="text-sky-600">|</span>
              <span className="text-sky-400/60 text-sm">150+ avaliações</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== SOBRE ===== */}
      <Section id="sobre" className="py-24 bg-sky-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img src="./images/chopp-bar.jpg" alt="Boteco da Ilha" className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]" />
              <div className="absolute -bottom-5 -right-5 bg-orange-500 text-white p-4 rounded-xl shadow-lg">
                <Waves size={28} weight="duotone" />
                <div className="text-lg font-bold mt-1">Desde 2002</div>
              </div>
            </div>
            <div>
              <span className="text-orange-400 font-semibold text-sm uppercase tracking-widest">Nossa Vibe</span>
              <h2 className="font-heading text-4xl sm:text-5xl text-white mt-3 mb-6">
                A melhor rede social é uma <span className="text-orange-400">mesa entre amigos</span>
              </h2>
              <p className="text-sky-300/60 text-lg leading-relaxed mb-6">
                Com vista privilegiada para a Beira-Mar Norte, o Boteco da Ilha nasceu em 2002 com uma missão simples: reunir os elementos essenciais para uma noite perfeita — chopp gelado, petiscos irresistíveis, boa companhia e brisa do mar.
              </p>
              <p className="text-sky-300/60 text-lg leading-relaxed mb-8">
                De segunda a sábado, bandas ao vivo trazem MPB, pagode, reggae, sertanejo e rock para embalar seu happy hour. É o ponto de encontro favorito dos manezinhos e turistas na ilha.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 font-heading">22+</div>
                  <div className="text-sky-400/50 text-sm mt-1">Anos na Beira-Mar</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 font-heading">6</div>
                  <div className="text-sky-400/50 text-sm mt-1">Noites de som ao vivo</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 font-heading">150+</div>
                  <div className="text-sky-400/50 text-sm mt-1">Avaliações Google</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ===== PETISCOS ===== */}
      <Section id="petiscos" className="py-24 bg-sky-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-widest">Nossos Petiscos</span>
            <h2 className="font-heading text-4xl sm:text-5xl text-white mt-3">
              Sabores da <span className="text-orange-400">ilha</span>
            </h2>
            <p className="text-sky-300/50 mt-4 max-w-xl mx-auto">Do mar para a mesa — petiscos artesanais que fazem bonito com o chopp gelado.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {petiscos.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className={`group bg-sky-900/20 rounded-2xl overflow-hidden border border-sky-800/15 hover:border-orange-500/30 transition ${
                  item.destaque ? "ring-2 ring-orange-500/20" : ""
                }`}>
                <div className="relative h-44 overflow-hidden">
                  <img src={item.img} alt={item.nome} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  {item.destaque && (
                    <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">CAMPEÃO</div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start gap-3">
                    <h3 className="text-white font-semibold text-lg">{item.nome}</h3>
                    <span className="text-orange-400 font-bold whitespace-nowrap">{item.preco}</span>
                  </div>
                  <p className="text-sky-300/50 text-sm mt-2">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ===== AGENDA AO VIVO ===== */}
      <Section id="agenda" className="py-24 bg-sky-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-orange-400 font-semibold text-sm uppercase tracking-widest">Som ao Vivo</span>
              <h2 className="font-heading text-4xl sm:text-5xl text-white mt-3 mb-8">
                Toda noite tem <span className="text-orange-400">banda</span>
              </h2>
              <div className="space-y-3">
                {agenda.map((a, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                    className="flex items-center justify-between bg-sky-800/15 border border-sky-700/10 rounded-xl p-4 hover:border-orange-500/20 transition">
                    <div className="flex items-center gap-3">
                      <MusicNotes size={22} weight="duotone" className="text-orange-400" />
                      <div>
                        <div className="text-white font-semibold text-sm">{a.dia}</div>
                        <div className="text-sky-300/50 text-sm">{a.estilo}</div>
                      </div>
                    </div>
                    <span className="text-sky-400/40 text-xs">{a.hours}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src="./images/live-band.jpg" alt="Banda ao vivo" className="rounded-2xl shadow-2xl w-full object-cover aspect-square" />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-950/60 to-transparent rounded-2xl" />
              <div className="absolute bottom-6 left-6 right-6 bg-sky-950/70 rounded-xl p-4 border border-sky-700/15" style={{ backdropFilter: "blur(10px)" }}>
                <div className="flex items-center gap-3">
                  <Guitar size={24} weight="duotone" className="text-orange-400" />
                  <div>
                    <div className="text-white font-semibold">Som ao Vivo Toda Noite</div>
                    <div className="text-sky-300/50 text-sm">MPB, Pagode, Reggae, Rock, Sertanejo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ===== GALERIA ===== */}
      <Section id="galeria" className="py-24 bg-sky-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-widest">Galeria</span>
            <h2 className="font-heading text-4xl sm:text-5xl text-white mt-3">Clima de <span className="text-orange-400">ilha</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { src: "./images/hero-sunset.jpg", alt: "Vista Beira-Mar", span: "md:col-span-2 md:row-span-2" },
              { src: "./images/seafood.jpg", alt: "Petiscos do mar" },
              { src: "./images/drinks.jpg", alt: "Drinks" },
              { src: "./images/live-band.jpg", alt: "Banda ao vivo" },
              { src: "./images/chopp-bar.jpg", alt: "Chopp gelado" },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className={`${f.span || ""} group overflow-hidden rounded-xl`}>
                <img src={f.src} alt={f.alt} className="w-full h-full object-cover min-h-[180px] group-hover:scale-105 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ===== DEPOIMENTOS ===== */}
      <Section id="depoimentos" className="py-24 bg-sky-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-widest">Avaliações</span>
            <h2 className="font-heading text-4xl sm:text-5xl text-white mt-3">Quem passou por aqui <span className="text-orange-400">aprovou</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {depoimentos.map((d, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-sky-900/25 border border-sky-800/15 rounded-2xl p-6 hover:border-orange-500/20 transition">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} weight="fill" className={j < d.nota ? "text-orange-400" : "text-sky-700"} />)}
                </div>
                <p className="text-sky-200/70 text-sm leading-relaxed mb-4 italic">"{d.texto}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500/15 rounded-full flex items-center justify-center">
                    <span className="text-orange-400 font-bold text-xs">{d.nome[0]}</span>
                  </div>
                  <div className="text-white text-sm font-semibold">{d.nome}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ===== FAQ ===== */}
      <Section id="faq" className="py-24 bg-sky-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-widest">Dúvidas</span>
            <h2 className="font-heading text-4xl sm:text-5xl text-white mt-3">Perguntas <span className="text-orange-400">frequentes</span></h2>
          </div>
          <div className="space-y-3">
            {perguntas.map((p, i) => (
              <div key={i} className="bg-sky-900/20 border border-sky-800/10 rounded-xl overflow-hidden">
                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-sky-800/10 transition">
                  <span className="text-white font-semibold pr-4">{p.q}</span>
                  <CaretDown size={20} className={`text-orange-400 flex-shrink-0 transition-transform ${activeFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="px-5 pb-5 text-sky-300/60 leading-relaxed">{p.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ===== CONTATO ===== */}
      <Section id="contato" className="py-24 bg-sky-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="text-orange-400 font-semibold text-sm uppercase tracking-widest">Venha nos Visitar</span>
              <h2 className="font-heading text-4xl sm:text-5xl text-white mt-3 mb-8">
                Na <span className="text-orange-400">Beira-Mar</span> mais bonita do Brasil
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} weight="duotone" className="text-orange-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Endereço</div>
                    <div className="text-sky-300/60">{ADDR}</div>
                    <div className="text-sky-400/40 text-sm">Florianópolis - SC, 88015-701</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone size={24} weight="duotone" className="text-orange-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Telefone / Reservas</div>
                    <a href={`tel:${PH}`} className="text-sky-300/60 hover:text-orange-300 transition">{PH}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock size={24} weight="duotone" className="text-orange-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Horário</div>
                    <div className="text-sky-300/60">Seg-Qui: 18h-00h | Sex: 18h-01h</div>
                    <div className="text-sky-400/40 text-sm">Sáb: 18h30-01h | Dom: 18h30-00h</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <a href={`https://wa.me/${WA}?text=Olá! Gostaria de reservar uma mesa.`} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-5 py-3 rounded-xl transition">
                  <WhatsappLogo size={20} weight="fill" className="flex-shrink-0" /> WhatsApp
                </a>
                <a href={IG} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 bg-gradient-to-br from-purple-600 to-pink-500 text-white font-semibold px-5 py-3 rounded-xl transition">
                  <InstagramLogo size={20} weight="fill" className="flex-shrink-0" /> Instagram
                </a>
                <a href={FB} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-3 rounded-xl transition">
                  <FacebookLogo size={20} weight="fill" className="flex-shrink-0" /> Facebook
                </a>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl h-[400px]">
              <iframe title="Boteco da Ilha" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3535.9!2d-48.5432!3d-27.5853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDM1JzA3LjEiUyA0OMKwMzInMzUuNSJX!5e0!3m2!1spt-BR!2sbr!4v1"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>
      </Section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-20 bg-gradient-to-b from-sky-900/30 to-sky-950 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <SunHorizon size={48} weight="duotone" className="text-orange-400 mx-auto mb-6" />
          <h2 className="font-heading text-4xl sm:text-5xl text-white mb-4">Vem pro Boteco!</h2>
          <p className="text-sky-300/50 text-lg mb-8">Reserve sua mesa pelo WhatsApp e venha curtir o melhor pôr do sol de Floripa com chopp gelado e som ao vivo.</p>
          <a href={`https://wa.me/${WA}?text=Olá! Quero reservar uma mesa no Boteco da Ilha!`} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-4 rounded-xl transition text-lg shadow-lg shadow-orange-900/30">
            <WhatsappLogo size={24} weight="fill" className="flex-shrink-0" />
            Reservar Agora
          </a>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-sky-950 border-t border-sky-800/15 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <img src="./images/logo.svg" alt="Boteco da Ilha" className="h-10 mb-4" />
              <p className="text-sky-500/50 text-sm leading-relaxed">O melhor happy hour da Beira-Mar Norte desde 2002. Chopp, petiscos e som ao vivo.</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Navegação</h3>
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map(link => <a key={link.href} href={link.href} className="text-sky-400/50 hover:text-orange-300 text-sm transition">{link.label}</a>)}
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Contato</h3>
              <div className="space-y-2 text-sm text-sky-400/50">
                <p>{ADDR}</p>
                <p>Florianópolis - SC</p>
                <p>Tel: {PH}</p>
              </div>
              <div className="flex gap-3 mt-4">
                <a href={IG} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-orange-400 transition"><InstagramLogo size={22} weight="fill" /></a>
                <a href={FB} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-orange-400 transition"><FacebookLogo size={22} weight="fill" /></a>
                <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-orange-400 transition"><WhatsappLogo size={22} weight="fill" /></a>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-sky-800/10 text-center text-sky-700/40 text-xs">
            &copy; {new Date().getFullYear()} Boteco da Ilha. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
