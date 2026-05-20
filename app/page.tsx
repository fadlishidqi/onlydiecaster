import { ArrowRight, Flame, Tag, Truck, Star, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export const revalidate = 60;

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: activeCollections } = await supabase
    .from('collections')
    .select('id, name, brand, description, image_url')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(4);

  return (
    <div className="flex flex-col bg-[#FAF8F5] text-black selection:bg-[#FDE047] selection:text-black">

      {/* Hero Section dengan video background */}
      <section className="relative flex flex-col items-center text-center px-6 pt-32 pb-0 text-white min-h-screen">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="/bg-racing.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-zinc-950/70" />
        </div>

        {/* Decorative shapes */}
        <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
          <div className="absolute top-[5%] left-[2%] w-32 h-32 bg-[#FF006E] border-[4px] border-black shadow-[8px_8px_0px_0px_#000] rotate-6 animate-float" />
          <div className="absolute top-[40%] right-[-3%] w-48 h-48 bg-[#00FF9F] border-[4px] border-black shadow-[8px_8px_0px_0px_#000] -rotate-12 animate-float" style={{ animationDelay: '-1s' }} />
          <div className="absolute top-[20%] right-[20%] w-16 h-16 bg-[#FDE047] border-[3px] border-black shadow-[6px_6px_0px_0px_#000] rotate-45 animate-bounce-subtle" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center gap-8 flex-1 w-full max-w-5xl py-12">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[1.0] uppercase italic text-white drop-shadow-[6px_6px_0px_#000] animate-fade-in-up">
            Build Your Own <br />
            <span className="bg-[#FDE047] px-5 py-2 border-[4px] border-black shadow-[8px_8px_0px_0px_#000] text-black inline-block transform -rotate-3 hover:rotate-0 transition-transform duration-100 cursor-default rounded-[4px]">EMPIRE</span> <br />
            of DIECAST.
          </h1>

          <div className="max-w-2xl space-y-3">
            <p className="text-lg md:text-2xl text-black font-black leading-tight bg-[#00FF9F] px-4 py-2 border-[3px] border-black shadow-[6px_6px_0px_0px_#000] inline-block transform rotate-1 uppercase">
              MARKETPLACE JUALAN DIECAST
            </p>
            <p className="text-base md:text-xl text-white font-black leading-tight bg-[#FF006E] px-3 py-2 block border-[3px] border-black shadow-[6px_6px_0px_0px_#000] uppercase">
              Ala Only Diecaster Santuy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <Link href="/login" className="neo-brutal-btn-yellow text-lg px-8 py-4 inline-flex items-center justify-center">
              GET STARTED <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
            <button className="bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_#000] font-black uppercase tracking-wider px-8 py-4 transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_#000] text-black text-lg rounded-[4px]">
              SHOWCASE
            </button>
          </div>
        </div>

        {/* Brand Carousel — tepat di bawah hero, masih dalam section video */}
        <div className="relative z-10 w-full py-8 overflow-hidden border-y-[6px] border-black bg-[#FDE047] transform -rotate-2 scale-105 shadow-[0_8px_0px_#000]">
            <div className="flex animate-scroll gap-8 md:gap-16 items-center min-w-[200%]">
                {[
                    'HOT WHEELS', 'MATCHBOX', 'TOMICA', 'MINI GT', 'TARMAC WORKS', 'INNO64', 'MAJORETTE', 'AUTOART',
                    'HOT WHEELS', 'MATCHBOX', 'TOMICA', 'MINI GT', 'TARMAC WORKS', 'INNO64', 'MAJORETTE', 'AUTOART'
                ].map((brand, i) => (
                    <span key={i} className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter whitespace-nowrap text-black">
                        {brand}
                    </span>
                ))}
            </div>
        </div>
      </section>

      {/* Konten di bawah video — background putih */}
      <main className="relative flex flex-col items-center px-6 bg-[#FAF8F5]">

        {/* Scattered bg cars */}
        <div className="hidden xl:block">
          {([
            { type: 'ferrari', color: 'bg-[#FF006E]', top: '4%',  left:  '1%',   rotate: 0    },
            { type: 'skyline', color: 'bg-zinc-800',  top: '28%', left:  '0%',   rotate: -18  },
            { type: 'supra',   color: 'bg-[#00FF9F]', top: '57%', left:  '1.5%', rotate: 12   },
            { type: 'porsche', color: 'bg-zinc-800',  top: '82%', left:  '0.5%', rotate: -8   },
            { type: 'lambo',   color: 'bg-[#FDE047]', top: '8%',  right: '1%',   rotate: 15   },
            { type: 'rwb',     color: 'bg-[#0066FF]', top: '38%', right: '0%',   rotate: -22  },
            { type: 'ferrari', color: 'bg-[#00FF9F]', top: '65%', right: '1.5%', rotate: 8    },
            { type: 'supra',   color: 'bg-[#FF006E]', top: '88%', right: '0.5%', rotate: -14  },
          ] as { type: CarType; color: string; top: string; left?: string; right?: string; rotate: number }[]).map((c, i) => (
            <div
              key={i}
              className="absolute pointer-events-none"
              style={{
                top: c.top,
                ...(c.left  !== undefined ? { left:  c.left  } : {}),
                ...(c.right !== undefined ? { right: c.right } : {}),
                transform: `rotate(${c.rotate}deg)`,
                opacity: 1,
              }}
            >
              <NeoBrutalCar type={c.type} color={c.color} animated />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <section className="w-full max-w-5xl py-16">

          {/* Section header */}
          <div className="flex flex-col items-center mb-10 gap-3">
            <span className="bg-black text-[#FDE047] font-black uppercase italic text-xs px-4 py-1 border-[2px] border-[#FDE047] tracking-widest shadow-[3px_3px_0px_0px_#FDE047]">
              WHY DIECASTER SANTUY?
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase italic text-center leading-tight">
              Bukan Sekedar<br />
              <span className="bg-[#FF006E] text-white px-3 border-[3px] border-black shadow-[6px_6px_0px_0px_#000] inline-block rotate-[-1deg]">Jual Beli Biasa.</span>
            </h2>
          </div>

          {/* Big CTA banner */}
          <div className="relative bg-[#0066FF] border-[5px] border-black shadow-[10px_10px_0px_0px_#000] p-8 md:p-10 mb-6 overflow-hidden rotate-[0.5deg]">
            {/* Decorative shapes — clipped inside overflow-hidden, won't clash */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#FDE047] border-l-[4px] border-b-[4px] border-black" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
            <div className="absolute bottom-0 left-0 w-14 h-14 bg-[#00FF9F] border-r-[4px] border-t-[4px] border-black" style={{ clipPath: 'polygon(0 100%, 0 0, 100% 100%)' }} />
            <div className="relative z-10 flex flex-col md:flex-row items-start justify-between gap-8">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-4">
                  <Flame className="w-6 h-6 text-[#FDE047] shrink-0" />
                  <span className="bg-[#FDE047] text-black font-black uppercase italic text-xs px-3 py-1 border-[2px] border-black tracking-widest">HOT DEAL</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black uppercase italic text-white leading-tight mb-3">
                  Koleksi Langka<br />Harga Miring.
                </h3>
                <p className="text-black font-black text-sm uppercase tracking-wide max-w-sm leading-relaxed">
                  Temukan Hot Wheels, Mini GT, Tomica edisi terbatas sebelum kehabisan — langsung dari kolektor ke kolektor.
                </p>
              </div>
              <div className="shrink-0 md:self-center">
                <Link href="/store" className="bg-[#FDE047] text-black font-black uppercase italic px-8 py-5 border-[4px] border-black shadow-[8px_8px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[5px_5px_0px_0px_#000] transition-all text-xl flex items-center gap-3 whitespace-nowrap">
                  GASKEUN <ArrowRight className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>

          {/* 3 mini CTA cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1 */}
            <div className="bg-[#00FF9F] border-[4px] border-black shadow-[8px_8px_0px_0px_#000] p-6 flex flex-col gap-4 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[5px_5px_0px_0px_#000] transition-all group rotate-[-0.5deg]">
              <div className="w-14 h-14 bg-black flex items-center justify-center border-[3px] border-black shadow-[4px_4px_0px_0px_#000]">
                <Tag className="w-7 h-7 text-[#00FF9F]" />
              </div>
              <div>
                <p className="text-xs font-black uppercase italic text-black/60 tracking-widest mb-1">Harga Transparan</p>
                <h4 className="text-2xl font-black uppercase italic text-black leading-tight">Gak Ada<br />Harga Gelap.</h4>
              </div>
              <p className="text-black font-black text-sm leading-snug">
                Setiap listing dipajang jelas. Bandingkan harga, cek kondisi, deal langsung. No drama.
              </p>
              <Link href="/store" className="mt-auto font-black uppercase italic text-sm underline underline-offset-4 text-black flex items-center gap-1 group-hover:gap-3 transition-all">
                Lihat Store <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2 — featured, larger feel */}
            <div className="bg-[#FDE047] border-[4px] border-black shadow-[8px_8px_0px_0px_#000] p-6 flex flex-col gap-4 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[5px_5px_0px_0px_#000] transition-all group rotate-[0.5deg] md:-mt-3">
              <div className="w-14 h-14 bg-black flex items-center justify-center border-[3px] border-black shadow-[4px_4px_0px_0px_#000]">
                <Star className="w-7 h-7 text-[#FDE047]" />
              </div>
              <div>
                <p className="text-xs font-black uppercase italic text-black/60 tracking-widest mb-1">Komunitas Kolektor</p>
                <h4 className="text-2xl font-black uppercase italic text-black leading-tight">Sesama<br />Diecaster.</h4>
              </div>
              <p className="text-black font-black text-sm leading-snug">
                Beli & jual di komunitas yang ngerti nilai koleksi. Bukan reseller nakal, bukan scalper.
              </p>
              <Link href="/login" className="mt-auto font-black uppercase italic text-sm underline underline-offset-4 text-black flex items-center gap-1 group-hover:gap-3 transition-all">
                Join Sekarang <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-[#FF006E] border-[4px] border-black shadow-[8px_8px_0px_0px_#000] p-6 flex flex-col gap-4 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[5px_5px_0px_0px_#000] transition-all group rotate-[-0.5deg]">
              <div className="w-14 h-14 bg-black flex items-center justify-center border-[3px] border-black shadow-[4px_4px_0px_0px_#000]">
                <Truck className="w-7 h-7 text-[#FF006E]" />
              </div>
              <div>
                <p className="text-xs font-black uppercase italic text-white/70 tracking-widest mb-1">Pengiriman Aman</p>
                <h4 className="text-2xl font-black uppercase italic text-white leading-tight">Blister Utuh<br />Sampai Tujuan.</h4>
              </div>
              <p className="text-white font-black text-sm leading-snug">
                Packing bubble wrap double layer. Koleksi tiba mulus, nggak ada yang patah atau penyok.
              </p>
              <Link href="/store" className="mt-auto font-black uppercase italic text-sm underline underline-offset-4 text-white flex items-center gap-1 group-hover:gap-3 transition-all">
                Order Sekarang <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Comic Video Section */}
        <section className="w-full max-w-5xl py-8">

          {/* ── VIDEO CARD ── */}
          <div className="border-[6px] border-black shadow-[14px_14px_0px_0px_#000] overflow-hidden bg-black">
            {/* Video */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full aspect-video block object-cover"
            >
              <source src="/komikcta.mp4" type="video/mp4" />
            </video>

            {/* Action label */}
            <div className="absolute top-4 left-4 z-20 rotate-[-2deg]">
              <span className="bg-[#FF006E] text-white font-black uppercase italic text-sm px-3 py-1 border-[3px] border-black shadow-[4px_4px_0px_0px_#000] tracking-widest">
                SPEED FORCE!!
              </span>
            </div>

          </div>
        </section>

        {/* Showcase Preview */}
        <section className="w-full max-w-6xl py-24">
          <div className="bg-white border-[8px] border-black shadow-[16px_16px_0px_0px_#000] rounded-[4px] p-10 md:p-20 relative overflow-hidden group">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20">
              <div className="space-y-6">
                <h2 className="text-6xl md:text-8xl font-black uppercase italic text-white leading-none bg-[#0066FF] px-6 py-2 border-[4px] border-black inline-block shadow-[8px_8px_0px_0px_#000]">CEKIDOT!</h2>
                <p className="text-black font-black text-2xl md:text-3xl max-w-xl">
                  Jelajahi koleksi Diecast Miniscale pilihan dari garasi saya.
                </p>
              </div>
              <button className="bg-[#FDE047] text-black font-black uppercase px-10 py-5 border-[4px] border-black shadow-[8px_8px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_#000] transition-all rounded-[4px] text-xl">
                EXPLORE ALL <ArrowRight className="inline-block ml-3 w-8 h-8" />
              </button>
            </div>
            
            {activeCollections && activeCollections.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {activeCollections.map((item, i) => (
                  <div key={item.id} className="bg-white border-[6px] border-black shadow-[12px_12px_0px_0px_#000] relative overflow-hidden group/item hover:shadow-[8px_8px_0px_0px_#000] transition-all rounded-[4px]">
                    <div className="aspect-square relative overflow-hidden bg-zinc-100">
                      {item.image_url
                        ? <img src={item.image_url} alt={item.name} className="w-full h-full object-cover grayscale contrast-125 group-hover/item:grayscale-0 group-hover/item:contrast-100 transition-all duration-300" />
                        : <div className="w-full h-full flex items-center justify-center bg-zinc-200"><span className="text-zinc-400 font-black text-4xl italic">#{String(i+1).padStart(2,'0')}</span></div>
                      }
                      <span className="absolute top-3 left-3 text-white bg-black px-3 py-1 font-black text-2xl italic border-[3px] border-white shadow-[4px_4px_0px_0px_#000]">#{String(i+1).padStart(2,'0')}</span>
                    </div>
                    <div className="p-4 border-t-[4px] border-black">
                      <span className="bg-[#0066FF] text-white text-[10px] font-black uppercase italic px-2 py-0.5 border-[2px] border-black inline-block mb-1">{item.brand}</span>
                      <p className="font-black uppercase italic text-base leading-tight text-black">{item.name}</p>
                      {item.description && <p className="text-zinc-500 text-xs mt-1 line-clamp-2">{item.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {[1,2,3,4].map(i => (
                  <div key={i} className="aspect-square bg-zinc-100 border-[6px] border-black shadow-[12px_12px_0px_0px_#000] flex items-center justify-center rounded-[4px]">
                    <span className="text-zinc-300 font-black text-4xl italic">#{String(i).padStart(2,'0')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t-[5px] border-black bg-black text-white">

        {/* Main footer content */}
        <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand col */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[#FDE047] text-2xl font-black uppercase italic tracking-tighter leading-none">
              DIECASTER<br />SANTUY
            </h3>
            <p className="text-zinc-400 font-black text-xs uppercase tracking-wide leading-relaxed">
              Marketplace diecast miniatur skala pilihan.<br />
              Dari kolektor, untuk kolektor.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-2">
              {[
                { icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>, label: '@diecastersantuy' },
                { icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.2 2.8 12 2.8 12 2.8s-4.2 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.2.3 4.2s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.5 21.7 12 21.7 12 21.7s4.2 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.2v-2C23.3 9.1 23 7 23 7zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z"/></svg>, label: 'YouTube' },
                {
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
                    </svg>
                  ),
                  label: 'TikTok'
                },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  title={label}
                  className="w-9 h-9 bg-zinc-800 border-[2px] border-zinc-700 flex items-center justify-center hover:bg-[#FDE047] hover:text-black hover:border-black transition-all"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Links col */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[#FDE047] font-black uppercase italic text-xs tracking-widest mb-1 border-b-[2px] border-zinc-800 pb-2">
              NAVIGASI
            </h4>
            {[
              { label: 'Home',       href: '/'           },
              { label: 'Store',      href: '/store'      },
              { label: 'Collection', href: '/collection' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-zinc-400 font-black uppercase text-xs tracking-wide hover:text-[#FDE047] transition-colors flex items-center gap-2 group"
              >
                <span className="w-1.5 h-1.5 bg-zinc-700 group-hover:bg-[#FDE047] transition-colors" />
                {label}
              </Link>
            ))}
          </div>

          {/* Contact col */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[#FDE047] font-black uppercase italic text-xs tracking-widest mb-1 border-b-[2px] border-zinc-800 pb-2">
              KONTAK
            </h4>
            <div className="flex items-start gap-3 text-zinc-400">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[#FDE047]" />
              <span className="font-black text-xs uppercase tracking-wide leading-relaxed">Semarang, Jawa Tengah<br />Indonesia</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-400">
              <Phone className="w-4 h-4 shrink-0 text-[#FDE047]" />
              <span className="font-black text-xs uppercase tracking-wide">+62 812-XXXX-XXXX</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-400">
              <Mail className="w-4 h-4 shrink-0 text-[#FDE047]" />
              <span className="font-black text-xs uppercase tracking-wide">hello@diecastersantuy.id</span>
            </div>
            <div className="mt-3 bg-[#FDE047] text-black font-black uppercase italic text-xs px-4 py-2 border-[2px] border-zinc-700 inline-block self-start shadow-[3px_3px_0px_0px_#FDE047]/30">
              MON – SAT &nbsp;·&nbsp; 09.00 – 21.00 WIB
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t-[3px] border-zinc-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-5xl mx-auto">
          <span className="text-zinc-600 font-black uppercase italic text-xs tracking-widest">
            © 2026 Diecaster Santuy — All rights reserved.
          </span>
          <span className="text-zinc-700 font-black uppercase italic text-xs tracking-widest">
            Dibuat dengan ❤ untuk kolektor santuy.
          </span>
        </div>
      </footer>
    </div>
  );
}

type CarType = 'porsche' | 'ferrari' | 'lambo' | 'supra' | 'skyline' | 'rwb';

function NeoBrutalCar({ type, color, animated = false }: { type: CarType; color: string; animated?: boolean }) {
  const colorMap: Record<string, string> = {
    'bg-white': '#ffffff', 'bg-[#FDE047]': '#FDE047', 'bg-[#00FF9F]': '#00FF9F',
    'bg-[#FB923C]': '#FB923C', 'bg-[#0066FF]': '#0066FF', 'bg-[#FF006E]': '#FF006E',
    'bg-zinc-800': '#27272a', 'bg-zinc-500': '#71717a',
  };
  const f = colorMap[color] ?? '#ffffff';

  // Spinning wheel with spokes
  const wheel = (cx: number, cy: number, r: number, dur: number) => (
    <g key={`w${cx}`}>
      <circle cx={cx} cy={cy} r={r} fill="#111" stroke="#fff" strokeWidth="2.5"/>
      <g>
        {animated && <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur={`${dur}s`} repeatCount="indefinite"/>}
        <line x1={cx-(r-2)} y1={cy} x2={cx+(r-2)} y2={cy} stroke="#555" strokeWidth="2"/>
        <line x1={cx} y1={cy-(r-2)} x2={cx} y2={cy+(r-2)} stroke="#555" strokeWidth="2"/>
        <line x1={cx-(r-2)*0.7} y1={cy-(r-2)*0.7} x2={cx+(r-2)*0.7} y2={cy+(r-2)*0.7} stroke="#444" strokeWidth="1.5"/>
        <line x1={cx+(r-2)*0.7} y1={cy-(r-2)*0.7} x2={cx-(r-2)*0.7} y2={cy+(r-2)*0.7} stroke="#444" strokeWidth="1.5"/>
      </g>
      <circle cx={cx} cy={cy} r={r*0.28} fill="#333"/>
    </g>
  );

  // Exhaust smoke puffs (drift left+up from exhaust point)
  const smoke = (ex: number, ey: number, count: number, dur: number) =>
    animated ? Array.from({ length: count }, (_, i) => {
      const begin = `${((i * dur) / count).toFixed(2)}s`;
      return (
        <ellipse key={i} cx={ex} cy={ey} rx="0" ry="0" fill="rgba(70,70,70,0.6)">
          <animate attributeName="rx"      from="0"         to="11"         dur={`${dur}s`} begin={begin} repeatCount="indefinite"/>
          <animate attributeName="ry"      from="0"         to="8"          dur={`${dur}s`} begin={begin} repeatCount="indefinite"/>
          <animate attributeName="cx"      from={`${ex}`}   to={`${ex-30}`} dur={`${dur}s`} begin={begin} repeatCount="indefinite"/>
          <animate attributeName="cy"      from={`${ey}`}   to={`${ey-14}`} dur={`${dur}s`} begin={begin} repeatCount="indefinite"/>
          <animate attributeName="opacity" from="0.75"      to="0"          dur={`${dur}s`} begin={begin} repeatCount="indefinite"/>
        </ellipse>
      );
    }) : null;

  // Animation configs per car type
  const cfg: Record<CarType, { wd: number; sd: number; sc: number }> = {
    ferrari: { wd: 0.25, sd: 0.70, sc: 3 },
    lambo:   { wd: 0.18, sd: 0.55, sc: 4 },
    porsche: { wd: 0.42, sd: 1.10, sc: 2 },
    supra:   { wd: 0.30, sd: 0.85, sc: 3 },
    skyline: { wd: 0.27, sd: 0.65, sc: 4 },
    rwb:     { wd: 0.20, sd: 0.50, sc: 5 },
  };
  const { wd, sd, sc } = cfg[type];

  const svgs: Record<CarType, React.ReactElement> = {
    ferrari: (
      <svg width="145" height="52" viewBox="0 0 145 52" overflow="visible">
        {smoke(8, 41, sc, sd)}
        <polygon points="0,48 6,38 18,33 46,30 60,17 84,15 90,27 106,27 114,33 138,36 145,44 145,48" fill={f} stroke="#000" strokeWidth="2.5"/>
        <polygon points="62,17 82,15 88,27 66,27" fill="#7dd3fc" stroke="#000" strokeWidth="2"/>
        <rect x="132" y="28" width="10" height="6" fill={f} stroke="#000" strokeWidth="2.5"/>
        <rect x="0" y="44" width="12" height="3" fill="#FDE047" stroke="#000" strokeWidth="1.5"/>
        <rect x="133" y="42" width="8" height="3" fill="#ef4444" stroke="#000" strokeWidth="1.5"/>
        {wheel(28, 46, 9, wd)}{wheel(116, 46, 9, wd)}
      </svg>
    ),
    lambo: (
      <svg width="132" height="48" viewBox="0 0 132 48" overflow="visible">
        {smoke(6, 39, sc, sd)}
        <polygon points="2,44 4,32 30,22 38,16 92,16 98,22 122,26 130,36 132,44" fill={f} stroke="#000" strokeWidth="2.5"/>
        <polygon points="39,16 90,16 94,23 42,23" fill="#7dd3fc" stroke="#000" strokeWidth="2"/>
        <polygon points="0,36 4,32 4,36" fill="#FDE047" stroke="#000" strokeWidth="1.5"/>
        <rect x="124" y="30" width="7" height="4" fill="#ef4444" stroke="#000" strokeWidth="1.5"/>
        {wheel(27, 43, 9, wd)}{wheel(106, 43, 9, wd)}
      </svg>
    ),
    porsche: (
      <svg width="116" height="50" viewBox="0 0 116 50" overflow="visible">
        {smoke(5, 41, sc, sd)}
        <polygon points="0,46 2,36 12,27 28,19 46,13 68,11 84,15 96,23 105,32 112,41 116,46" fill={f} stroke="#000" strokeWidth="2.5"/>
        <polygon points="30,19 65,12 80,16 56,24" fill="#7dd3fc" stroke="#000" strokeWidth="2"/>
        <rect x="0" y="40" width="10" height="3" fill="#FDE047" stroke="#000" strokeWidth="1.5"/>
        <rect x="106" y="38" width="8" height="4" fill="#ef4444" stroke="#000" strokeWidth="1.5"/>
        {wheel(20, 45, 9, wd)}{wheel(94, 45, 9, wd)}
      </svg>
    ),
    supra: (
      <svg width="138" height="56" viewBox="0 0 138 56" overflow="visible">
        {smoke(6, 47, sc, sd)}
        <polygon points="0,52 4,40 18,31 38,19 64,13 86,13 98,25 114,31 130,40 138,52" fill={f} stroke="#000" strokeWidth="2.5"/>
        <polygon points="40,19 82,13 94,25 60,26" fill="#7dd3fc" stroke="#000" strokeWidth="2"/>
        <rect x="110" y="12" width="3" height="18" fill="#000"/>
        <rect x="102" y="10" width="22" height="5" fill={f} stroke="#000" strokeWidth="2"/>
        <rect x="0" y="46" width="12" height="4" fill="#FDE047" stroke="#000" strokeWidth="1.5"/>
        <rect x="126" y="44" width="10" height="4" fill="#ef4444" stroke="#000" strokeWidth="1.5"/>
        {wheel(27, 50, 10, wd)}{wheel(110, 50, 10, wd)}
      </svg>
    ),
    skyline: (
      <svg width="122" height="56" viewBox="0 0 122 56" overflow="visible">
        {smoke(4, 45, sc, sd)}
        <polygon points="0,52 0,40 6,28 16,18 16,13 92,13 92,18 104,28 114,40 120,48 122,52" fill={f} stroke="#000" strokeWidth="2.5"/>
        <rect x="17" y="13" width="74" height="16" fill="#7dd3fc" stroke="#000" strokeWidth="2"/>
        <rect x="113" y="30" width="6" height="5" fill="#ef4444" stroke="#000" strokeWidth="1.5"/>
        <rect x="113" y="22" width="6" height="5" fill="#ef4444" stroke="#000" strokeWidth="1.5"/>
        <rect x="0" y="46" width="10" height="4" fill="#FDE047" stroke="#000" strokeWidth="1.5"/>
        {wheel(22, 50, 10, wd)}{wheel(98, 50, 10, wd)}
      </svg>
    ),
    rwb: (
      <svg width="122" height="52" viewBox="0 0 122 52" overflow="visible">
        {smoke(4, 43, sc, sd)}
        <polygon points="0,48 2,37 8,33 8,26 18,16 44,10 68,8 86,12 100,20 112,33 114,37 120,43 122,48" fill={f} stroke="#000" strokeWidth="2.5"/>
        <polygon points="20,16 66,9 84,13 55,23" fill="#7dd3fc" stroke="#000" strokeWidth="2"/>
        <ellipse cx="22" cy="44" rx="15" ry="9" fill={f} stroke="#000" strokeWidth="2.5"/>
        <ellipse cx="98" cy="44" rx="15" ry="9" fill={f} stroke="#000" strokeWidth="2.5"/>
        <rect x="0" y="42" width="10" height="3" fill="#FDE047" stroke="#000" strokeWidth="1.5"/>
        <rect x="112" y="40" width="8" height="4" fill="#ef4444" stroke="#000" strokeWidth="1.5"/>
        {wheel(22, 46, 9, wd)}{wheel(98, 46, 9, wd)}
      </svg>
    ),
  };

  return (
    <div className="shrink-0 inline-flex items-center">
      {svgs[type]}
    </div>
  );
}
