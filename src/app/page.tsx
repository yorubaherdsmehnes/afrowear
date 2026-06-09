'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link'; 

const heroImages = [
  '/hero-cover-1.png',
  '/3.png',
  '/8.png',
  '/11 (1).png',
  '/14.png',
];

// --- HELPER COMPONENT FOR PADDED SCROLLING BORDERS --- //
const VerticalMarquee = ({ reverse }: { reverse?: boolean }) => (
  <div 
    className="flex flex-col w-full h-max gap-8"
    style={{ animation: `slideVertical 100s linear infinite ${reverse ? 'reverse' : 'normal'}` }}
  >
    {[...Array(20)].map((_, i) => (
      <img src="/arstkrt pattern_1.png" alt="pattern" key={i} className="w-full h-auto object-contain shrink-0 opacity-80" />
    ))}
  </div>
);
// -------------------------------------------------------- //

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [currentHeroImageIndex, setCurrentHeroImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  // --- SUPABASE SUBMIT HANDLER --- //
  const handleRequestInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    const { error } = await supabase
      .from('subscribers')
      .insert([{ email }]);

    if (error) {
      console.log("SUPABASE REJECTION REASON:", error); 
      setStatus('error');
      setMessage(error.code === '23505' ? 'Email already on the invite list.' : 'Something went wrong. Try again.');
    } else {
      setStatus('success');
      setEmail('');
    }
  };

  return (
    <main className="min-h-screen lg:h-screen lg:overflow-hidden bg-[#FDFBF7] text-neutral-950 selection:bg-[#cba258] selection:text-white relative flex flex-col py-8 px-8 md:px-16 pb-20">
      
      {/* GLOBAL CSS KEYFRAMES */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideVertical {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
        `
      }} />

      {/* --- THE 2-SIDED SEAMLESS SCROLLING FRAME --- */}
      <div className="fixed top-0 left-0 w-5 h-full z-50 overflow-hidden bg-[#FDFBF7] pointer-events-none flex justify-center">
        <VerticalMarquee />
      </div>
      <div className="fixed top-0 right-0 w-5 h-full z-50 overflow-hidden bg-[#FDFBF7] pointer-events-none flex justify-center">
        <VerticalMarquee reverse />
      </div>

      {/* --- MAIN CONTENT --- */}
      <nav className="relative z-30 flex-shrink-0 flex justify-between items-center pb-6 md:pb-8 max-w-[1600px] mx-auto w-full">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 relative">
            <Image src="/aw-logo.png" alt="AW Logo" fill sizes="40px" className="object-contain" />
          </div>
          <Link href="https://afrowear.world" target="_blank" rel="noopener noreferrer">
          <h2 className="font-bold tracking-tighter text-3xl uppercase hidden sm:block">
            afrowear.world
          </h2>
          </Link>
        </div>
        
        <div className="text-xs uppercase tracking-[0.2em] font-semibold flex gap-2 items-center border border-neutral-950 px-4 py-2 rounded-full">
          <span className="w-2 h-2 bg-[#cba258] rounded-full animate-pulse"></span>
          By Invitation Only
        </div>
      </nav>

      {/* Changed to gap-12 on mobile so the top and bottom have clean breathing room */}
      <div className="relative z-10 flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center max-w-[1600px] mx-auto w-full pb-12 lg:pb-4 justify-between">
        
        {/* Changed h-[20vh] to h-auto so it naturally wraps the content on mobile */}
        <div className="lg:col-span-5 flex flex-col justify-start z-20 max-w-xl h-auto lg:h-full lg:py-10 mt-4 lg:mt-0">
          <p className="text-[#cba258] font-bold tracking-[0.3em] uppercase mb-4 lg:mb-6 text-sm">
            Presents
          </p>
          
          <div className="mb-8 lg:mb-6 lg:pb-16">
            <Link href="https://arstkrt.com" target="_blank" rel="noopener noreferrer">
            <h1 className="font-bankgothic font-black text-6xl md:text-8xl xl:text-[9rem] text-neutral-950 tracking-tighter leading-[0.85] uppercase block">
              ARSTKRT
            </h1>
            </Link>
          </div>

          <div className="w-full">
            <form onSubmit={handleRequestInvite} className="flex flex-col gap-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="REQUEST ACCESS (EMAIL)"
                  required
                  className="w-full pb-3 bg-transparent border-b-2 border-neutral-300 text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 transition-colors rounded-none font-medium uppercase text-xs tracking-widest"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="w-full py-4 bg-neutral-950 text-[#FDFBF7] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#cba258] transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Processing...' : status === 'success' ? 'Application Sent' : 'Submit'}
              </button>
            </form>
            
            {/* Error Message Display */}
            {status === 'error' && (
              <p className="text-xs text-red-500 font-medium tracking-widest uppercase mt-3">
                {message}
              </p>
            )}
          </div>
        </div>

        {/* PHOTOGRAPH SHAPED IMAGE CONTAINER */}
        <div className="lg:col-span-7 w-full h-auto lg:h-full flex justify-center lg:justify-end items-center mb-10 lg:mb-0">
          {/* Added 'relative' back to the wrappers */}
          <div className="relative w-full max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl aspect-[4/5] bg-white p-3 md:p-5 shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500 ease-out">
            {/* Added 'overflow-hidden' and 'relative' to contain your scaled up image */}
            <div className="relative w-full h-full bg-neutral-200 overflow-hidden">
              <Image 
                src={heroImages[currentHeroImageIndex]} 
                alt="Afrowear Editorial" 
                fill 
                sizes="(max-width: 768px) 130vw, (max-width: 1200px) 65vw, 50vw"
                className="object-cover object-top h-[150%] w-[150%] transition-opacity duration-1000 ease-in-out" 
                priority
              />
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER PINNED TO THE BOTTOM OF THE PAGE DOCUMENT */}
      <div className="absolute bottom-0 p-4 left-0 w-full bg-[#FDFBF7] overflow-hidden z-20 flex items-center pointer-events-none">
        <div className="whitespace-nowrap animate-[pulse_4s_ease-in-out_infinite] text-neutral-400 text-[10px] tracking-[0.3em] uppercase font-bold text-center w-full">
          // afrowear.com.ng // Not 4 Sale // afrowear.com.ng // Earn The Fit //
        </div>
      </div>

    </main>
  );
}