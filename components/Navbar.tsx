'use client';

import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, Box, ShoppingCart, Calculator, BarChart3, ReceiptText, Home, Menu, X, LogOut, LogIn, GalleryHorizontal, BookImage } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { signOut } from '@/app/auth/actions';
import { motion, AnimatePresence } from 'framer-motion';

const adminItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Inventory', href: '/inventory', icon: Box },
  { name: 'Store', href: '/store', icon: ShoppingCart },
  { name: 'Collection', href: '/dashboard/collection', icon: BookImage },
  { name: 'Profit', href: '/profit', icon: Calculator },
  { name: 'Orders', href: '/orders', icon: ReceiptText },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
];

const userItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Collection', href: '/collection', icon: GalleryHorizontal },
  { name: 'Store', href: '/store', icon: ShoppingCart },
];

const transition = { type: 'tween' as const, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] };

export default function Navbar({ initialRole }: { initialRole: string | null }) {
  const [role, setRole] = useState<string | null>(initialRole);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isLightBg = pathname !== '/' && pathname !== '/login';

  useEffect(() => {
    setRole(initialRole);
    if (initialRole) {
      localStorage.setItem('user-role', initialRole);
    } else {
      localStorage.removeItem('user-role');
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [initialRole]);

  const navItems = role === 'admin' ? adminItems : userItems;

  const handleLogout = async () => {
    localStorage.removeItem('user-role');
    setIsMenuOpen(false);
    await signOut();
  };

  return (
    <>
      {/* Wrapper positioning */}
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none">
        <motion.nav
          animate={{
            marginTop: isScrolled ? 12 : 0,
            width: isScrolled ? '90%' : '100%',
            borderRadius: isScrolled ? 14 : 0,
            paddingTop: isScrolled ? 6 : 14,
            paddingBottom: isScrolled ? 6 : 14,
            paddingLeft: isScrolled ? 24 : 32,
            paddingRight: isScrolled ? 24 : 32,
            boxShadow: isScrolled
              ? '0 8px 32px 0 rgba(0,0,0,0.18), 6px 6px 0px 0px #000'
              : '0 0px 0px 0px rgba(0,0,0,0)',
            backgroundColor: isScrolled ? '#ffffff' : 'rgba(255,255,255,0)',
            borderBottomWidth: isScrolled ? 4 : 0,
          }}
          transition={transition}
          className="border-x-[4px] border-t-[4px] border-black flex items-center justify-between pointer-events-auto overflow-visible"
          style={{
            borderTopWidth: isScrolled ? 4 : 0,
            borderLeftWidth: isScrolled ? 4 : 0,
            borderRightWidth: isScrolled ? 4 : 0,
          }}
        >
          <Link href="/" className="flex items-center group">
            <motion.div
              animate={{ width: isScrolled ? 150 : 200, height: isScrolled ? 65 : 100 }}
              transition={transition}
              className="shrink-0 overflow-hidden"
            >
              <Image
                src="/logobunta.png"
                alt="Diecaster Santuy by Adit Bunta"
                width={160}
                height={80}
                className="w-full h-full object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-3">
            {navItems.map((item) => (
              <motion.div key={item.name} whileHover={{ y: -2, x: -2 }}>
                <Link
                  href={item.href}
                  className="font-black uppercase italic flex items-center gap-2 border-[2px] border-transparent hover:border-black hover:bg-[#FDE047] hover:shadow-[4px_4px_0px_0px_#000] transition-colors duration-150"
                  style={{
                    fontSize: isScrolled ? '0.875rem' : '0.875rem',
                    padding: isScrolled ? '8px 14px' : '10px 20px',
                    color: isScrolled ? '#000000' : (isLightBg ? '#000000' : '#ffffff'),
                    transition: 'font-size 0.4s ease, padding 0.4s ease, color 0.4s ease',
                  }}
                >
                  <motion.span
                    animate={{ width: isScrolled ? 18 : 20, height: isScrolled ? 18 : 20 }}
                    transition={transition}
                    className="inline-flex shrink-0"
                  >
                    <item.icon style={{ width: '100%', height: '100%' }} />
                  </motion.span>
                  {item.name}
                </Link>
              </motion.div>
            ))}

            <motion.div
              animate={{ height: isScrolled ? 22 : 40, backgroundColor: isScrolled ? '#000000' : (isLightBg ? '#000000' : '#ffffff') }}
              transition={transition}
              className="w-[3px] mx-3 shrink-0"
            />

            {role ? (
              <motion.button
                animate={{
                  fontSize: isScrolled ? '0.875rem' : '0.875rem',
                  paddingTop: isScrolled ? 8 : 12,
                  paddingBottom: isScrolled ? 8 : 12,
                  paddingLeft: isScrolled ? 16 : 24,
                  paddingRight: isScrolled ? 16 : 24,
                }}
                transition={transition}
                whileHover={{ scale: 1.05, x: 2, y: 2, boxShadow: '2px 2px 0px 0px #000' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="bg-[#FF006E] font-black uppercase text-white italic shrink-0"
                style={{ borderWidth: 4, borderColor: isScrolled ? '#000000' : '#ffffff', boxShadow: isScrolled ? '4px 4px 0px 0px #000' : '4px 4px 0px 0px rgba(255,255,255,0.5)' }}
              >
                LOGOUT ({role})
              </motion.button>
            ) : (
              <Link href="/login">
                <motion.div
                  animate={{
                    fontSize: isScrolled ? '0.875rem' : '0.875rem',
                    paddingTop: isScrolled ? 8 : 12,
                    paddingBottom: isScrolled ? 8 : 12,
                    paddingLeft: isScrolled ? 16 : 24,
                    paddingRight: isScrolled ? 16 : 24,
                  }}
                  transition={transition}
                  whileHover={{ scale: 1.05, x: 2, y: 2, boxShadow: '2px 2px 0px 0px #000' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#FDE047] font-black uppercase text-black italic shrink-0 flex items-center gap-2 cursor-pointer"
                  style={{ borderWidth: 4, borderColor: isScrolled ? '#000000' : '#ffffff', boxShadow: isScrolled ? '4px 4px 0px 0px #000' : '4px 4px 0px 0px rgba(255,255,255,0.5)' }}
                >
                  <LogIn className="w-4 h-4" />
                  LOGIN
                </motion.div>
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <motion.button
            animate={{ padding: isScrolled ? 6 : 12 }}
            transition={transition}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden border-[4px] border-black bg-[#FDE047] shadow-[4px_4px_0px_0px_#000] text-black"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="lg:hidden absolute top-full left-0 right-0 bg-white border-t-[4px] border-x-[4px] border-b-[4px] border-black"
                style={{ borderRadius: isScrolled ? '0 0 12px 12px' : 0 }}
              >
                <div className="p-6 flex flex-col gap-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-5 p-5 border-[3px] border-black font-black uppercase italic text-lg hover:bg-[#FDE047] transition-all text-black shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px]"
                    >
                      <item.icon className="w-6 h-6" />
                      {item.name}
                    </Link>
                  ))}

                  <div className="h-[4px] bg-black my-2" />

                  {role ? (
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-5 p-5 border-[3px] border-black bg-[#FF006E] font-black uppercase italic text-lg shadow-[6px_6px_0px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] transition-all text-white"
                    >
                      <LogOut className="w-7 h-7" /> LOGOUT ({role})
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-5 p-5 border-[3px] border-black bg-[#FDE047] font-black uppercase italic text-lg shadow-[6px_6px_0px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] transition-all text-black"
                    >
                      <LogIn className="w-7 h-7" /> LOGIN
                    </Link>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>

      {/* Overlay to close menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
