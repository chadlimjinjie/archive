import { Providers } from "../providers";
import { ColorModeSwitcher } from "@/app/components/ColorModeSwitcher";
import { PlacementExample } from '@/app/components/PlacementExample'
import { Box, Button, Grid, GridItem, HStack, Show, VStack } from "@chakra-ui/react"
import Link from "next/link";
import { getUser } from '@/app/api/logto/user/get-user';


export default async function RootLayout({
    children,
}: {
    children: React.ReactNode,
}) {

    const user = await getUser();
    // // const rbacProtectedResource = await getRbacProtectedResource();

    return (
        <html lang="en">
            <body>
                <Providers>
                    <Grid
                        templateAreas={{
                            base: `"header header"
                        "main main"
                        "footer footer"`, lg: `"header header"
                        "nav main"
                        "nav footer"`}}
                        gridTemplateRows={'auto 1fr 10%'}
                        gridTemplateColumns={'20% 1fr'}
                        h='100vh'
                    // gap='1'
                    >
                        {/* Header */}
                        <GridItem area={'header'} padding={'.5%'} borderBottom={'1px'}>
                            <HStack>
                                <Show below='lg'>
                                    <PlacementExample user={user} />
                                </Show>
                                <Box>
                                    <ColorModeSwitcher />
                                </Box>
                            </HStack>
                        </GridItem>

                        {/* Nav */}
                        <Show above='lg'>
                            <GridItem area={'nav'} padding={'4%'} borderRight={'1px'}>
                                <VStack
                                    // divider={<StackDivider borderColor='gray.200' />}
                                    spacing={4}
                                    align='stretch'
                                >

                                    <Link href="/dashboard">
                                        <Button colorScheme='blue' w='100%'>Dashboard</Button>
                                    </Link>

                                    {user.isAuthenticated ? (
                                        <>
                                            <Link href="/coins">
                                                <Button colorScheme='blue' w='100%'>Coins</Button>
                                            </Link>

                                            <Link href="/number_block_game">
                                                <Button colorScheme='blue' w='100%'>Number Block Game</Button>
                                            </Link>
                                        </>
                                    ) : null}

                                    {user.isAuthenticated ? (
                                        <Link href="/api/logto/sign-out">
                                            <Button colorScheme='blue' w='100%'>Sign-out</Button>
                                        </Link>
                                    ) : (
                                        <Link href="/api/logto/sign-in">
                                            <Button colorScheme='blue' w='100%'>Sign-in</Button>
                                        </Link>
                                    )}

                                </VStack>
                            </GridItem>
                        </Show>

                        <GridItem area={'main'}>
                            {children}
                        </GridItem>
                        {/* Footer */}
                        <GridItem area={'footer'} borderTop={'1px'}>

                        </GridItem>
                    </Grid>
                </Providers>
            </body>
        </html>
    )
}
