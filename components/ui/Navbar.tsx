import NextLink from 'next/link';
import { Spacer, Text, useTheme } from "@nextui-org/react";
import Image from "next/image";

export const Navbar = () => {

    const { theme } = useTheme();

  return (
    <div style={{
        display: "flex",
        flexDirection: "row",
        padding: '0 20px',
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'start',
        backgroundColor: theme?.colors.gray50.value
    }}>
        <Image 
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/132.png"
            alt="Logo"
            width={50}
            height={50}
        />

        <NextLink href="/" passHref>
          <Text color="white" h2>Pokemón</Text>
        </NextLink>  

        <Spacer css={{ flex: 1 }} />

        <NextLink href="/favorites" passHref>
          <Text>Favoritos</Text>
        </NextLink>  

    </div>
  )
}
