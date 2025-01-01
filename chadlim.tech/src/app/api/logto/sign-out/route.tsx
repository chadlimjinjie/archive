// app/api/logto/sign-out/route.ts
import { type NextRequest } from 'next/server';

import { logtoClient } from '@/app/lib/logto';
import { config } from '@/app/lib/config';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  
  return logtoClient.handleSignOut(`${config.baseUrl}/dashboard`)(request);
}