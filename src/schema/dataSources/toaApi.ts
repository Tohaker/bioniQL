import axios, { AxiosInstance } from "axios";
import { DB_HOSTNAME } from "../../constants";
import { DbToa } from "../../types";

const PATH = "/toa";

export class ToaAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: DB_HOSTNAME,
    });
  }

  public async getAllToa() {
    const { data } = await this.client.get<DbToa[]>(PATH);
    return data;
  }

  public async getToaByName(name: string) {
    const { data } = await this.client.get<DbToa[]>(PATH, {
      params: { q: name },
    });
    return data;
  }

  public async createToa(newToa: DbToa) {
    const { data } = await this.client.post<DbToa>(PATH, newToa, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  }
}
