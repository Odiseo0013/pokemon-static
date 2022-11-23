import { useState } from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';

import confetti from 'canvas-confetti';

import { Pokemon } from '../../interfaces/pokemon-full';
import { getPokemonInfo, localFavorites } from '../../utils';
import { Grid, Card, Button, Container, Text, Image } from '@nextui-org/react';
import { Layout } from '../../components/layouts';
import { pokeApi } from '../../api';
import { PokemonListResponse, SmallPokemon } from '../../interfaces';
 

interface Props {
    pokemon: Pokemon
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

    const [isInFavorites, setIsInFavorites] = useState(localFavorites.ExistInFavorites(pokemon.id));

    const onToggleFavorite = () => {
      localFavorites.ToggleFavorites(pokemon.id);
      setIsInFavorites(!isInFavorites);
  
      if( !isInFavorites ) {
        confetti({
          particleCount: 100,
          startVelocity: 30,
          spread: 360,
          origin: {
            x: Math.random(),
            y: Math.random() - 0.2
          }
        });
      }
  
    }
    
  return (
    <Layout title={`${pokemon.name}`}>
        <h1 style={{textTransform: 'capitalize'}}>{pokemon.name} - {pokemon.id}</h1>
        <Grid.Container css={{marginTop: '5px'}} gap={2}>
          <Grid xs={12} sm={4}>
            <Card isHoverable css={{padding: '30px'}}>
              <Card.Body>
                <Card.Image 
                  src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}  
                  alt={pokemon.name}
                  width= "100%"
                  height= {200}
                />
              </Card.Body>
            </Card>
          </Grid>
          <Grid xs={12} sm={8}>
            <Card css={{padding: '20px'}}>
              <Card.Header css={{display: 'flex', justifyContent: 'space-between'}}>
                <Text h1 transform='capitalize'>{pokemon.name}</Text>

                <Button 
                  color={'gradient'} 
                  ghost={ isInFavorites }
                  onClick={onToggleFavorite}
                >
                   { isInFavorites ? 'En favoritos' : 'Añadir a favoritos'}
                </Button>
              </Card.Header>
              <Card.Body>
                <Text size={30}>Sprites:</Text>
                <Container display='flex' direction='row' gap={0}>
                  <Image 
                    src={pokemon.sprites.front_default} 
                    alt={pokemon.name} 
                    width={100}
                    height={100}
                  />
                  <Image 
                    src={pokemon.sprites.back_default} 
                    alt={pokemon.name} 
                    width={100}
                    height={100}
                  />
                  <Image 
                    src={pokemon.sprites.front_shiny} 
                    alt={pokemon.name} 
                    width={100}
                    height={100}
                  />
                  <Image 
                    src={pokemon.sprites.back_shiny} 
                    alt={pokemon.name} 
                    width={100}
                    height={100}
                  />
                </Container>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
    </Layout>
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const {data} = await pokeApi.get<PokemonListResponse>('pokemon?limit=151');

    const pokemonsName = data.results.map ( ( pokemons ) => ( pokemons.name ) );

    return {
      paths: pokemonsName.map( name => ({
        params: { name } 
      }))
      ,
      fallback: false
    }
}


export const getStaticProps: GetStaticProps = async ({params}) => {
 
    const  { name } =  params as {name: string};
  
    return {
      props: {
        pokemon: await getPokemonInfo(name)
      }
    }
  }


export default PokemonByNamePage