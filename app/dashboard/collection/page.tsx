'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus, Pencil, Trash2, Loader2, ToggleLeft, ToggleRight, X, Check, Image as ImageIcon } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

type Collection = {
  id: string;
  name: string;
  brand: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
};

const empty: Omit<Collection, 'id' | 'created_at'> = {
  name: '', brand: '', description: '', image_url: '', is_active: false,
};

export default function CollectionAdminPage() {
  const supabase = createClient();
  const [items, setItems] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [uploadingImg, setUploadingImg] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setLoading(true);
    const { data } = await supabase.from('collections').select('*').order('created_at', { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImg(true);
    const ext = file.name.split('.').pop();
    const path = `collections/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const { error } = await supabase.storage.from('collection-images').upload(path, file, { upsert: true });
    if (error) {
      alert('Upload gagal: ' + error.message);
      setUploadingImg(false);
      return;
    }
    const { data: { publicUrl } } = supabase.storage.from('collection-images').getPublicUrl(path);
    setForm(f => ({ ...f, image_url: publicUrl }));
    setUploadingImg(false);
  }

  async function handleSave() {
    if (!form.name || !form.brand) return;
    setSaving(true);
    if (editId) {
      await supabase.from('collections').update({
        name: form.name, brand: form.brand, description: form.description,
        image_url: form.image_url, is_active: form.is_active,
      }).eq('id', editId);
    } else {
      await supabase.from('collections').insert({
        name: form.name, brand: form.brand, description: form.description,
        image_url: form.image_url, is_active: form.is_active,
      });
    }
    setSaving(false);
    setShowForm(false);
    setEditId(null);
    setForm({ ...empty });
    fetchItems();
  }

  async function handleDelete(id: string) {
    if (!confirm('Hapus koleksi ini?')) return;
    await supabase.from('collections').delete().eq('id', id);
    fetchItems();
  }

  async function toggleActive(item: Collection) {
    await supabase.from('collections').update({ is_active: !item.is_active }).eq('id', item.id);
    setItems(prev => prev.map(c => c.id === item.id ? { ...c, is_active: !c.is_active } : c));
  }

  function openEdit(item: Collection) {
    setEditId(item.id);
    setForm({ name: item.name, brand: item.brand, description: item.description ?? '', image_url: item.image_url ?? '', is_active: item.is_active });
    setShowForm(true);
  }

  function openNew() {
    setEditId(null);
    setForm({ ...empty });
    setShowForm(true);
  }

  const inputCls = "w-full bg-zinc-800 border-[3px] border-black p-3 text-white placeholder:text-zinc-500 outline-none shadow-[3px_3px_0px_0px_#000] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[1px_1px_0px_0px_#000] transition-all text-sm";

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-32 px-6 pb-16">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter text-black">COLLECTION</h1>
            <p className="text-zinc-500 font-bold text-sm mt-1">Kelola koleksi diecast yang tampil di halaman utama</p>
          </div>
          <button onClick={openNew}
            className="bg-[#FDE047] border-[4px] border-black px-6 py-3 font-black uppercase italic shadow-[6px_6px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#000] transition-all flex items-center gap-2">
            <Plus className="w-5 h-5" /> Tambah
          </button>
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white border-[5px] border-black shadow-[12px_12px_0px_0px_#000] w-full max-w-lg rounded-[4px] overflow-hidden">
              <div className="h-2 bg-[#FDE047] border-b-[3px] border-black" />
              <div className="p-7">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black uppercase italic">{editId ? 'Edit Koleksi' : 'Tambah Koleksi'}</h2>
                  <button onClick={() => setShowForm(false)} className="hover:bg-red-100 p-1 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black uppercase italic text-zinc-500 mb-1.5">Nama Koleksi *</label>
                    <input className={inputCls} placeholder="Contoh: Ferrari F40 Red" value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase italic text-zinc-500 mb-1.5">Merk / Brand *</label>
                    <input className={inputCls} placeholder="Contoh: Hot Wheels, Mini GT" value={form.brand}
                      onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase italic text-zinc-500 mb-1.5">Deskripsi Singkat</label>
                    <textarea className={`${inputCls} resize-none`} rows={3} placeholder="Deskripsi singkat koleksi ini..."
                      value={form.description ?? ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
                  </div>

                  {/* Image upload */}
                  <div>
                    <label className="block text-xs font-black uppercase italic text-zinc-500 mb-1.5">Foto</label>
                    <input ref={fileRef} type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={handleUpload} />
                    <button type="button" onClick={() => fileRef.current?.click()}
                      className="w-full border-[3px] border-dashed border-black bg-zinc-50 hover:bg-[#FDE047] transition-colors group relative overflow-hidden"
                      style={{ minHeight: 140 }}>
                      {form.image_url ? (
                        <div className="flex items-center gap-4 p-4">
                          <img src={form.image_url} alt="preview" className="w-24 h-24 object-cover border-[3px] border-black shrink-0" />
                          <div className="text-left">
                            <p className="font-black uppercase italic text-sm text-black">Foto terpilih</p>
                            <p className="text-xs text-zinc-500 mt-1 break-all line-clamp-2">{form.image_url.split('/').pop()}</p>
                            <p className="text-xs text-zinc-400 mt-2 italic">Klik untuk ganti foto</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8 gap-2">
                          {uploadingImg
                            ? <Loader2 className="w-10 h-10 animate-spin text-black" />
                            : <ImageIcon className="w-10 h-10 text-zinc-400 group-hover:text-black transition-colors" />}
                          <p className="font-black uppercase italic text-sm text-zinc-500 group-hover:text-black transition-colors">
                            {uploadingImg ? 'Mengupload...' : 'Klik untuk upload foto'}
                          </p>
                          <p className="text-xs text-zinc-400">PNG, JPG, WEBP</p>
                        </div>
                      )}
                      {uploadingImg && (
                        <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                          <Loader2 className="w-8 h-8 animate-spin text-black" />
                        </div>
                      )}
                    </button>
                    {form.image_url && (
                      <button type="button" onClick={() => setForm(f => ({ ...f, image_url: '' }))}
                        className="mt-1 text-xs font-black uppercase italic text-red-500 hover:underline flex items-center gap-1">
                        <X className="w-3 h-3" /> Hapus foto
                      </button>
                    )}
                  </div>

                  {/* Toggle active */}
                  <div className="flex items-center justify-between bg-zinc-50 border-[3px] border-black p-4">
                    <div>
                      <p className="font-black uppercase italic text-sm">Tampilkan di Homepage</p>
                      <p className="text-xs text-zinc-500">Jika aktif, akan muncul di section CEKIDOT</p>
                    </div>
                    <button type="button" onClick={() => setForm(f => ({ ...f, is_active: !f.is_active }))}
                      className="transition-transform hover:scale-110">
                      {form.is_active
                        ? <ToggleRight className="w-10 h-10 text-[#00FF9F]" />
                        : <ToggleLeft className="w-10 h-10 text-zinc-400" />}
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setShowForm(false)}
                    className="flex-1 border-[3px] border-black p-3 font-black uppercase italic hover:bg-zinc-100 transition-colors">
                    Batal
                  </button>
                  <button onClick={handleSave} disabled={saving || !form.name || !form.brand}
                    className="flex-1 bg-[#FDE047] border-[4px] border-black p-3 font-black uppercase italic shadow-[4px_4px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Check className="w-5 h-5" /> Simpan</>}
                  </button>
                </div>
              </div>
              <div className="h-2 bg-[#FF006E] border-t-[3px] border-black" />
            </div>
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin" /></div>
        ) : items.length === 0 ? (
          <div className="bg-white border-[5px] border-black shadow-[8px_8px_0px_0px_#000] p-16 text-center">
            <p className="text-2xl font-black uppercase italic text-zinc-400">Belum ada koleksi</p>
            <p className="text-zinc-400 mt-2">Klik "Tambah" untuk menambah koleksi pertama</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id}
                className="bg-white border-[4px] border-black shadow-[6px_6px_0px_0px_#000] flex items-center gap-5 p-4 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#000] transition-all">
                {/* Image */}
                <div className="w-20 h-20 shrink-0 border-[3px] border-black overflow-hidden bg-zinc-100 flex items-center justify-center">
                  {item.image_url
                    ? <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                    : <ImageIcon className="w-8 h-8 text-zinc-300" />}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-lg uppercase italic leading-none">{item.name}</span>
                    <span className="bg-[#0066FF] text-white text-[10px] font-black uppercase italic px-2 py-0.5 border-[2px] border-black">{item.brand}</span>
                  </div>
                  {item.description && <p className="text-zinc-500 text-sm mt-1 truncate">{item.description}</p>}
                </div>

                {/* Toggle + Actions */}
                <div className="flex items-center gap-3 shrink-0">
                  <button onClick={() => toggleActive(item)} title={item.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                    className="transition-transform hover:scale-110">
                    {item.is_active
                      ? <ToggleRight className="w-9 h-9 text-[#00FF9F]" />
                      : <ToggleLeft className="w-9 h-9 text-zinc-300" />}
                  </button>
                  <button onClick={() => openEdit(item)}
                    className="p-2 bg-[#FDE047] border-[3px] border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] transition-all">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(item.id)}
                    className="p-2 bg-[#FF006E] border-[3px] border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] transition-all">
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
