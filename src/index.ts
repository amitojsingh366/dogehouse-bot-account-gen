import { raw, wrap, tokensToString, stringToToken, Wrapper, Room, MessageToken } from "@dogehouse/kebab";
let wrapper: Wrapper;
import axios from 'axios';
import fs from 'fs';
import dotenv from 'dotenv'
import readline from "readline";
import path from 'path';

dotenv.config()

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


try {
    raw.connect(
        process.env.TOKEN!,
        process.env.REFRESH_TOKEN!,
        {
            onConnectionTaken: () => {
                console.error("\nAnother client has taken the connection");
                process.exit();
            }
        }
    ).then((c) => {
        wrapper = wrap(c);
        start();
    })
} catch (error) {
    if (error.code === 4001) console.error("invalid token!");
    console.error(error)
}


async function start() {
    rl.question("Enter a username to register: ", async (ans) => {
        try {
            let data = await wrapper.mutation.userCreateBot(ans);
            if (data.apiKey) {
                console.log(data)
                axios.post("https://api.dogehouse.tv/bot/auth", { apiKey: data.apiKey }).then((resp) => {
                    if (resp.data) {
                        resp.data.apiKey = data.apiKey;
                        fs.writeFileSync(path.join(__dirname, "../tokens.json"), JSON.stringify(resp.data));
                        console.log(`Your token refresh token and apiKey are stored in ${path.join(__dirname, "../tokens.json")}`);
                    } else {
                        console.log('Encountered an error, please try again later, 1');
                        process.exit();
                    }
                }).catch(() => {
                    console.log('Encountered an error, please try again later, 2');
                    process.exit();
                })
            }
            if (data.isUsernameTaken) {
                console.log(`The username "${ans}" is already taken`);
                process.exit();
            }
            if (data.error) {
                console.error(data.error);
                process.exit();
            }
        } catch (error) {
            console.log('Encountered an error, please try again later, 3');
            process.exit();
        }

    })
}

