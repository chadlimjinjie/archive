import { type NextRequest } from 'next/server';

import { logtoClient } from '@/app/lib/logto';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    const { isAuthenticated, scopes } = await logtoClient.getLogtoContext(request, {
        getAccessToken: true,
        resource: 'http://localhost:3005',
    });

    if (!isAuthenticated) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    if (!scopes?.includes('read:users')) {
        return new Response(JSON.stringify({ message: 'Access denied, requires read:user scope.' }), {
            status: 403,
        });
    }

    return new Response(
        JSON.stringify({
            data: 'this_is_resource_protected_by_rbac_scope',
        })
    );
}