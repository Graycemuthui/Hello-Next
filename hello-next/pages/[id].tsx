import { Character, GetCharacterResults } from "../types";
import Image from "next/image";
import imageLoader from "../imageLoader";

function CharacterPage({ character }: { character: Character }) {
  return (
    <div className="characters">
      <h1>{character.name}</h1>
      <Image
        loader={imageLoader}
        unoptimized
        src={character.image}
        alt={character.name}
        width="200"
        height="200"
      />
    </div>
  );
}

// Using static generation: Client-side data fetching which means that some parts of the page can be rendered entirely by client side JS
// both getStaticProps and getStaticPaths are used together
export async function getStaticPaths() {
  const res = await fetch("http://rickandmortyapi.com/api/character");
  const { results }: GetCharacterResults = await res.json();

  return {
    paths: results.map((character) => {
      return { params: { id: String(character.id) } };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const res = await fetch(
    `http://rickandmortyapi.com/api/character/${params.id}`
  );

  const character = await res.json();

  return {
    props: {
      character,
    },
  };
}

export default CharacterPage;
