
import { getUser } from "@/app/api/logto/user/get-user"
import { redirect } from 'next/navigation';


import { Text, Container } from '@chakra-ui/react'
import { PageClient } from "./PageClient";

export default async function Page() {

    const user = await getUser()

    if (!user.isAuthenticated) {
        redirect('/dashboard')
    }

    return (
        <Container maxW='container.auto' p={'4'}>

            {user.isAuthenticated ? (
                <>
                    <Text>{user.claims?.name}</Text>
                    <Text>{user.claims?.username}</Text>
                </>
            ) : null}

            <PageClient />

        </Container>
    )
}
