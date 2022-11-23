import { Container, Image, Text } from "@nextui-org/react"

export const NoFavorites = () => {
  return (
    <Container css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 100px)',
        alignSelf: 'center'
      }}
      >
          <Text h1>No tienes Pokemons favoritos.</Text>
          <Image 
            src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/123.png'
            height={300}
            width={300}
            css={{ opacity: 0.3 }}
            alt={'No hay favoritos'}
          />
      </Container>
  )
}
