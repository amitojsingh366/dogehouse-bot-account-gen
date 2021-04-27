# dogehouse-bot-account-gen

## This repo is now archived as `@dogehouse/kebab` has this inbuilt partially

### Follow the steps below to get your bot account

- Go to DogeHouse
- Open Developer options (F12 or Ctrl+Shift+I)
- Go to Application > Local Storage > dogehouse.tv
- Copy your token and refresh-token and put them in an .env file:
  - ```
    TOKEN=<token>
    REFRESH_TOKEN=<refresh-token>
    ```
  - You can refer to an [example here](https://github.com/amitojsingh366/dogehouse-bot-account-gen/blob/main/.env.example)
- Clone this repo
- Run `yarn` in the root of this project to install dependencies
- Run `yarn start` and enter the username you want to keep for your bot
- If the program sucessfully executes you will see a new file in the project root called `tokens.json`, all the required information for your bot should be in this file
