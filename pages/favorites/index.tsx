import { useEffect, useState } from 'react';
import { Layout } from '../../components/layouts'
import { FavoritesPokemon } from '../../components/pokemon';
import { NoFavorites } from '../../components/ui/';
import { localFavorites } from '../../utils';

const FavoritesPage = () => {

const [favoritesPokemons, setFavoritesPokemons] = useState<number[]>([]);

useEffect(() => {
  setFavoritesPokemons(localFavorites.pokemons());
}, [])

 
  return (
    <Layout title='Favoritos'>
      
      {
        favoritesPokemons.length === 0 
        ? ( <NoFavorites /> )
        : ( <FavoritesPokemon pokemons={favoritesPokemons} /> )
      }

    </Layout>
  )
}

export default FavoritesPage