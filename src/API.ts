import xs, { Stream } from 'xstream'

let conn: WebSocket | null;
let observable: Stream<{}>;

export default {
  async connect(name: string) {
    if (conn == null) {
      conn = new WebSocket("ws://192.168.1.10:7040");
      return new Promise((resolve, reject) => {
        if (conn == null) {
          reject("conn is null");
          return
        }
        conn.onopen = () => {
          conn!.send(JSON.stringify({ "name": name }));

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