'use client'

import { Button, Container, Show } from '@chakra-ui/react'
import Link from 'next/link'
import { Text } from '@chakra-ui/react'

export default async function Page({ params }: { params: { user: any } }) {

  const user = params.user

  return (
    <Container maxW='container.auto' p={'4'}>

      {user.isAuthenticated ? (
        <>
          <Text>{user.claims?.name}</Text>
          <Text>{user.claims?.username}</Text>
        </>
      ) : null}



      {!user.isAuthenticated ? (
        <Link href="/api/logto/sign-in">
          <Button colorScheme='blue'>Sign-in</Button>
        </Link>
      ) : (
        <Link href="/api/logto/sign-out">
          <Button colorScheme='blue'>Sign-out</Button>
        </Link>
      )}


    </Container>
  )
}