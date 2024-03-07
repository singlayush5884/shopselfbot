const config = require('./config')

const math = require('mathjs')
const { Client } = require('discord.js-selfbot-v13')
const client = new Client({ checkUpdate: false })

// client.on('ready', async () => {})

client.on('messageCreate', async (message) => {
    if (message.author.id !== client.user.id) return;
    if (!message.content.startsWith(config.prefix)) return;
    let args = message.content.slice(config.prefix.length).split(/ +/g)
    cmd = args[0]
    if (!cmd) return;
    args = args.slice(1)

    if (['ltc'].includes(cmd.toLowerCase())) {
        await message.delete()
        message.channel.send(config.ltc)
    }

    if (['calc'].includes(cmd.toLowerCase())) {
        await message.delete()
        if (!args[0]) return message.channel.send(`No equation provided`)

        try {
            message.channel.send({ content: `${math.evaluate(args.join(" "))}` })
        } catch (err) {
            console.log(err)
            message.channel.send('Not a valid question!!')
        }
    }
})

client.login(process.env['TOKEN])

const app = require('express')()

app.listen(80)

app.get('/', async(req, res) => {
    res.send('Hello world')
})

