import type { CSSProperties } from 'react';

const platformRings = Array.from({ length: 5 }, (_, index) => index);
const platformSpokes = Array.from({ length: 28 }, (_, index) => index);
const lightBeams = Array.from({ length: 22 }, (_, index) => index);
const orbitDots = Array.from({ length: 34 }, (_, index) => index);
const dataDots = Array.from({ length: 44 }, (_, index) => index);

const ringStyle = (index: number): CSSProperties => ({
  '--ring-inset': `${index * 8.5}%`,
} as CSSProperties);

const spokeStyle = (index: number): CSSProperties => ({
  '--spoke-angle': `${index * 12.857}deg`,
} as CSSProperties);

const dataDotStyle = (index: number): CSSProperties => ({
  '--dot-x': `${(index % 11) * 8.5}%`,
  '--dot-y': `${(index % 7 - 3) * 13}px`,
  '--dot-y-alt': `${(index % 7 - 3) * -11}px`,
  '--dot-delay': `${index * -0.08}s`,
} as CSSProperties);

const orbitDotStyle = (index: number): CSSProperties => ({
  '--dot-angle': `${index * 21}deg`,
  '--dot-radius': `${138 + (index % 7) * 28}px`,
  '--dot-lift': `${(index % 5) * 8}px`,
  '--dot-delay': `${index * -0.13}s`,
} as CSSProperties);

const beamStyle = (index: number): CSSProperties => ({
  '--beam-height': `${185 + (index % 8) * 30}px`,
  '--beam-height-mobile': `${(185 + (index % 8) * 30) * 0.72}px`,
  '--beam-angle': `${-42 + index * 4}deg`,
  '--beam-angle-active': `${-47 + index * 4.35}deg`,
  '--beam-x': `${(index % 5 - 2) * 12}px`,
  '--beam-delay': `${index * -0.18}s`,
  '--bead-delay': `${index * -0.21}s`,
} as CSSProperties);

export default function Home() {
  return (
    <section className="nexivo-hero">
      <div className="hero-ambient" aria-hidden="true" />
      <div className="hero-data-wave hero-data-wave-left" aria-hidden="true">
        {dataDots.map((dot) => (
          <span key={`left-${dot}`} style={dataDotStyle(dot)} />
        ))}
      </div>
      <div className="hero-data-wave hero-data-wave-right" aria-hidden="true">
        {dataDots.map((dot) => (
          <span key={`right-${dot}`} style={dataDotStyle(dot)} />
        ))}
      </div>

      <div className="hero-stage" aria-hidden="true">
        <div className="hologram-platform">
          <div className="platform-glow" />
          {platformRings.map((ring) => (
            <span
              key={ring}
              className="platform-ring"
              style={ringStyle(ring)}
            />
          ))}
          {platformSpokes.map((spoke) => (
            <span
              key={spoke}
              className="platform-spoke"
              style={spokeStyle(spoke)}
            />
          ))}
          {orbitDots.map((dot) => (
            <span
              key={dot}
              className="platform-dot"
              style={orbitDotStyle(dot)}
            />
          ))}
        </div>

        <div className="light-field">
          {lightBeams.map((beam) => (
            <span
              key={beam}
              className="light-beam"
              style={beamStyle(beam)}
            />
          ))}
        </div>

        <div className="cube-wrap">
          <div className="nexivo-cube">
            <span className="cube-face cube-face-front" />
            <span className="cube-face cube-face-back" />
            <span className="cube-face cube-face-right" />
            <span className="cube-face cube-face-left" />
            <span className="cube-face cube-face-top" />
            <span className="cube-face cube-face-bottom" />
          </div>
        </div>
      </div>

      <div className="hero-content">
        <p className="hero-kicker">VEIN BIOMETRIC IDENTITY INFRASTRUCTURE</p>
        <h1 className="hero-logo-heading">
          <img className="hero-logo-image" src="/nexivo-logo-hero.png" alt="NEXIVO" />
        </h1>
        <p className="hero-subtitle">
          Damar biyometrisini yüksek güvenlikli kurumlar için cihaz üstü, gizlilik odaklı kimlik doğrulama altyapısına dönüştüren erken aşama deep-tech girişimi.
        </p>
        <div className="hero-actions">
          <a href="#/vizyon" className="hero-primary-action">
            İş Planını İncele
          </a>
          <a href="#/teknoloji" className="hero-secondary-action">
            Teknolojiyi İncele
          </a>
        </div>
      </div>
    </section>
  );
}
