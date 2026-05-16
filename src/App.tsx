import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import creedAventus from './assets/perfumes/creed_aventus.png';
import erbaPura from './assets/perfumes/erba_pura.png';
import invictusVictoryElixir from './assets/perfumes/invictus_victory_elixir.png';
import oneMillionElixir from './assets/perfumes/one_million_elixir.png';

const IMAGES = [
  {
    src: oneMillionElixir,
    name: 'One Million Elixir',
    accent: 'Rabanne',
    bg: '#9C6314',
    panel: '#C7932E',
    description: 'Golden amber intensity with a sculptural bottle that owns the spotlight.',
  },
  {
    src: erbaPura,
    name: 'Erba Pura',
    accent: 'Xerjoff',
    bg: '#1967A8',
    panel: '#4A92CF',
    description: 'Blue velvet energy, bright citrus aura, and a bottle built to feel luxurious.',
  },
  {
    src: invictusVictoryElixir,
    name: 'Invictus Victory Elixir',
    accent: 'Rabanne',
    bg: '#10264D',
    panel: '#2B4777',
    description: 'Dark trophy silhouette with a dense, powerful presence made for the hero frame.',
  },
  {
    src: creedAventus,
    name: 'Creed Aventus',
    accent: 'Creed',
    bg: '#2D2B2A',
    panel: '#5A5653',
    description: 'The iconic monochrome bottle, sharp and clean, with timeless signature character.',
  },
] as const;

const TRANSITION = '650ms cubic-bezier(0.4,0,0.2,1)';
const GRAIN_SVG = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
    </filter>
    <rect width="200" height="200" filter="url(#n)" opacity="0.08" />
  </svg>
`);

type Direction = 'next' | 'prev';
type Role = 'center' | 'left' | 'right' | 'back';

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);

  useEffect(() => {
    IMAGES.forEach(({ src }) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isAnimating) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setIsAnimating(false);
    }, 650);

    return () => window.clearTimeout(timeout);
  }, [isAnimating]);

  const activePerfume = IMAGES[activeIndex];

  const roles = useMemo(
    () => ({
      center: activeIndex,
      left: (activeIndex + 3) % 4,
      right: (activeIndex + 1) % 4,
      back: (activeIndex + 2) % 4,
    }),
    [activeIndex],
  );

  const navigate = (direction: Direction) => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);
    setActiveIndex((prev) => (direction === 'next' ? (prev + 1) % 4 : (prev + 3) % 4));
  };

  const getRole = (index: number): Role => {
    if (roles.center === index) return 'center';
    if (roles.left === index) return 'left';
    if (roles.right === index) return 'right';
    return 'back';
  };

  const getItemStyle = (role: Role) => {
    switch (role) {
      case 'center':
        return {
          transform: `translateX(-50%) scale(${isMobile ? 1.08 : 1.42})`,
          filter: 'blur(0px)',
          opacity: 1,
          zIndex: 20,
          left: '50%',
          height: isMobile ? '58%' : '86%',
          bottom: isMobile ? '18%' : '2%',
        };
      case 'left':
        return {
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(2px)',
          opacity: 0.78,
          zIndex: 10,
          left: isMobile ? '18%' : '29%',
          height: isMobile ? '18%' : '29%',
          bottom: isMobile ? '28%' : '13%',
        };
      case 'right':
        return {
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(2px)',
          opacity: 0.78,
          zIndex: 10,
          left: isMobile ? '82%' : '71%',
          height: isMobile ? '18%' : '29%',
          bottom: isMobile ? '28%' : '13%',
        };
      case 'back':
      default:
        return {
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(4px)',
          opacity: 0.92,
          zIndex: 5,
          left: '50%',
          height: isMobile ? '15%' : '23%',
          bottom: isMobile ? '29%' : '13%',
        };
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: activePerfume.bg,
        transition: `background-color ${TRANSITION}`,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div className="relative w-full overflow-hidden" style={{ height: '100vh' }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: 50,
            opacity: 0.4,
            backgroundImage: `url("data:image/svg+xml,${GRAIN_SVG}")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px',
          }}
        />

        <div
          className="pointer-events-none absolute inset-x-0 flex select-none items-center justify-center"
          style={{
            zIndex: 2,
            top: '18%',
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(90px, 28vw, 380px)',
            fontWeight: 900,
            color: '#fff',
            opacity: 1,
            lineHeight: 1,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
          }}
        >
          ELIXIR DROP
        </div>

        <div
          className="absolute left-4 top-6 text-xs font-semibold uppercase text-white sm:left-8"
          style={{ zIndex: 60, opacity: 0.9, letterSpacing: '0.18em' }}
        >
          PERFUME GALLERY
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-[11%] flex justify-center" style={{ zIndex: 10 }}>
          <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-white/85 backdrop-blur-sm sm:text-xs">
            Premium Selection
          </div>
        </div>

        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {IMAGES.map((image, index) => {
            const role = getRole(index);
            const itemStyle = getItemStyle(role);

            return (
              <div
                key={image.src}
                className="absolute"
                style={{
                  aspectRatio: '0.72 / 1',
                  transition: [
                    `transform ${TRANSITION}`,
                    `filter ${TRANSITION}`,
                    `opacity ${TRANSITION}`,
                    `left ${TRANSITION}`,
                    `height ${TRANSITION}`,
                    `bottom ${TRANSITION}`,
                  ].join(', '),
                  willChange: 'transform, filter, opacity',
                  ...itemStyle,
                }}
              >
                <div
                  className="absolute inset-x-[14%] bottom-[6%] top-[16%] rounded-[40px]"
                  style={{
                    background: `linear-gradient(180deg, ${image.panel}66 0%, ${image.panel}0F 100%)`,
                    opacity: role === 'center' ? 0.7 : role === 'back' ? 0.18 : 0.32,
                    filter: role === 'center' ? 'blur(18px)' : 'blur(12px)',
                    transform: 'translateY(5%)',
                  }}
                />
                <img
                  src={image.src}
                  alt={image.name}
                  draggable={false}
                  className="relative h-full w-full select-none object-contain object-bottom drop-shadow-[0_28px_50px_rgba(0,0,0,0.28)]"
                />
              </div>
            );
          })}
        </div>

        <div
          className="absolute bottom-6 left-4 max-w-[340px] sm:bottom-20 sm:left-24"
          style={{ zIndex: 60 }}
        >
          <p className="mb-2 text-[11px] font-semibold uppercase text-white/80 sm:mb-3 sm:text-sm" style={{ letterSpacing: '0.24em' }}>
            {activePerfume.accent}
          </p>
          <p
            className="mb-2 text-2xl font-bold uppercase text-white sm:mb-3 sm:text-[34px]"
            style={{ opacity: 0.98, letterSpacing: '-0.02em', lineHeight: 0.95 }}
          >
            {activePerfume.name}
          </p>
          <p className="mb-4 hidden text-xs text-white/85 sm:mb-5 sm:block sm:text-sm" style={{ lineHeight: 1.7 }}>
            {activePerfume.description}
          </p>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              aria-label="Previous perfume"
              onClick={() => navigate('prev')}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white text-white transition duration-150 hover:scale-[1.08] hover:bg-white/10 sm:h-16 sm:w-16"
              style={{ backgroundColor: 'transparent' }}
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>
            <button
              type="button"
              aria-label="Next perfume"
              onClick={() => navigate('next')}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white text-white transition duration-150 hover:scale-[1.08] hover:bg-white/10 sm:h-16 sm:w-16"
              style={{ backgroundColor: 'transparent' }}
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        <a
          href="#discover"
          className="absolute bottom-6 right-4 flex items-center gap-2 text-white no-underline transition-opacity duration-200 hover:opacity-100 sm:bottom-20 sm:right-10 sm:gap-3"
          style={{
            zIndex: 60,
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(20px, 4vw, 56px)',
            fontWeight: 400,
            opacity: 0.95,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            textTransform: 'uppercase',
          }}
        >
          <span>DISCOVER IT</span>
          <ArrowRight className="h-5 w-5 sm:h-8 sm:w-8" strokeWidth={2.25} />
        </a>
      </div>
    </div>
  );
}

export default App;
