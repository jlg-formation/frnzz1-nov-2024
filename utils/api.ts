import { sleep } from "./sleep";

const url = "https://www.lunion.fr/rss/25/cible_principale";

class API {
  async getMessage(): Promise<string> {
    try {
      await sleep(1000);
      const response = await fetch(url);
      console.log("response: ", response.status);

      console.log("response.headers: ", response.headers);

      const json = await response.json();
      return json[0].login;
    } catch (err) {
      throw new Error("Erreur technique.");
    }
  }
}

export const api = new API();
