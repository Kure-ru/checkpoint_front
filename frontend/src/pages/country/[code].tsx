import { GET_ONE_COUNTRY } from "@/graphql/client";
import { Country } from "@/types";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CountryDetail = () => {
  const router = useRouter();
  const { code } = router.query;

  const [country, setCountry] = useState<Country | null>();

  const [getCountry, { loading, error }] = useLazyQuery(GET_ONE_COUNTRY, {
    variables: { code },
    onCompleted: (data: { country: Country }) => setCountry(data.country),
  });

  useEffect(() => {
    if (code) {
      getCountry();
    }
  }, [code]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error. Please try again later.</div>;
  if (country)
    return (
      <div className="p-8 flex flex-col gap-4 justify-center items-center">
        <span className="text-8xl">{country.emoji}</span>
        <h2 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
          Country: {country.name} ({country.code})
        </h2>
        {country.continent && (
          <h3 className="mt-2 max-w-sm text-gray-700">
            Continent: {country.continent.name}
          </h3>
        )}
      </div>
    );
};

export default CountryDetail;
