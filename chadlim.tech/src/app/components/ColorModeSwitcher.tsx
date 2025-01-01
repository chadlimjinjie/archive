'use client'

import {
    useColorMode,
    IconButton,
    IconButtonProps,
} from "@chakra-ui/react"
import { SunIcon, MoonIcon } from "@chakra-ui/icons"

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <IconButton
            size="md"
            fontSize="lg"
            variant="ghost"
            color={colorMode === "dark" ? "current" : "white"}
            onClick={toggleColorMode}
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon color={'black'} />}
            aria-label={`Switch to ${colorMode} mode`}
            {...props}
        />
    )
}