import axios, { AxiosInstance } from "axios";
import { DB_HOSTNAME } from "../../constants.js";
import { DbToa } from "../../types.js";

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

  public async getToaById(id: string | number) {
    const { data } = await this.client.get<DbToa>(`${PATH}/${id}`);
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

  public async updateToa(id: string | number, updatedToa: DbToa) {
    const { data } = await this.client.put<DbToa>(`${PATH}/${id}`, updatedToa, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  }
}
