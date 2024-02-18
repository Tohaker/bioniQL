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

  public async getTuragaById(id: string | number) {
    const { data } = await this.client.get<DbTuraga>(`${PATH}/${id}`);
    return data;
  }

  public async getTuragaByName(name: string) {
    const { data } = await this.client.get<DbTuraga[]>(PATH, {
      params: { q: name },
    });
    return data;
  }

  public async createTuraga(newTuraga: DbTuraga) {
    const { data } = await this.client.post<DbTuraga>(PATH, newTuraga, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  }

  public async updateTuraga(id: string | number, updatedTuraga: DbTuraga) {
    const { data } = await this.client.put<DbTuraga>(
      `${PATH}/${id}`,
      updatedTuraga,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  }
}
