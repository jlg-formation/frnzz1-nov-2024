class API {
  async getMessage(): Promise<string> {
    throw new Error("Method not implemented.");
  }
}

export const api = new API();
