import Image from 'next/image';
import AnimateIn from '@/components/ui/AnimateIn';
import AsciiArt from '@/components/ui/AsciiArt';
import ParallaxImage from '@/components/ui/ParallaxImage';

export default function AboutPreview({ image }: { image?: string }) {
  const mediaUrl = image || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80";
  const isVideo = mediaUrl.match(/\.(mp4|webm|ogg)$/i);

  return (
    <section className="section" id="about" style={{ background: 'var(--color-bg-secondary)', position: 'relative', overflow: 'hidden' }}>
      <AsciiArt rows={15} cols={40} speed={0.25} color="255, 255, 255" />
      <div className="container about-grid" style={{ position: 'relative', zIndex: 2 }}>
        <div className="about-visual">
          <div className="about-image-wrapper">
            {isVideo ? (
              <video 
                src={mediaUrl} 
                className="about-image"
                muted autoPlay loop playsInline
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <ParallaxImage 
                src={mediaUrl} 
                alt="BIGWEB Team Office" 
                className="about-image"
                speed={0.15}
              />
            )}
            <div className="about-image-overlay" />
            
            {/* Minimal accent lines over the image */}
            <div className="about-accent-line about-accent-top" />
            <div className="about-accent-line about-accent-bottom" />
            <style dangerouslySetInnerHTML={{__html: `
              .about-image-wrapper { transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
              .about-image-wrapper:hover { transform: scale(1.02); }
              .about-image-wrapper:hover .about-image { filter: grayscale(0%); }
              .about-image { transition: filter 0.6s ease; filter: grayscale(20%); }
            `}} />
          </div>
        </div>

        <div className="about-text">
          <AnimateIn>
            <span className="section-label">WHO WE ARE</span>
          </AnimateIn>
          <AnimateIn delay={1}>
            <h2 className="section-headline">
              Built by builders<br />who got tired of<br />building the wrong<br />things.
            </h2>
          </AnimateIn>
          <AnimateIn delay={2}>
            <p style={{ color: 'var(--color-text-primary)', fontSize: '1.1rem', lineHeight: 1.6 }}>BIGWEB Digital was built by people who spent years watching businesses pour money into beautiful websites that did nothing. Who watched agencies celebrate award-winning design while clients&apos; revenue stayed flat.</p>
          </AnimateIn>
          <AnimateIn delay={3}>
            <p style={{ marginTop: 'var(--space-6)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>We made a deliberate choice: stop optimizing for aesthetics and start optimizing for outcomes. Our team combines deep frontend engineering, behavioral UX research, conversion rate optimization, and AI engineering â€” all pointed at one goal. Your revenue.</p>
          </AnimateIn>
          <AnimateIn delay={4}>
            <p style={{ marginTop: 'var(--space-6)', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>We are selective. We take on clients we can genuinely help. We will tell you if you&apos;re not ready for what we offer. And when we do engage â€” we treat your growth like it&apos;s our own.</p>
          </AnimateIn>

          <AnimateIn delay={5}>
            <div className="about-stats">
              <div className="about-stat">
                <span className="about-stat-value">Since 2018</span>
                <span className="about-stat-label">Building elite revenue systems</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-value">Outcomes first</span>
                <span className="about-stat-label">Philosophy since day one</span>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>

      
    </section>
  );
}
