import axios, { AxiosInstance } from "axios";
import { DB_HOSTNAME } from "../../constants";
import { DbMatoran } from "../../types";

const PATH = "/matoran";

export class MatoranAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: DB_HOSTNAME,
    });
  }

  public async getAllToa() {
    const { data } = await this.client.get<DbMatoran[]>(PATH, {
      params: { group: "toa" },
    });
    return data;
  }

  public async getToaByName(name: string) {
    const { data } = await this.client.get<DbMatoran[]>(PATH, {
      params: { group: "toa", q: name },
    });
    return data;
  }

  public async getAllTuraga() {
    const { data } = await this.client.get<DbMatoran[]>(PATH, {
      params: { group: "turaga" },
    });
    return data;
  }

  public async getTuragaByName(name: string) {
    const { data } = await this.client.get<DbMatoran[]>(PATH, {
      params: { group: "turaga", q: name },
    });
    return data;
  }
}
