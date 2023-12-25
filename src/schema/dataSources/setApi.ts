import axios, { AxiosInstance } from "axios";
import { DB_HOSTNAME } from "../../constants";
import { DbSet } from "../../types";

const PATH = "/sets";

export class SetAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: DB_HOSTNAME,
    });
  }

  public async getAllSets() {
    const { data } = await this.client.get<DbSet[]>(PATH);
    return data;
  }

  public async getSetBySku(sku: string) {
    const { data } = await this.client.get<DbSet[]>(PATH, {
      params: { sku, _limit: 1 },
    });

    if (data.length) return data[0];
  }
}
