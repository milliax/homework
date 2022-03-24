require("dotenv").config()
const express = require("express")
const linebot = require("linebot")
const bodyParser = require("body-parser")
//const fetch = require("node-fetch")
const app = express()
const port = 8000

const bot = linebot({
    channelId: process.env.LINE_BOT_ID,
    channelSecret: process.env.LINE_BOT_SECRET,
    channelAccessToken: process.env.LINE_BOT_ACCESS_TOKEN
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/* broadcast message to all users */
app.post("/broadcast", (req, res) => {
    if (req.body.key !== process.env.MY_PRIVATE_KEY) {
        console.log("Access Deny");
        return res.sendStatus(403);
    }
    console.log(`Recieved: ${req.body.message}`)

    try {
        bot.broadcast(req.body.message)
        return res.status(200).send("Message sent")
    } catch (err) {
        return res.status(403).send(`Error: ${err}`)
    }
})

app.post("/linebot",(req,res)=>{
    console.log("here")
    bot.parse(req.body)
    return res.json({})
})

bot.on("message",event=>{
    data = event.message.text;
    console.log(data)
    try{
        event.reply(data)
        console.log("replied")
    }catch(err){
        console.log(`Error: ${err}`)
    }
})

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})