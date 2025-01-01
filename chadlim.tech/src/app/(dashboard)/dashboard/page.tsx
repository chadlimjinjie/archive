import { Container, Text } from '@chakra-ui/react'
import { getUser } from '@/app/api/logto/user/get-user';

export default async function Page() {

  const user = await getUser();
  // const rbacProtectedResource = await getRbacProtectedResource();
  // console.log(user); // You'll get user profile here.



  return (
    <Container maxW='container.auto' p={'4'}>

      {user.isAuthenticated ? (
        <>
          <Text>{user.claims?.name}</Text>
          <Text>{user.claims?.username}</Text>
        </>
      ) : null}

    </Container>
  )
}