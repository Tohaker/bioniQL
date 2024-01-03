import axios, { AxiosInstance } from "axios";
import { DB_HOSTNAME } from "../../constants";
import { DbLocation } from "../../types";

const PATH = "/locations";

export class LocationAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: DB_HOSTNAME,
    });
  }

  public async getAllLocations() {
    const { data } = await this.client.get<DbLocation[]>(PATH);
    return data;
  }

  public async getLocationById(id?: string) {
    if (!id) return undefined;

    const { data } = await this.client.get<DbLocation[]>(PATH, {
      params: { id, _limit: 1 },
    });

    if (data.length) return data[0];
  }
}
