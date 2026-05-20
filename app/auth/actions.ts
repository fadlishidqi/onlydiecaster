'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function login(formData: FormData) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const identity = formData.get('identity') as string
  const password = formData.get('password') as string

  // Resolve username → email if identity doesn't look like an email
  let email = identity.trim()
  if (!email.includes('@')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('email')
      .eq('username', email)
      .single()
    if (profile?.email) {
      email = profile.email
    } else {
      return redirect('/login?error=' + encodeURIComponent('Username tidak ditemukan'))
    }
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return redirect('/login?error=' + encodeURIComponent(error.message))
  }

  const role = data.user?.user_metadata?.role === 'admin' ? 'admin' : 'user'

  cookieStore.set('user-role', role, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    httpOnly: false,
  })

  revalidatePath('/', 'layout')
  redirect(role === 'admin' ? '/dashboard' : '/store')
}

export async function signup(formData: FormData) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const username = formData.get('username') as string
  const phone = formData.get('phone') as string
  const address = formData.get('address') as string

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        phone: phone || '',
        address: address || '',
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://partisihidup.vercel.app'}/auth/callback`,
    },
  })

  if (error) {
    return redirect('/login?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  redirect('/login?message=Check your email to confirm your account')
}

export async function signOut() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  await supabase.auth.signOut()
  
  cookieStore.delete('user-role')

  revalidatePath('/', 'layout')
  redirect('/login')
}
