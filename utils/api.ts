const url = "https://api.github.com/users";

class API {
  async getMessage(): Promise<string> {
    const response = await fetch(url);
    const json = await response.json();
    return json[0].login;
  }
}

export const api = new API();
