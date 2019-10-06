const middleware = {
  list(req, res) {
    // クライアントに送るJSONデータ
      const todoList = [
          { title: 'JavaScriptを勉強する', done: true },
          { title: 'Node.jsを勉強する', done: false },
          { title: 'Web APIを作る', done: false }
      ];
      // JSONを送信する
      res.json(todoList);

  },
  sendToLine(req, res) {
    const body = req.body
    body.events[0].response ='added'
    res.json(body)
  },
}
module.exports = middleware
