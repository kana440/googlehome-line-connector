const apiKey = 'ytjx9tyog1ccdxc9'
const request = require('request')
const fs = require("fs");
const googlehome= require("./googlehome")
const OUT_PATH = __dirname + "/_temp.wav";
const voiceText = message => {
  const options = {
    url: 'https://api.voicetext.jp/v1/tts',
    method: 'POST',
    auth: {
      user: apiKey,
      password: '',
    },
    headers: {
      'Content-Type':'application/json',
    },
    json: true,
    encoding: null,
    form: {
      text: message,
      speaker: "hikari",
      speed: 100
    },
  }
  new Promise((resolve, reject) => {
    try{
      request(options, function(error,response,body){
        resolve({error,response,body})
      })
    } catch(e) {
      reject(e)
    }
  }).then(result=>{
    fs.writeFileSync(OUT_PATH, result.body, "binary");
  }).then(()=>{
    googlehome.notify()
  })
}

module.exports = voiceText
