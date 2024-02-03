import axios, { AxiosInstance } from "axios";
import { DB_HOSTNAME } from "../../constants";
import { DbTuraga } from "../../types";

const PATH = "/turaga";

export class TuragaAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: DB_HOSTNAME,
    });
  }

  public async getAllTuraga() {
    const { data } = await this.client.get<DbTuraga[]>(PATH);
    return data;
  }

  public async getTuragaByName(name: string) {
    const { data } = await this.client.get<DbTuraga[]>(PATH, {
      params: { q: name },
    });
    return data;
  }
}
