export type DbSet = {
  sku: string;
  pieces: number;
  year: number;
};

export type DbPowers = {
  kanohi: string;
  element: string;
};

export type DbToa = {
  name: string;
  powers: DbPowers;
  location: string;
  set: string;
};

export type DbTuraga = {
  name: string;
  powers: DbPowers;
  tool: string;
  location: string;
  set: string;
};

export type DbLocation = {
  id: string;
  island: string;
  region: string;
  wiki_slug: string;
};
