'use client'

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Pause, Play } from 'lucide-react';
import { gsap } from 'gsap';

const testimonials = [
  {
    id: 1,
    quote: "Working with this team transformed our entire digital strategy. They didn't just build a website—they built a revenue-generating machine that exceeded all our KPIs.",
    author: "Sarah Chen",
    role: "CEO",
    company: "TechVision Inc",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=90",
    rating: 5,
    metric: "300% ROI Increase",
  },
  {
    id: 2,
    quote: "The level of craftsmanship and attention to detail is unmatched. Every pixel perfect, every interaction smooth. Our users have never been more engaged.",
    author: "Michael Rodriguez",
    role: "VP of Product",
    company: "CloudScale",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=90",
    rating: 5,
    metric: "98% User Satisfaction",
  },
  {
    id: 3,
    quote: "From discovery to launch, the process was seamless. They understood our vision and delivered beyond our expectations. Best agency we've worked with, hands down.",
    author: "Emily Thompson",
    role: "Marketing Director",
    company: "GrowthLab",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=90",
    rating: 5,
    metric: "2 Week Launch",
  },
  {
    id: 4,
    quote: "The results speak for themselves. Our conversion rate tripled, bounce rate dropped significantly, and revenue is up 250%. This investment paid for itself in 3 months.",
    author: "David Park",
    role: "Founder",
    company: "StartupHub",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=90",
    rating: 5,
    metric: "250% Revenue Growth",
  },
];

const CarouselTestimonialsBookfold = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!isPaused && !isTransitioning) {
        handleNext();
      }
    }, 6000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, activeIndex, isTransitioning]);

  const handleNext = () => {
    if (isTransitioning) return;
    const next = (activeIndex + 1) % testimonials.length;
    animateCardFlip(next);
  };

  const handlePrevious = () => {
    if (isTransitioning) return;
    const prev = activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1;
    animateCardFlip(prev);
  };

  const handleSlideClick = (index: number) => {
    if (index !== activeIndex && !isTransitioning) {
      animateCardFlip(index);
    }
  };

  const animateCardFlip = (nextIdx: number) => {
    setIsTransitioning(true);
    setNextIndex(nextIdx);

    if (!rightCardRef.current || !leftCardRef.current) return;

    const tl = gsap.timeline({
      onStart: () => {
        gsap.set(rightCardRef.current, { rotateY: 0 });
      },
      onComplete: () => {
        setActiveIndex(nextIdx);
        setIsTransitioning(false);
        gsap.set(rightCardRef.current, { rotateY: 0 });
      }
    });

    // Darken left card
    tl.to(leftCardRef.current, {
      filter: 'brightness(0.8)',
      duration: 0.7,
      ease: 'power1.inOut',
    }, 0);

    // Flip right card
    tl.to(rightCardRef.current, {
      rotateY: -180,
      duration: 1.2,
      ease: 'power2.inOut',
    }, 0);

    // Restore left card
    tl.to(leftCardRef.current, {
      filter: 'brightness(1)',
      duration: 0.6,
      ease: 'power1.inOut',
    }, 0.6);
  };

  const activeTestimonial = testimonials[activeIndex];
  const currentTestimonial = testimonials[activeIndex];
  const nextTestimonial = testimonials[nextIndex];

  return (
    <section className="py-32 bg-gradient-to-b from-background via-accent/5 to-background relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm uppercase tracking-widest mb-4 font-semibold">Client Success Stories</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Here's what industry leaders have to say about working with us.
          </p>
        </motion.div>

        {/* Bookfold Testimonial Card */}
        <div className="max-w-5xl mx-auto" style={{ perspective: '2000px' }}>
          <div className="relative h-[500px]">
            {/* Base/Next Card (Underneath) */}
            <div className="absolute inset-0 z-0">
              <TestimonialCard 
                testimonial={isTransitioning ? nextTestimonial : activeTestimonial} 
              />
            </div>

            {/* Split Cards - Only during transition */}
            {isTransitioning && (
              <div className="absolute inset-0 z-10">
                {/* Left Card (Static) */}
                <div
                  ref={leftCardRef}
                  className="absolute inset-y-0 left-0 w-[calc(50%-12px)]"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="relative w-full h-full overflow-hidden bg-card border border-border rounded-l-2xl">
                    <TestimonialCardHalf 
                      testimonial={currentTestimonial} 
                      half="left"
                    />
                    {/* Spine shadow */}
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/20 to-transparent" />
                  </div>
                </div>

                {/* Right Card (Flips) */}
                <div
                  ref={rightCardRef}
                  className="absolute inset-y-0 left-[calc(50%+12px)] w-[calc(50%-12px)] z-20"
                  style={{ transformStyle: 'preserve-3d', transformOrigin: 'left center' }}
                >
                  {/* Front Face */}
                  <div
                    className="absolute inset-0 w-full h-full overflow-hidden bg-card border border-border rounded-r-2xl"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <TestimonialCardHalf 
                      testimonial={currentTestimonial} 
                      half="right"
                    />
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-black/30 to-transparent" />
                  </div>

                  {/* Back Face */}
                  <div
                    className="absolute inset-0 w-full h-full overflow-hidden bg-card border border-border rounded-r-2xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg) scaleX(-1)'
                    }}
                  >
                    <TestimonialCardHalf 
                      testimonial={nextTestimonial} 
                      half="left"
                    />
                    <div className="absolute inset-0" style={{ boxShadow: 'inset 20px 0 40px rgba(0,0,0,0.4)' }} />
                  </div>
                </div>

                {/* Center Spine */}
                <div className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2 z-30 bg-gradient-to-r from-background/80 via-border to-background/80 backdrop-blur-sm rounded" />
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-12">
          {/* Indicators */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideClick(index)}
                className={`h-2 transition-all duration-300 rounded-full ${
                  index === activeIndex ? 'w-8 bg-accent' : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Pause/Play */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="w-10 h-10 rounded-full border-2 border-accent/40 hover:border-accent hover:bg-accent/10 flex items-center justify-center text-accent transition-all hover:scale-110"
            aria-label={isPaused ? 'Play' : 'Pause'}
          >
            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </section>
  );
};

// Full Testimonial Card
const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-12 h-full flex flex-col justify-between shadow-xl">
      <div>
        <Quote className="w-12 h-12 text-accent mb-6" />
        <p className="text-2xl md:text-3xl font-medium mb-8 leading-relaxed text-foreground">
          "{testimonial.quote}"
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={testimonial.image}
            alt={testimonial.author}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h4 className="font-bold text-lg text-foreground">{testimonial.author}</h4>
            <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
            <div className="flex gap-1 mt-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-3xl font-bold text-accent">{testimonial.metric.split(' ')[0]}</div>
          <div className="text-sm text-muted-foreground">{testimonial.metric.split(' ').slice(1).join(' ')}</div>
        </div>
      </div>
    </div>
  );
};

// Half Testimonial Card (for bookfold effect)
const TestimonialCardHalf = ({ testimonial, half }: { testimonial: typeof testimonials[0], half: 'left' | 'right' }) => {
  return (
    <div className="p-12 h-full flex flex-col justify-between">
      {half === 'left' ? (
        <>
          <div>
            <Quote className="w-12 h-12 text-accent mb-6" />
            <p className="text-2xl md:text-3xl font-medium leading-relaxed text-foreground">
              "{testimonial.quote.substring(0, testimonial.quote.length / 2)}
            </p>
          </div>
        </>
      ) : (
        <>
          <div>
            <p className="text-2xl md:text-3xl font-medium mb-8 leading-relaxed text-foreground">
              {testimonial.quote.substring(testimonial.quote.length / 2)}"
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={testimonial.image}
                alt={testimonial.author}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="font-bold text-lg text-foreground">{testimonial.author}</h4>
                <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                <div className="flex gap-1 mt-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-accent">{testimonial.metric.split(' ')[0]}</div>
              <div className="text-sm text-muted-foreground">{testimonial.metric.split(' ').slice(1).join(' ')}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CarouselTestimonialsBookfold;
