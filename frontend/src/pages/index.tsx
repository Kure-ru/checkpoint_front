import { ADD_COUNTRY, GET_CONTINENTS, GET_COUNTRIES } from "@/graphql/client";
import { CountryInput } from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { FormEvent, useState } from "react";

const Home = () => {
  const [newCountry, setNewCountry] = useState<CountryInput>({});
  const [addCountry] = useMutation(ADD_COUNTRY, {
    onCompleted: () => {
      refetch();
    },
  });
  const { data: continentsData } = useQuery(GET_CONTINENTS);
  const { data: countriesData, refetch } = useQuery(GET_COUNTRIES);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addCountry({
      variables: {
        data: {
          name: newCountry.name,
          emoji: newCountry.emoji,
          code: newCountry.code,
          continent: { id: newCountry.continent },
        },
      },
    });
  };
  return (
    <>
      <form
        className="flex mb-0 mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 flex-col md:flex-row items-start md:items-center gap-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="name"
            className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
              required
              type="text"
              placeholder="Name"
              onChange={(e) =>
                setNewCountry({ ...newCountry, name: e.target.value })
              }
            />
            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              Name
            </span>
          </label>
        </div>

        <div>
          <label
            htmlFor="emoji"
            className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
              required
              type="text"
              onChange={(e) =>
                setNewCountry({ ...newCountry, emoji: e.target.value })
              }
              placeholder="Emoji"
            />
            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              Emoji
            </span>
          </label>
        </div>

        <div>
          <label
            htmlFor="countryCode"
            className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
              required
              type="text"
              placeholder="Country code"
              onChange={(e) =>
                setNewCountry({ ...newCountry, code: e.target.value })
              }
            />
            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              Country code
            </span>
          </label>
        </div>

        {continentsData && (
          <select
            className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            name="continent"
            required
            onChange={(e) =>
              setNewCountry({
                ...newCountry,
                continent: Number(e.target.value),
              })
            }
          >
            {continentsData.continents.map((continent: any) => (
              <option
                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                value={continent.id}
              >
                {continent.name}
              </option>
            ))}
          </select>
        )}

        <button
          type="submit"
          className="inline-block rounded-full border border-pink-600 bg-pink-600 w-8 h-8 text-white hover:bg-transparent hover:text-pink-600 focus:outline-none focus:ring active:text-pink-500"
        >
          +
        </button>
      </form>
      <div className="flex flex-wrap gap-4 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {countriesData &&
          countriesData.countries.map((country: any) => (
            <Link key={country.id} href={`/country/${country.code}`}>
              <section className="rounded-xl bg-white p-8 ring ring-pink-50 flex flex-col items-center">
                <h2 className="mt-4 text-lg font-medium sm:text-xl">
                  {country.name}
                </h2>
                <span className="mt-1 text-xl">{country.emoji}</span>
              </section>
            </Link>
          ))}
      </div>
    </>
  );
};

export default Home;
