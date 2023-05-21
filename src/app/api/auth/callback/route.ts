import { api } from '@/services/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  try {
    const redirectTo = request.cookies.get('redirectTo')?.value

    const registerResponse = await api.post('/register', {
      code,
    })

    const { token } = registerResponse.data

    const redirectURL = redirectTo ?? new URL('/', request.url)

    // 30 dias tem 24 Horas tem 60 min e 60 s
    const cookiesExpiresSeconds = 30 * 24 * 60 * 60

    return NextResponse.redirect(redirectURL, {
      headers: {
        'Set-Cookie': `token=${token}; Path=/; max-age=${cookiesExpiresSeconds}`,
      },
    })
  } catch (error) {
    console.log(error)
  }
}
