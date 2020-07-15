import { Dropbox } from "dropbox";

const Discord = require('discord.js');
const client = new Discord.Client();
// const fs = require("fs");

//Dropbox
const dbxclient = new Dropbox.Client({key: process.env.key});


//Options
const prefix = "!";
const documentation = "https://docs.google.com/spreadsheets/d/1dlUBQur9d8ANC-JJH6HA4gn4zxbFyz2xwQnTiPYZQi4/edit?usp=sharing"

//On Ready
client.on("ready",() => {
    console.log("JojoTheOtokonko is ready")
    client.user.setActivity("AV",{type: "WATCHING"});
});

//Login
client.login(process.env.token);

//Command Handler
client.on("message", async msg => {
    let message = msg.toString();
    let args = "";
    if(message[0] === prefix){
        args = message.substring(1).split(" ");
    }

    //Useful Commands
    //!a
    if(args[0] === "a"){
        let mentioned = msg.mentions.users.first();
        let server = args[1];
        await mentioned.send("Hello, Would you mind joining " + server + "?\nLove you :)");
    }

    //!record
    if(args[0] === "record" || args[0] === "rec"){
        recording = true;
        await msg.channel.send("@here Recoding message in " + msg.channel +" ,MIND YOUR LANGUAGE");
        await client.user.setActivity("to messages in " + msg.channel, {type: "LISTENING"});
    }

    if(args[0] === "record-stop" || args[0] === "rec-stop"){
        recording = false;
        await msg.channel.send("@here stopped recoding message in " + msg.channel);
        client.user.setActivity("AV",{type: "WATCHING"});
    }

    //help
    if(args[0] === "help"){
        await msg.reply("Full list of commands can be found at : \n" + documentation);
    }

    //Troll Commands
    //!ftl
    if(args[0] === "fti" || args[0] === "ftl"){
        let channel = msg.member.voice.channel
        if(!channel){
            return msg.channel.send("You need to be in a voice channel to use this command");
        }
        try {
            var connection = await channel.join();
        } catch (e) {
            console.log("Error connecting to voice channel");
        }
        connection.play('fti.mp3', { volume: 0.5 })
            .on("finish", () => channel.leave())
            .on("error", (error) => console.log(error));
    }

    if(args[0] === "fti-stop" || args[0] === "ftl-stop"){
        if(msg.member.voice.channel){
            msg.member.voice.channel.leave();
            await msg.channel.send("Successfully disconnected from voice , why dont you like Fire Three Island? TAT");
        }
    }

    //!elevator
    if(args[0] === "elevator"){
        await msg.channel.send("5_AvenueLocal");
    }

    //!innocity
    if(args[0] === "inno" || args[0] === "innocity"){
        await msg.channel.send("Is InnoCity Watersuno?");
    }
});

//Recorder
var recording = false;
client.on("message", msg =>{
    if(recording){
        let server = msg.guild.name;
        let appendata = "[" +Date.now()+"]" + "<" + msg.author.username + "> " + msg.toString() + "\n";
        // fs.appendFile(server + ".txt", appendata, (err) => {
        //     if (err) throw err
        // });

        dbxclient.appendFile(server + ".txt", appendata, function () {
            alert('File written!');
        });
    }
});
