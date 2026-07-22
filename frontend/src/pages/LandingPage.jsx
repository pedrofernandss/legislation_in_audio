import { navigate } from '../lib/router'
import { Header } from '../components/Header'
import { AnimatedHero } from '../components/AnimatedHero'
import { Reveal } from '../components/Reveal'
import { Eyebrow } from '../components/Eyebrow'
import { FeatureRow } from '../components/FeatureRow'
import { PrimaryButton } from '../components/PrimaryButton'
import { DocumentScanIcon } from '../components/icons/DocumentScanIcon'
import { ChaptersIcon } from '../components/icons/ChaptersIcon'
import { WaveformIcon } from '../components/icons/WaveformIcon'

const NAV_LINKS = [
  { label: 'Como funciona', href: '#recursos' },
  { label: 'Começar', href: '#comecar' },
]

function NavLink({ label, href }) {
  return (
    <a
      href={href}
      className="text-[11px] font-normal uppercase tracking-[0.18em] text-ink transition-colors hover:text-accent"
    >
      {label}
    </a>
  )
}

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header center={NAV_LINKS.map((link) => <NavLink key={link.href} {...link} />)} />

      <main className="mx-auto w-full max-w-[1080px] px-5 sm:px-10">
        <section className="grid grid-cols-1 items-center gap-12 py-[clamp(48px,8vh,88px)] md:grid-cols-[1.15fr_0.85fr] md:gap-16">
          <div>
            <Eyebrow className="mb-5">Lei em Voz</Eyebrow>
            <AnimatedHero
              className="font-serif text-[clamp(2.9rem,6vw,4.6rem)] font-normal leading-[1.06] tracking-[-0.01em] text-ink"
              segments={[
                { text: 'Transforme PDFs jurídicos em ' },
                { text: 'áudio', emphasis: true },
                { text: '.' },
              ]}
            />
            <p className="my-8 max-w-[560px] font-light text-[clamp(1.05rem,2vw,1.25rem)] leading-[1.65] text-muted/60">
              Envie um documento, deixe o sistema limpar o texto e receba trechos de áudio para
              ouvir ou baixar.
            </p>
            <div className="flex flex-wrap items-center gap-7">
              <PrimaryButton type="button" onClick={() => navigate('/use')}>
                Começar a usar o sistema
              </PrimaryButton>
              <a
                href="#recursos"
                className="text-sm text-accent underline underline-offset-4 hover:opacity-70"
              >
                Ver como funciona
              </a>
            </div>
          </div>

          <div className="rounded-sm border border-surface-border/15 bg-surface p-7">
            <Eyebrow className="mb-6">Fluxo simples</Eyebrow>
            <ol className="flex flex-col gap-5">
              <li className="flex items-center gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green/15 font-serif text-base text-green">
                  1
                </span>
                <div>
                  <p className="font-serif text-base text-ink">Enviar PDF</p>
                  <p className="text-xs font-light text-muted/50">O documento original, do jeito que está.</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 font-serif text-base text-accent">
                  2
                </span>
                <div>
                  <p className="font-serif text-base text-ink">Processar texto</p>
                  <p className="text-xs font-light text-muted/50">Limpeza e divisão em capítulos.</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber/15 font-serif text-base text-amber">
                  3
                </span>
                <div>
                  <p className="font-serif text-base text-ink">Gerar áudio</p>
                  <p className="text-xs font-light text-muted/50">Trechos prontos para ouvir ou baixar.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-sm border border-green/20 bg-green/[0.06] px-4 py-3.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-green" />
            <span className="text-xs uppercase tracking-[0.06em] text-ink">PDF → texto limpo → áudio</span>
          </div>
          <div className="flex items-center gap-3 rounded-sm border border-accent/20 bg-accent/[0.06] px-4 py-3.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
            <span className="text-xs uppercase tracking-[0.06em] text-ink">Capítulos identificados automaticamente</span>
          </div>
          <div className="flex items-center gap-3 rounded-sm border border-amber/20 bg-amber/[0.06] px-4 py-3.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-amber" />
            <span className="text-xs uppercase tracking-[0.06em] text-ink">Arquivos MP3 prontos para baixar</span>
          </div>
        </div>

        <section id="recursos" className="py-[clamp(40px,6vh,72px)]">
          <Reveal as="p" className="mb-8">
            <Eyebrow>Como funciona?</Eyebrow>
          </Reveal>

          <div className="flex flex-col gap-10">
            <FeatureRow
              number="i."
              label="Leitura do PDF"
              variant="focus"
              color="green"
              icon={<DocumentScanIcon />}
              title={
                <>
                  Do PDF ao <em>texto limpo</em>.
                </>
              }
              description="Esqueça a formatação bagunçada. O sistema extrai o conteúdo do documento e limpa termos, numerações e ruído para deixar o texto pronto para virar áudio."
            />

            <hr className="border-t border-surface-border/15" />

            <FeatureRow
              number="ii."
              label="Segmentação"
              variant="fade"
              reverse
              color="accent"
              icon={<ChaptersIcon />}
              title={
                <>
                  Cada <em>capítulo</em>, seu trecho.
                </>
              }
              description="O texto é dividido por capítulo sempre que possível, ou em blocos de leitura confortável quando não há uma estrutura clara — para você ouvir por partes."
            />

            <hr className="border-t border-surface-border/15" />

            <FeatureRow
              number="iii."
              label="Geração de áudio"
              variant="curtain"
              color="amber"
              icon={<WaveformIcon />}
              title={
                <>
                  Texto vira <em>áudio</em>.
                </>
              }
              description="Cada trecho é convertido em um arquivo de áudio pronto para ouvir ou baixar, com narração natural em português."
            />
          </div>
        </section>

        <hr className="border-t border-surface-border/15" />

        <section id="comecar" className="py-[clamp(48px,8vh,88px)]">
          <Reveal
            as="div"
            variant="curtain"
            className="overflow-hidden rounded-sm border border-surface-border/15 bg-surface"
          >
            <div className="h-1 w-full bg-gradient-to-r from-accent via-green to-amber" />
            <div className="grid grid-cols-1 items-center gap-8 p-8 sm:p-12 md:grid-cols-[1.3fr_0.7fr]">
              <div>
                <Eyebrow className="mb-5">Comece agora</Eyebrow>
                <h2 className="mb-5 font-serif text-[clamp(2.1rem,4.5vw,3rem)] font-normal leading-[1.12] text-ink">
                  Pronto para <em>ouvir</em>?
                </h2>
                <p className="max-w-md font-light text-[1.1rem] leading-[1.6] text-muted/60">
                  Envie um PDF agora e receba os trechos de áudio em poucos minutos.
                </p>
              </div>
              <div className="flex md:justify-end">
                <PrimaryButton type="button" onClick={() => navigate('/use')}>
                  Começar a usar o sistema
                </PrimaryButton>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-surface-border/15 px-5 py-6 sm:px-10">
        <span className="font-serif text-sm text-ink">Lei em Voz</span>
        <p className="text-[10px] font-normal uppercase tracking-[0.2em] text-muted/40">
          © 2026 Lei em Voz
        </p>
      </footer>
    </div>
  )
}
