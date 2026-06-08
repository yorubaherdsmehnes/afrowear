'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient'; // <-- Supabase imported here

const heroImages = [
  '/hero-cover-1.png',
  '/3.png',
  '/5.png',
  '/6.png',
  '/20.png',
];

// --- HELPER COMPONENTS FOR PADDED SCROLLING BORDERS --- //
const HorizontalMarquee = ({ reverse }: { reverse?: boolean }) => (
  <div 
    className="flex h-full w-max gap-8"
    style={{ animation: `slideHorizontal 40s linear infinite ${reverse ? 'reverse' : 'normal'}` }}
  >
    {[...Array(20)].map((_, i) => (
      <img src="/arstkrt pattern.png" alt="pattern" key={i} className="h-full w-auto object-contain shrink-0 opacity-80" />
    ))}
  </div>
);

const VerticalMarquee = ({ reverse }: { reverse?: boolean }) => (
  <div 
    className="flex flex-col w-full h-max gap-8"
    // CHANGED: 40s is now 100s for a much slower, luxurious crawl
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
  const [message, setMessage] = useState(''); // <-- Added state for feedback messages
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
      // ADD THIS LINE RIGHT HERE:
      console.log("SUPABASE REJECTION REASON:", error); 
      
      setStatus('error');
      setMessage(error.code === '23505' ? 'Email already on the invite list.' : 'Something went wrong. Try again.');
    } else {
      setStatus('success');
      setEmail('');
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-neutral-950 selection:bg-[#cba258] selection:text-white relative overflow-hidden flex flex-col py-10 px-12 md:px-16">
      
      {/* GLOBAL CSS KEYFRAMES */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideHorizontal {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes slideVertical {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
        `
      }} />

      {/* --- THE 4-SIDED SEAMLESS SCROLLING FRAME --- */}
      <div className="fixed top-0 left-0 w-full h-5 z-50 overflow-hidden bg-[#FDFBF7] pointer-events-none flex items-center">
        <HorizontalMarquee />
      </div>
      <div className="fixed bottom-0 left-0 w-full h-5 z-50 overflow-hidden bg-[#FDFBF7] pointer-events-none flex items-center">
        <HorizontalMarquee reverse />
      </div>
      <div className="fixed top-0 left-0 w-5 h-full z-50 overflow-hidden bg-[#FDFBF7] pointer-events-none flex justify-center">
        <VerticalMarquee />
      </div>
      <div className="fixed top-0 right-0 w-5 h-full z-50 overflow-hidden bg-[#FDFBF7] pointer-events-none flex justify-center">
        <VerticalMarquee reverse />
      </div>

      {/* --- MAIN CONTENT --- */}
      <nav className="relative z-30 flex justify-between items-center pb-6 md:pb-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 relative invert">
            <Image src="/aw-logo.png" alt="AW Logo" fill className="object-contain" />
          </div>
          <span className="font-bold tracking-tighter text-lg uppercase hidden sm:block">
            afrowear.com.ng
          </span>
        </div>
        
        <div className="text-xs uppercase tracking-[0.2em] font-semibold flex gap-2 items-center border border-neutral-950 px-4 py-2 rounded-full">
          <span className="w-2 h-2 bg-[#cba258] rounded-full animate-pulse"></span>
          By Invitation Only
        </div>
      </nav>

      <div className="relative z-10 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-[1600px] mx-auto w-full pb-6">
        
        <div className="lg:col-span-5 flex flex-col justify-center pt-4 lg:pt-0 z-20 max-w-xl">
          <p className="text-[#cba258] font-bold tracking-[0.3em] uppercase mb-6 text-sm">
            Earn the Fit. (No be for everybody!)
          </p>
          
          <h1 className="font-serif text-6xl md:text-8xl xl:text-9xl text-neutral-950 tracking-tighter leading-[0.85] mb-8 uppercase relative">
            Afro<br />
            <span className="italic font-light pr-8">Wear</span>
            <span className="absolute -bottom-6 left-1 text-xs md:text-sm font-sans tracking-[0.2em] font-bold">.com.ng</span>
          </h1>
          
          <p className="text-base md:text-lg text-neutral-600 font-light leading-relaxed mb-10">
            Where streets speak royalty. A curated digital and print archive deconstructing contemporary Nigerian fashion.
          </p>

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

        <div className="lg:col-span-7 relative h-[75vh] lg:h-[85vh] mt-10 lg:mt-0 flex justify-end items-center bg-neutral-200">
          <div className="relative w-full h-full">
            <Image 
              src={heroImages[currentHeroImageIndex]} 
              alt="Afrowear Editorial" 
              fill 
              className="object-cover object-top shadow-2xl transition-opacity duration-1000 ease-in-out" 
              priority
            />
            <div className="absolute -inset-4 border border-neutral-200 pointer-events-none hidden lg:block"></div>
          </div>
        </div>

      </div>

      <div className="w-full h-8 overflow-hidden bg-[#FDFBF7] z-20 flex items-center mt-auto">
        <div className="whitespace-nowrap animate-[pulse_4s_ease-in-out_infinite] text-neutral-400 text-[10px] tracking-[0.3em] uppercase font-bold text-center w-full">
          // afrowear.com.ng // Not 4 Sale // afrowear.com.ng // Earn The Fit //
        </div>
      </div>

    </main>
  );
}