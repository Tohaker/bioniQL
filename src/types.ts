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
  set: string;
};

export type DbLocation = {
  id: string;
  island: string;
  region: string;
  wiki_slug: string;
};
