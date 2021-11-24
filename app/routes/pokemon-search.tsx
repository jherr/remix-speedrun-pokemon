import type { LoaderFunction } from "remix";
import { json } from "remix";

import pokemon from "../../lib/pokemon";

export let loader: LoaderFunction = async ({ request }) => {
  const q = (new URL(request.url).searchParams.get("q") ?? "").toLowerCase();
  return json(
    pokemon.filter(({ name }) => name.toLowerCase().includes(q)).slice(0, 10)
  );
};
