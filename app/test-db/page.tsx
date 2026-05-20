import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()

  return (
    <main className="min-h-screen bg-[#FAF8F5] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border-[6px] border-black shadow-[12px_12px_0px_0px_#000] p-10 md:p-16 rounded-[4px]">
          <h1 className="text-5xl md:text-7xl font-black uppercase italic text-black mb-10 underline decoration-[8px] decoration-[#FDE047] underline-offset-8">
            Database Terminal
          </h1>
          
          <div className="bg-[#00FF9F] border-[4px] border-black p-6 mb-12 shadow-[8px_8px_0px_0px_#000] transform -rotate-1">
            <p className="font-black text-black text-2xl uppercase italic">
              Status: {todos ? 'CONNECTED // ONLINE' : 'DISCONNECTED // OFFLINE'}
            </p>
          </div>

          <div className="space-y-6">
            {todos?.map((todo: any) => (
              <div key={todo.id} className="bg-white border-[4px] border-black p-6 shadow-[6px_6px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#000] transition-all flex items-center justify-between group">
                <span className="text-2xl font-black uppercase italic text-black group-hover:bg-[#FDE047] px-2 transition-colors">{todo.name}</span>
                <span className="bg-black text-white px-3 py-1 font-black text-xs">ID: {todo.id}</span>
              </div>
            ))}
          </div>

          {!todos && (
            <div className="bg-[#FF006E] border-[4px] border-black p-8 shadow-[8px_8px_0px_0px_#000] text-center">
              <p className="text-2xl font-black uppercase italic text-white">No data packets found or connection refused.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
