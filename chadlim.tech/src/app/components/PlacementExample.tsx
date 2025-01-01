'use client'

import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, IconButton, VStack, useDisclosure } from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";

export function PlacementExample({ user }: any) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>

            <IconButton size="md" fontSize="lg" variant="ghost" icon={<HamburgerIcon />} onClick={onOpen} aria-label={''} />
            <Drawer placement={'left'} onClose={onClose} isOpen={isOpen} size={'full'}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>
                        {/* Basic Drawer */}
                    </DrawerHeader>
                    <DrawerBody>
                        <VStack
                            // divider={<StackDivider borderColor='gray.200' />}
                            spacing={4}
                            align='stretch'
                        >
                            <Link href='/dashboard' onClick={onClose}>
                                <Button colorScheme='blue' w='100%'>Home</Button>
                            </Link>

                            {user.isAuthenticated ? (
                                <>
                                    <Link href="/coins" onClick={onClose}>
                                        <Button colorScheme='blue' w='100%'>Coins</Button>
                                    </Link>

                                    <Link href="/number_block_game" onClick={onClose}>
                                        <Button colorScheme='blue' w='100%'>Number Block Game</Button>
                                    </Link>
                                </>
                            ) : null}

                            {user.isAuthenticated ? (
                                <Link href="/api/logto/sign-out" onClick={onClose}>
                                    <Button colorScheme='blue' w='100%'>Sign-out</Button>
                                </Link>
                            ) : (
                                <Link href="/api/logto/sign-in" onClick={onClose}>
                                    <Button colorScheme='blue' w='100%'>Sign-in</Button>
                                </Link>
                            )}

                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}
