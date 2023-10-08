import axios, { AxiosInstance } from "axios";
import { DB_HOSTNAME } from "../../constants";
import { DbToa } from "../../types";

const TOA_PATH = "/toa";

export class ToaAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: DB_HOSTNAME,
    });
  }

  public async getAllToa() {
    const { data } = await this.client.get<DbToa[]>(TOA_PATH);
    return data;
  }

  public async getToaByName(name: string) {
    const { data } = await this.client.get<DbToa[]>(TOA_PATH, {
      params: { q: name },
    });
    return data;
  }
}
