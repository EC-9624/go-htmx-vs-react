/* eslint-disable react/prop-types */
import { useState } from "react";

export default function ExternalApi() {
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            External API
          </h1>
          <p className="text-gray-500 text-md">
            Example of how React works with an external API
          </p>
        </div>
      </header>
      <main>
        <div>
          <Content />
        </div>
      </main>
    </>
  );
}

function Content() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokeArray, setPokeArray] = useState([]);

  const handleFetchPokemon = async () => {
    if (!pokemonName) return;
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      const data = await response.json();

      // Map the response to match your Go struct shape
      const mappedPokemon = {
        name: data.name,
        height: data.height,
        weight: data.weight,
        sprites: {
          other: {
            showdown: {
              frontDefault: data.sprites.other.showdown.front_default || "",
            },
          },
        },
        types: data.types.map((t) => ({
          slot: t.slot,
          typeDetail: { name: t.type.name, url: t.type.url },
        })),
      };

      // Add the new Pokémon to the array
      setPokeArray((prevArray) => [...prevArray, mappedPokemon]);
      setPokemonName(""); // Reset input field
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-20 items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Pokémon Cards</h2>
        <div className="grid grid-cols-4 gap-5">
          {/* Map over the pokeArray to display all Pokémon cards */}
          {pokeArray.map((pokemon, index) => (
            <PokemonCard key={index} pokemon={pokemon} />
          ))}

          {/* Input Form */}
          <div
            className="w-48 bg-white shadow-lg border-2 border-gray-500 p-4 rounded-lg"
            id="targetDiv"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleFetchPokemon();
              }}
              className="flex flex-col gap-4"
            >
              <h2 className="text-lg font-bold text-gray-900 text-center">
                Add more
              </h2>
              <input
                type="text"
                name="pokemon"
                placeholder="Type here"
                value={pokemonName}
                onChange={(e) => setPokemonName(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function PokemonCard({ pokemon }) {
  if (!pokemon) return null;

  return (
    <article className="w-48 bg-white shadow-lg border-2 border-gray-500 p-4 rounded-lg">
      <div className="flex flex-col items-center">
        <img
          className="mb-4"
          alt={pokemon.name}
          width="80"
          src={pokemon.sprites.other.showdown.frontDefault}
        />
        <h2 className="text-lg font-bold text-gray-900 capitalize">
          {pokemon.name}
        </h2>
      </div>
      <hr className="my-4 border-gray-400" />
      <ul className="text-gray-700 text-sm">
        {pokemon.types.map((type, index) => (
          <li key={index}>
            <strong>Type:</strong> {type.typeDetail.name}
          </li>
        ))}
        <li>
          <strong>Height:</strong> {pokemon.height}
        </li>
        <li>
          <strong>Weight:</strong> {pokemon.weight}
        </li>
      </ul>
    </article>
  );
}
