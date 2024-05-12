import axios, { AxiosInstance } from "axios";
import { DB_HOSTNAME } from "../../constants.js";

const PATH = "/users";

export class UsersAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: DB_HOSTNAME,
    });
  }

  public async getUser(id: string) {
    const { data } = await this.client.get<
      {
        id: string;
        type: "ADMIN" | "GUEST";
      }[]
    >(PATH, { params: { id } });
    return data[0];
  }
}
