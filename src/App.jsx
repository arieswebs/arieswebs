import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star as StarIcon, MessageCircle, Camera, Globe, ArrowRight, Briefcase, Mail } from 'lucide-react';
import './index.css';

const Star = ({ top, left, size, duration, delay }) => (
  <div 
    className="star"
    style={{
      top: `${top}%`,
      left: `${left}%`,
      width: `${size}px`,
      height: `${size}px`,
      '--twinkle-duration': `${duration}s`,
      animationDelay: `-${delay}s`
    }}
  />
);

const Comet = ({ top, left, duration, delay }) => (
  <div 
    className="comet"
    style={{
      top: `${top}%`,
      left: `${left}%`,
      '--duration': `${duration}s`,
      animationDelay: `${delay}s`
    }}
  />
);

export default function App() {
  const [stars, setStars] = useState([]);
  const [comets, setComets] = useState([]);

  useEffect(() => {
    // Generate premium subtle stars
    const newStars = Array.from({ length: 150 }).map(() => ({
      id: Math.random(),
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 10
    }));
    setStars(newStars);

    const newComets = Array.from({ length: 8 }).map(() => ({
      id: Math.random(),
      top: Math.random() * 100 - 20,
      left: Math.random() * 50 + 100,
      duration: Math.random() * 3 + 4,
      delay: Math.random() * 12
    }));
    setComets(newComets);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <>
      <div className="noise-overlay" />
      <div className="ambient-glow" />
      
      {/* Background layer */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        {stars.map(s => <Star key={s.id} {...s} />)}
        {comets.map(c => <Comet key={c.id} {...c} />)}
      </div>

      {/* Content layer */}
      <motion.div 
        className="container" 
        style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '580px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <img src="/logo-new.png" alt="Aries Web Logo" style={{ width: '160px', mixBlendMode: 'screen', transition: 'transform 0.5s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
          <svg style={{ display: 'none', width: '140px', height: '140px', margin: '0 auto', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))' }} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 20 L60 140 L20 180 M100 20 L140 140 L180 180" stroke="url(#paint0_linear)" strokeWidth="3" strokeLinecap="round"/>
            <path d="M100 20 C 130 80 160 50 180 120" stroke="url(#paint0_linear)" strokeWidth="2.5" fill="transparent"/>
            <path d="M100 20 C 70 80 40 50 20 120" stroke="url(#paint0_linear)" strokeWidth="2.5" fill="transparent"/>
            <circle cx="100" cy="20" r="3" fill="#fff"/>
            <defs>
              <linearGradient id="paint0_linear" x1="100" y1="20" x2="100" y2="180" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffffff" />
                <stop offset="1" stopColor="rgba(255,255,255,0.4)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <motion.h1 variants={itemVariants} style={{ fontFamily: '"Cinzel", serif', fontSize: '2.4rem', fontWeight: 500, marginBottom: '0.75rem', textAlign: 'center', letterSpacing: '1.5px', textShadow: '0 4px 12px rgba(0,0,0,0.5)', background: 'linear-gradient(to right, #fff, rgba(255,255,255,0.8))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Where Creativity Meets Horizon
        </motion.h1>
        <motion.p variants={itemVariants} style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2.5rem', lineHeight: 1.6, maxWidth: '85%', fontWeight: 300, letterSpacing: '0.2px' }}>
          Custom software, web development and digital marketing.
        </motion.p>

        <motion.div variants={itemVariants} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <LinkCard icon={<StarIcon size={20} strokeWidth={1.5} />} text="Leave a Google Review" />
          <LinkCard icon={<MessageCircle size={20} strokeWidth={1.5} />} text="WhatsApp Us" />
          <LinkCard icon={<Camera size={20} strokeWidth={1.5} />} text="Follow on Instagram" />
          <LinkCard icon={<Briefcase size={20} strokeWidth={1.5} />} text="Connect on LinkedIn" />
          <LinkCard icon={<Globe size={20} strokeWidth={1.5} />} text="Visit Our Website" />
          <LinkCard icon={<Mail size={20} strokeWidth={1.5} />} text="Email Us" />
        </motion.div>

        <motion.div variants={itemVariants} style={{ marginTop: '3.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)', letterSpacing: '0.5px' }}>
          <p>Your support means the world to us ❤️</p>
          <p style={{ marginTop: '0.75rem', opacity: 0.5, fontSize: '0.75rem' }}>© 2026 Aries Web</p>
        </motion.div>
      </motion.div>
    </>
  );
}

const LinkCard = ({ icon, text }) => (
  <a href="#" className="link-card">
    <div className="icon-wrapper">{icon}</div>
    <span className="link-text">{text}</span>
    <ArrowRight className="arrow" size={20} strokeWidth={1.5} />
  </a>
);
