import { Buffer } from 'buffer';

export default class ImsRequest {

  static buildRequest(method, username, password) {
    const authHash = new Buffer(username + ':' + password).toString('base64');
    return {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + authHash,
      },
    }
  }

  static async tryLogin(credentials) {
    const { server, username, password } = credentials;
    const reqOptions = this.buildRequest('GET', username, password);
    return await fetch(server, reqOptions);
  }

  static async getVersion(credentials) {
    const { server, username, password } = credentials;
    const reqOptions = this.buildRequest('GET', username, password);

    try {
      const res = await fetch(server, reqOptions);
      if (res.ok) {
        const data = await res.json();
        const selfHref = data.navigation.selfHref;
        const infoHref = data.links.filter(links => links.link === 'info')[0].dataHref;
        const infoUrl = infoHref.replace(selfHref, server);
        const infoRes = await fetch(infoUrl, reqOptions);
        const info = await infoRes.json();
        return info.version;
      } else {
        return 'Login Failed (Status ' + res.status + ')';
      }
    } catch (e) {
      return e.toString();
    }
  }
}