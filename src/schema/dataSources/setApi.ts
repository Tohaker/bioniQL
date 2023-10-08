import axios, { AxiosInstance } from "axios";
import { DB_HOSTNAME } from "../../constants";
import { DbSet } from "../../types";

const SET_PATH = "/sets";

export class SetAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: DB_HOSTNAME,
    });
  }

  public async getAllSets() {
    const { data } = await this.client.get<DbSet[]>(SET_PATH);
    return data;
  }

  public async getSetBySku(sku: string) {
    const { data } = await this.client.get<DbSet[]>(SET_PATH, {
      params: { sku, _limit: 1 },
    });

    if (data.length) return data[0];
  }
}
