import xs, { Stream } from 'xstream'

let conn: WebSocket | null;
let observable: Stream<{}>;

export default {
  async connect(name: string) {
    return await this.__connect(name);
  },

  async connectAsViewer() {
    return await this.__connect(undefined);
  },

  async __connect(name?: string) {
    if (conn == null) {
      conn = new WebSocket("wss://q2.tsuzu.xyz");
      return new Promise((resolve, reject) => {
        if (conn == null) {
          reject("conn is null");
          return
        }
        conn.onopen = () => {
          conn!.send(JSON.stringify({ "name": name !== undefined ? name! : "" }));

          var producer = {
            start: function (listener: any) {
              if (conn == null) {
                return
              }
              conn.onmessage = (message) => {
                listener.next(JSON.parse(message.data));
              };
            },
            stop: function () {
              conn!.onmessage = () => { }
            },
          }
          observable = xs.create(producer);
          console.log(observable);

          resolve(observable);
        }
        conn.onerror = (err) => {
          reject(err)
        }
      });
    }
  },

  getObservable() {
    return observable;
  },

  async answer(index: number, ans: string) {
    if (conn != null) {
      conn.send(JSON.stringify({
        "index": index,
        "answer": ans,
      }));
    }
  }
}