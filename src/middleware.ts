import { NextRequest, NextResponse } from 'next/server'

const loginUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GIT_CLIENT_ID}`

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(loginUrl, {
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=20;`,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/memories/:path*',
}
