import { DbLocation } from "../../types";
import { builder } from "../builder";

export class Location {
  public id: string;
  public island: string;
  public region: string;
  public about: string;

  constructor(loc: DbLocation) {
    this.id = loc.id;
    this.island = loc.island;
    this.region = loc.region;
    this.about = `https://biosector01.com/wiki/${loc.wiki_slug}`;
  }
}

builder.objectType(Location, {
  name: "Location",
  description: "A place within the Bionicle universe",
  fields: (t) => ({
    id: t.exposeID("id"),
    island: t.exposeString("island"),
    region: t.exposeString("region"),
    about: t.exposeString("about"),
  }),
});
