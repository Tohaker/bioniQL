import axios, { AxiosInstance } from "axios";
import { DB_HOSTNAME } from "../../constants";
import { DbToa } from "../../types";

const PATH = "/matoran";

export class MatoranAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: DB_HOSTNAME,
    });
  }

  public async getAllToa() {
    const { data } = await this.client.get<DbToa[]>(PATH, {
      params: { group: "toa" },
    });
    return data;
  }

  public async getToaByName(name: string) {
    const { data } = await this.client.get<DbToa[]>(PATH, {
      params: { group: "toa", q: name },
    });
    return data;
  }
}
