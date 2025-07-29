import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo';

type DecodedToken = {
  id: number;
  name: string;
  email: string;
  exp: number;
};

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Token não encontrado' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    console.log('Decoded token:', decoded);
    return NextResponse.json({ user: decoded });
  } catch {
    return NextResponse.json({ error: 'Token inválido ou expirado' }, { status: 401 });
  }
}
