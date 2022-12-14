import { FC, ReactNode } from "react";

import Head from "next/head";
import { Navbar } from "../ui";

interface Props  {
  children: ReactNode;
  title?: string;
};

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout: FC<Props> = ({ children, title }) => {

  return (
    <>
        <Head>
            <title>{ title || 'Pokemon App' }</title>
            <meta name="author" content="Rafa Calvo" />
            <meta name="description" content={`Página sobre el pokemon ${title}`} />
            <meta name="keywords" content={`${title}, buscador pokemons, listado pokemons, pokedex`}  />
            <meta property="og:title" content={`Información sobre el pokemon ${title}`} />
            <meta property="og:description" content={`Caracteristicas, imagenes, habilidades de ${title}`}  />
            <meta property="og:image" content={`${origin}/img/banner.png`} />
        </Head>

         <Navbar /> 

        <main style={{
          padding: '0px 20px'
        }}>
            {children}
        </main>
    </>
  )
}
