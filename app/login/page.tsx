'use client';

import { useState } from 'react';
import { ArrowRight, Loader2, Mail, Lock, UserCircle, Eye, EyeOff, ShieldCheck, Phone, MapPin } from 'lucide-react';
import { login, signup } from '@/app/auth/actions';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

const inputCls = "w-full bg-zinc-800 border-[3px] border-white py-4 px-5 pl-12 shadow-[4px_4px_0px_0px_#FDE047] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[2px_2px_0px_0px_#FDE047] transition-all outline-none text-white placeholder:text-zinc-500 text-base";
const labelCls = "block text-xs font-black uppercase italic text-zinc-400 mb-1.5";
const iconCls = "absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 z-10";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const message = searchParams.get('message');

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-6 pt-28 selection:bg-[#FDE047]">

      {/* Dekoratif shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[8%] left-[3%] w-24 h-24 bg-[#FF006E] border-[3px] border-[#FF006E] shadow-[5px_5px_0px_0px_#FF006E] rotate-6 animate-float opacity-60" />
        <div className="absolute bottom-[10%] right-[2%] w-36 h-36 bg-[#00FF9F] border-[3px] border-[#00FF9F] shadow-[6px_6px_0px_0px_#00FF9F] -rotate-12 animate-float opacity-40" style={{ animationDelay: '-2s' }} />
        <div className="absolute top-[40%] right-[4%] w-14 h-14 bg-[#FDE047] border-[2px] border-[#FDE047] rotate-45 animate-bounce-subtle opacity-50" />
        <div className="absolute bottom-[25%] left-[3%] w-20 h-20 bg-[#0066FF] border-[3px] border-[#0066FF] shadow-[5px_5px_0px_0px_#0066FF] rotate-12 animate-float opacity-50" style={{ animationDelay: '-1s' }} />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg bg-zinc-900 border-[5px] border-white shadow-[12px_12px_0px_0px_#FDE047] rounded-[4px] overflow-hidden">

        {/* Strip atas kuning */}
        <div className="h-3 bg-[#FDE047] border-b-[3px] border-white" />

        <div className="p-10">

          {/* Header */}
          <div className="flex items-center gap-5 mb-8">
            <div className="relative w-36 h-20 shrink-0">
              <Image src="/logobunta.png" alt="Diecaster Santuy" fill sizes="144px" className="object-contain" priority />
            </div>
            <div>
              <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white leading-none mb-2">
                {isSignUp ? 'JOIN EMPIRE' : 'ACCESS PORT'}
              </h1>
              <span className="text-xs font-black uppercase italic text-black bg-[#00FF9F] px-3 py-1 border-[2px] border-white shadow-[3px_3px_0px_0px_#FDE047] inline-block">
                {isSignUp ? 'Buat akun baru' : 'Masuk ke akunmu'}
              </span>
            </div>
          </div>

          {/* Error / Message */}
          {error && (
            <div className="bg-[#FF006E] border-[3px] border-white p-3 mb-5 font-black text-sm uppercase italic text-white shadow-[4px_4px_0px_0px_#000]">
              {error}
            </div>
          )}
          {message && (
            <div className="bg-[#00FF9F] border-[3px] border-white p-3 mb-5 font-black text-sm uppercase italic text-black shadow-[4px_4px_0px_0px_#000]">
              {message}
            </div>
          )}

          {/* Form */}
          <form action={isSignUp ? signup : login} onSubmit={() => setLoading(true)} className="space-y-5">

            {isSignUp && (
              <div>
                <label className={labelCls}>Username</label>
                <div className="relative">
                  <UserCircle className={iconCls} />
                  <input name="username" type="text" placeholder="Username kamu" required className={inputCls} />
                </div>
              </div>
            )}

            <div>
              <label className={labelCls}>{isSignUp ? 'Email' : 'Email / Username'}</label>
              <div className="relative">
                <Mail className={iconCls} />
                <input
                  name={isSignUp ? 'email' : 'identity'}
                  type={isSignUp ? 'email' : 'text'}
                  placeholder={isSignUp ? 'email@example.com' : 'Email atau username'}
                  required
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <label className={labelCls}>Password</label>
              <div className="relative">
                <Lock className={iconCls} />
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  className={`${inputCls} pr-12`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white z-10 transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>No. Telp <span className="text-zinc-600 normal-case not-italic font-normal">(opsional)</span></label>
                  <div className="relative">
                    <Phone className={iconCls} />
                    <input name="phone" type="tel" placeholder="08xxxxxxxxxx" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Alamat <span className="text-zinc-600 normal-case not-italic font-normal">(opsional)</span></label>
                  <div className="relative">
                    <MapPin className={iconCls} />
                    <input name="address" type="text" placeholder="Jl. contoh no. 1" className={inputCls} />
                  </div>
                </div>
              </div>
            )}

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-[#FDE047] border-[4px] border-white py-4 flex items-center justify-center gap-3 shadow-[6px_6px_0px_0px_#FDE047] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#FDE047] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-50 group mt-2"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin text-black" />
              ) : (
                <>
                  <span className="font-black uppercase italic text-lg text-black">
                    {isSignUp ? 'SIGN UP' : 'LOGIN NOW'}
                  </span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform text-black" />
                </>
              )}
            </button>
          </form>

          {/* Footer card */}
          <div className="mt-6 pt-5 border-t-[3px] border-zinc-700 flex items-center justify-between">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm font-black uppercase italic hover:bg-[#FDE047] hover:text-black px-4 py-2 border-[2px] border-transparent hover:border-white transition-all text-zinc-400"
            >
              {isSignUp ? '← Kembali ke Login' : 'Belum punya akun? Daftar!'}
            </button>
            <div className="flex items-center gap-2 bg-white text-black px-3 py-1.5 rotate-1">
              <ShieldCheck className="w-4 h-4 text-[#00FF9F]" />
              <span className="text-[10px] font-black uppercase italic tracking-widest">Secured</span>
            </div>
          </div>

        </div>

        {/* Strip bawah pink */}
        <div className="h-3 bg-[#FF006E] border-t-[3px] border-white" />
      </div>
    </main>
  );
}
