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
        <section className="max-w-[800px] py-[clamp(48px,8vh,88px)]">
          <Eyebrow className="mb-5">Audio Law</Eyebrow>
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
        </section>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 border-y border-surface-border/15 py-5 text-xs font-light uppercase tracking-[0.08em] text-muted/60">
          <span>PDF <span className="text-accent">→</span> texto limpo <span className="text-accent">→</span> áudio</span>
          <span>Capítulos identificados automaticamente</span>
          <span>Arquivos MP3 prontos para baixar</span>
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
          <Reveal as="div" variant="curtain" className="max-w-[620px]">
            <Eyebrow className="mb-5">Comece agora</Eyebrow>
            <h2 className="mb-5 font-serif text-[clamp(2.1rem,4.5vw,3rem)] font-normal leading-[1.12] text-ink">
              Pronto para <em>ouvir</em>?
            </h2>
            <p className="mb-9 font-light text-[1.1rem] leading-[1.6] text-muted/60">
              Envie um PDF agora e receba os trechos de áudio em poucos minutos.
            </p>
            <PrimaryButton type="button" onClick={() => navigate('/use')}>
              Começar a usar o sistema
            </PrimaryButton>
          </Reveal>
        </section>
      </main>

      <footer className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-surface-border/15 px-5 py-6 sm:px-10">
        <span className="font-serif text-sm text-ink">Audio Law</span>
        <p className="text-[10px] font-normal uppercase tracking-[0.2em] text-muted/40">
          © 2026 Audio Law
        </p>
      </footer>
    </div>
  )
}
