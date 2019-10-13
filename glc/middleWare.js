const request = require('request')
const line = require('@line/bot-sdk')
const config = {
    channelAccessToken: 'u1spB4GU6nsQAavM3O6t12jgIRsfskhMuJdvwFahDGsVqJSzdiDMhXa/1oUEOvpw5tEhxFdKNgrpUtBlGpqobXybwU42pJoIFdeaMZFRj8sMK4sUbvl+o2SK7RwxbjC+kPE0jx37/kdSKO8UTsaSXwdB04t89/1O/w1cDnyilFU=',
    channelSecret: '30100c79aa2851f2cad3aef97f4c863e'
};
const client = new line.Client(config);
const iGroup = 'C581653995b59786d0da59de4a437e689';
const iDad = 'U7921c3e581a9906058d28807f3e04d2b';


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
    if(body.mode === "write") {
      // googlehome->ifttt->からのとき
      const sendmessage = req.body.text.replace(/\s+/g,"");
      client.pushMessage(iGroup,{type:'text', text:sendmessage});
      res.status(200).send('OK');
    } else {
      // lineからのとき
      if(req.body.events){
        const userId = body.events[0].source.userId;
        let textmain = body.events[0].message.text;
        if(userId === iDad) {
          textmain = "パパからです。" + textmain;
        } else {
          textmain = "ママからです。" + textmain;
        }
      console.log("talk request:",textmain)
      console.log(JSON.stringify(body))
      res.status(200).send('OK');
    }
  },
}
module.exports = middleware
