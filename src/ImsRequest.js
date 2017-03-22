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

  static async getModels(credentials) {
    const { server, username, password } = credentials;
    const reqOptions = this.buildRequest('GET', username, password);

    try {
      const res = await fetch(server, reqOptions);
      if (res.ok) {
        const data = await res.json();
        const selfHref = data.navigation.selfHref;
        const modelHref = data.links.filter(links => links.link === 'models')[0].dataHref;
        const modelUrl = modelHref.replace(selfHref, server);
        const modelRes = await fetch(modelUrl, reqOptions);
        const models = await modelRes.json();
        return models.archives;
      } else {
        return 'Login Failed (Status ' + res.status + ')';
      }
    } catch (e) {
      return e.toString();
    }
  }

  static async getModelFields(credentials, modelHref) {
    const { server, username, password } = credentials;
    const reqOptions = this.buildRequest('GET', username, password);
    var result = [];

    try {
      const res = await fetch(server, reqOptions);
      if (res.ok) {
        const data = await res.json();
        const selfHref = data.navigation.selfHref;
        const modelUrl = modelHref.replace(selfHref, server);
        const modelData = await fetch(modelUrl, reqOptions);
        const model = await modelData.json();
        for(let table of model.tables) {
          const tableUrl = table.dataHref.replace(selfHref, server);
          const tableData = await fetch(tableUrl, reqOptions);
          const field = await tableData.json();
          result.push(field);
        }
        return result;
      } else {
        return 'Login Failed (Status ' + res.status + ')';
      }
    } catch (e) {
        console.log("end of fields");
      return e.toString();
    }
  }
}