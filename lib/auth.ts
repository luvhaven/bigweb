import { sign, verify } from 'jsonwebtoken'
import { compare, hash } from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-production'

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 10)
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword)
}

export function createToken(userId: string, email: string, role: string): string {
  return sign(
    { userId, email, role },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export function verifyToken(token: string): any {
  try {
    return verify(token, JWT_SECRET)
  } catch {
    return null
  }
}

export function extractToken(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7)
}
