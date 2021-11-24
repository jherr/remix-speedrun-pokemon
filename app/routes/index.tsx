import type { MetaFunction, LoaderFunction } from "remix";
import { useMemo } from "react";
import { useLoaderData, json, Link, useFetcher } from "remix";

import pokemon, { Pokemon } from "../../lib/pokemon";

export let loader: LoaderFunction = () => {
  return pokemon.slice(0, 10);
};

export let meta: MetaFunction = () => {
  return {
    title: "Pokemon",
    description: "Pokemon page!",
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData<Pokemon[]>();
  const pokemon = useFetcher<Pokemon[]>();

  const pokemonList = useMemo(() => pokemon.data || data, [data, pokemon.data]);

  return (
    <div>
      <pokemon.Form
        method="get"
        className="mb-10 flex"
        action="/pokemon-search"
      >
        <input
          type="text"
          name="q"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-lg border-gray-300 px-4 rounded-full"
          placeholder="Pokemon"
        />
        <button
          type="submit"
          className="ml-4 inline-flex items-center px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Search
        </button>
      </pokemon.Form>

      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {pokemonList.map((p) => (
          <li key={p.id} className="relative">
            <Link to={`/pokemon/${p.name}`}>
              <div className="hover:scale-110 transition duration-200 group block w-full aspect-w-10 aspect-h-8 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                <img
                  src={`/pokemon/${p.name.toLowerCase()}.jpg`}
                  alt=""
                  className="object-cover pointer-events-none group-hover:opacity-75"
                />
              </div>
              <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                {p.name}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
