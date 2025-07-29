import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const mockUser = [
  {
    email: 'marcelino.gneto@gmail.com.br',
    password: '123456',
    id: 1,
    name: 'Dr. Marcelino',
  },
  {
    email: 'luke.rodrigues@gmail.com',
    password: '123456',
    id: 2,
    name: 'Dr. Luke',
  },
  {
    email: 'teste@teste.com',
    password: '123456',
    id: 3,
    name: 'Dr. Teste',
  }
];

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = mockUser[2];

  if (email === user.email && password === user.password) {
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET || 'segredo',
      { expiresIn: '1h' }
    );

    const response = NextResponse.json({ success: true });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60,
    });

    return response;
  }

  return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 });
}
