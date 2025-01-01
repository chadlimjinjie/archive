import React from 'react';
import { IconButton, Button, Grid, GridItem, Show, Hide, VStack, Box, useColorModeValue, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { FaHamburger } from "react-icons/fa"

function PlacementExample() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [placement, setPlacement] = React.useState('right')

    return (
        <>

            <IconButton size="md" fontSize="lg" variant="ghost" icon={<FaHamburger />} onClick={onOpen} aria-label={''} />
            <Drawer placement={'left'} onClose={onClose} isOpen={isOpen} size={'full'}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
                    <DrawerBody>
                        <VStack
                            // divider={<StackDivider borderColor='gray.200' />}
                            // spacing={2}
                            align='stretch'
                        >
                            <Link to='/' onClick={onClose}>
                                <Button colorScheme='blue' w={'100%'}>Home</Button>
                            </Link>

                            <Link to='/traffic-images' onClick={onClose}>
                                <Button colorScheme='blue' w={'100%'}>Traffic Images</Button>
                            </Link>

                            <Link to='/maintenance' onClick={onClose}>
                                <Button colorScheme='blue' w={'100%'}>Maintenance</Button>
                            </Link>

                            <Link to='/desktop-layout' onClick={onClose}>
                                <Button colorScheme='blue' w={'100%'}>Desktop Layout</Button>
                            </Link>


                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default function DesktopLayout({ Body }: any) {

    const color = useColorModeValue('gray.800', 'white')

    return (
        <Grid
            templateAreas={{
                base: `"header header"
            "main main"
            "footer footer"`, md: `"header header"
            "nav main"
            "nav footer"`}}
            gridTemplateRows={'auto 1fr 10%'}
            gridTemplateColumns={'20% 1fr'}
            h='100vh'
            // gap='1'
            color='blackAlpha.700'
            fontWeight='bold'
            textColor={color}
        >
            <GridItem area={'header'} padding={'.5%'}>
                {/* Header */}
                <HStack>
                    <Show below='md'>
                        <PlacementExample />
                    </Show>
                    <Box>
                        <ColorModeSwitcher />
                    </Box>
                </HStack>

            </GridItem>

            <Show above='md'>
                <GridItem area={'nav'} borderTop={'1px'} borderRight={'1px'} borderColor={'gray.200'} padding={'4%'} overflowY={'auto'}>
                    {/* Nav */}

                    <VStack
                        // divider={<StackDivider borderColor='gray.200' />}
                        // spacing={2}
                        align='stretch'
                    >
                        <Link to='/'>
                            <Button colorScheme='blue' w={'100%'}>Home</Button>
                        </Link>

                        <Link to='/traffic-images'>
                            <Button colorScheme='blue' w={'100%'}>Traffic Images</Button>
                        </Link>

                        <Link to='/maintenance'>
                            <Button colorScheme='blue' w={'100%'}>Maintenance</Button>
                        </Link>

                        <Link to='/desktop-layout'>
                            <Button colorScheme='blue' w={'100%'}>Desktop Layout</Button>
                        </Link>


                    </VStack>
                </GridItem>
            </Show>


            <GridItem area={'main'} borderTop={'1px'} borderColor={'gray.200'} overflowY={'auto'}>
                {/* Main */}
                {Body ? <Body /> : null}
            </GridItem>
            <GridItem area={'footer'} borderTop={'1px'} borderColor={'gray.200'}>
                {/* Footer */}
            </GridItem>
        </Grid>
    )
}
