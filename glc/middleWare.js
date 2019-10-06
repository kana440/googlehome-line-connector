const request = require('request')
const middleware = {
  list(req, res) {
    const headers = {
    "content-type": "application/json"
    }
    const param = {
      "events":[
        {
          "source":"dummy",
          "message":{
            "text":"テストです"
          }
        }
      ]
    }
    const option = {
      url: "http://localhost:3000/send-to-line",
      headers: headers,
      body: JSON.stringify(param),
    }
    request.post(option,(error,response,body)=>{
      res.json(JSON.parse(body))
    })
  },

  sendToLine(req, res) {
    const body = req.body
    body.events[0].response ='added'
    res.json(body)
  },
}
module.exports = middleware
