const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class FriendsterApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN

  static token = "";

  static async request(endpoint, data = {}, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      authorization: `Bearer ${this.token}`,
      'content-type': 'application/json',
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

    const resp = await fetch(url, { method, body, headers });

    //fetch API does not throw an error, have to dig into the resp for msgs
    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const { error } = await resp.json();

      if (Array.isArray(error.message)) {
        throw error.message;
      }
      else {
        console.log(error.message);
        throw [error.message];
      }

    }

    return await resp.json();
  }

  static async signupReq(endpoint, data, method) {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      authorization: `Bearer ${this.token}`,
    };

    let body = new FormData();
    // Assuming 'data' is an object with key-value pairs
    for (let key in data) {
        body.append(key, data[key]);
    }

    console.log("TYPEOFDATA", typeof body)
    const resp = await fetch(url,{method, body, headers } )
    return await resp.json()
  }



  // Individual API routes

  /** Get users Macthes. */

  static async getMatches() {
    let res = await this.request(`matches/`);
    return res.users;
  }

  /**Like or dislike a user  */
  static async likeOrDislike(likeData) {
    console.log("IN API LIKE OR DISLIKE", likeData)
    let res = await this.request('matches/preference',{ likeData }, "POST")
    return res.result;
  }

  /**Get users by friend radius and like/disliked filter*/
  static async getWithinRadius() {
    let res = await this.request('users/search');
    return res.users;
  }

   /**Takes username and calls API to get the rest of the user data */
   static async getUserInfo(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  // User API routes

  /**Takes user data from signup form calls api to register the user, returns
   * response
   */
  static async signup(userData) {
    // let res = await this.request('auth/register', userData, "POST");
    let res = await this.signupReq('auth/register', userData, "POST");
    return res;
  }

  /**Takes username and password from login form and signs in the user via APi call */
  static async login(userData) {
    let res = await this.request('auth/token', userData, "POST");
    return res;
  }


}

export default FriendsterApi;
