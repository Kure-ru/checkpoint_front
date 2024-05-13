export type Country = {
  code: string;
  continent: Continent;
  emoji: string;
  id: number;
  name: string;
};

export type CountryInput = {
  name?: string;
  emoji?: string;
  code?: string;
  continent?: number;
};

export type Continent = {
  id: number;
  name: string;
};
