import { useState } from 'react';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';

import confetti from 'canvas-confetti';

import { Layout } from "../../components/layouts"
import { getPokemonInfo, localFavorites } from '../../utils';
import { pokeApi } from '../../api';
import { Pokemon } from '../../interfaces';

interface Props  {
  pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({pokemon}) => {


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
          // since they fall down, start a bit higher than random
          y: Math.random() - 0.2
        }
      });
    }

  }


  return (
    <Layout title={`Detalle del Pokemon: ${pokemon.name}`}>
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
        {/* <Image src={pokemon.sprites.other?.dream_world.front_default} alt={pokemon.name} width={300} height={300} /> */}
    </Layout>
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => { 

  const pokemon151 = [...Array(151)].map ( (value, index)  => `${index + 1}` ); 

  return {
    paths: pokemon151.map( id => ({
      params: { id } 
    }))
    ,
    fallback: false
  }
}


export const getStaticProps: GetStaticProps = async ({params}) => {
 
  const  { id } =  params as {id: string};

  return {
    props: {
      pokemon: await getPokemonInfo(id)
    }
  }
}

export default PokemonPage