import { navigate } from '../lib/router'
import { Header } from '../components/Header'
import { AnimatedHero } from '../components/AnimatedHero'
import { Reveal } from '../components/Reveal'
import { Eyebrow } from '../components/Eyebrow'
import { OrnamentalDivider } from '../components/OrnamentalDivider'
import { FeatureRow } from '../components/FeatureRow'
import { PrimaryButton } from '../components/PrimaryButton'
import { DocumentScanIcon } from '../components/icons/DocumentScanIcon'
import { ChaptersIcon } from '../components/icons/ChaptersIcon'
import { WaveformIcon } from '../components/icons/WaveformIcon'

const NAV_LINKS = [
  { label: 'Recursos', href: '#recursos' },
  { label: 'Como funciona', href: '#como-funciona' },
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
        <section className="max-w-[800px] py-[clamp(64px,12vh,132px)]">
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
              href="#como-funciona"
              className="text-sm text-accent underline underline-offset-4 hover:opacity-70"
            >
              Ver como funciona
            </a>
          </div>
        </section>

        <OrnamentalDivider />

        <section id="recursos" className="py-[clamp(56px,9vh,96px)]">
          <Reveal as="p" className="mb-11">
            <Eyebrow>Como funciona?</Eyebrow>
          </Reveal>

          <div className="flex flex-col gap-14">
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

        <section id="como-funciona" className="py-[clamp(64px,11vh,128px)]">
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
