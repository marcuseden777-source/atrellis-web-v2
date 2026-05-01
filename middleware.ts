import { type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { response } = createClient(request)
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files and images.
     * Extend this if auth-protected routes are added in future.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
