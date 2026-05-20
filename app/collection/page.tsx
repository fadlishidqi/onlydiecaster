import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { Image as ImageIcon } from 'lucide-react';

export const revalidate = 60;

export default async function CollectionPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: collections } = await supabase
    .from('collections')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-6xl md:text-7xl font-black uppercase italic tracking-tighter text-black leading-none mb-4">
            THE{' '}
            <span className="bg-[#FDE047] px-4 py-1 border-[4px] border-black shadow-[8px_8px_0px_0px_#000] inline-block -rotate-1">
              GARAGE
            </span>
          </h1>
          <p className="text-lg font-black uppercase italic text-zinc-500 border-[3px] border-black bg-white px-6 py-3 inline-block shadow-[5px_5px_0px_0px_#000]">
            Koleksi Diecast Pilihan dari Garasi Kami
          </p>
        </div>

        {/* Grid */}
        {!collections || collections.length === 0 ? (
          <div className="bg-white border-[5px] border-black shadow-[8px_8px_0px_0px_#000] p-20 text-center">
            <p className="text-3xl font-black uppercase italic text-zinc-300">Belum ada koleksi</p>
            <p className="text-zinc-400 mt-2 font-bold">Koleksi akan segera hadir!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {collections.map((item, i) => (
              <div key={item.id}
                className="bg-white border-[4px] border-black shadow-[8px_8px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[5px_5px_0px_0px_#000] transition-all group overflow-hidden">

                {/* Image */}
                <div className="aspect-square bg-zinc-100 border-b-[4px] border-black relative overflow-hidden">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-16 h-16 text-zinc-300" />
                    </div>
                  )}
                  {/* Nomor urut */}
                  <span className="absolute top-3 left-3 bg-black text-white px-3 py-1 font-black text-sm italic border-[2px] border-white shadow-[3px_3px_0px_0px_#FDE047]">
                    #{String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4">
                  <span className="bg-[#0066FF] text-white text-[10px] font-black uppercase italic px-2 py-0.5 border-[2px] border-black inline-block mb-2">
                    {item.brand}
                  </span>
                  <h3 className="font-black uppercase italic text-lg leading-tight text-black mb-2">
                    {item.name}
                  </h3>
                  {item.description && (
                    <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Bottom strip */}
                <div className="h-2 bg-[#00FF9F] border-t-[3px] border-black" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
