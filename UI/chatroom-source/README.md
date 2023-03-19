# React-based Chatroom Component for Rasa Stack

## Table of Content
- [React-based Chatroom Component for Rasa Stack](#react-based-chatroom-component-for-rasa-stack)
  - [Table of Content](#table-of-content)
  - [Features](#features)
  - [Run the lab](#run-the-lab)
  - [Usage with Explanations](#usage-with-explanations)
  - [Development](#development)
    - [Install dependencies](#install-dependencies)
    - [Continuously build the Chatroom component](#continuously-build-the-chatroom-component)
  - [Build](#build)
  - [License](#license)


<!-- **Note: This project is not maintained anymore. If you like to become a community maintainer get in touch with @hotzenklotz. It may still work for your project or serve as a point of reference for others.** -->

<!-- [Watch a demo of our Chatroom in action](https://npm-scalableminds.s3.eu-central-1.amazonaws.com/@scalableminds/chatroom@master/demo.html) -->

## Features

* React-based component
* Supports Text with Markdown formatting, Images, and Buttons
* Customizable with SASS variables
* Generates a unique session id and keeps it in `sessionStorage`
* Queues consecutive bot messages for better readability
* Speech input (only in Chrome for now)
* Text to Speech (only in Chrome for now)
* Demo mode included (ideal for scripted screencasts)
* Hosted on S3 for easy use
* Simple setup. Works with Rasa's [REST channel](https://rasa.com/docs/rasa/user-guide/connectors/your-own-website/#rest-channels)

## Run the lab

The project `chatroom-source` provides a basic interface for interacting with bots on the webpage, which supports text and voice as input. Please refer to https://github.com/scalableminds/chatroom for more details.

* In your Rasa bot setup, make sure to include the Rasa [REST channel](https://rasa.com/docs/rasa/user-guide/connectors/your-own-website/#rest-channels) in your `credentials.yml` file:
```bash
rest:
  # pass
```

* Install the dependencies for the web application
```bash
cd UI/chatroom-source
# install dependencies if you have not installed
yarn install
``` 

* Usage - You need to open 3 terminal/shell windows:


*Terminal-1*: For Rasa server. Depending on your setup you might need to add CORS headers, e.g. `--cors "*"`.

```bash
# change to chatbot directory (just an example)
cd chatbot/02-forms-pizza-ordering-chatbot
# Run Rasa server
rasa run --credentials ./credentials.yml  --enable-api --auth-token XYZ123 --model ./models --endpoints ./endpoints.yml --cors "*"
```

*Terminal-2*: Run Rasa action server if you need customized actions

```bash
# change to chatbot directory (just an example)
cd chatbot/02-forms-pizza-ordering-chatbot
# Run Rasa action server
rasa run actions
```

*Terminal 3*: For web application
   
```bash
cd UI/chatroom-source
# run the local host
yarn serve
```
Open `http://localhost:8080` in your browser.


## Usage with Explanations
1. Embed the `chatroom.js` in the HTML of your website and configure it to connect to your Rasa bot. Either use the S3 hosted version or `build it yourself`. (see below)

We will use the version build by ourselves. Attached below are the modified version. Please check the original one here on Github: https://github.com/scalableminds/chatroom.git 

```html
<head>
  <link rel="stylesheet" href="./dist/Chatroom.css" />
</head>
<body>
  <div class="chat-container"></div>

  <script src="./dist/Chatroom.js"/></script>
  <script type="text/javascript">
    var chatroom = new window.Chatroom({
      host: "http://localhost:5005",
      title: "Chat with Mike",
      container: document.querySelector(".chat-container"),
      welcomeMessage: "Hi, I am Mike. How may I help you?",
      speechRecognition: "en-US",
      voiceLang: "en-US"
    });
    chatroom.openChat();
  </script>
</body>
```


2. In your Rasa bot setup, make sure to include the Rasa [REST channel](https://rasa.com/docs/rasa/user-guide/connectors/your-own-website/#rest-channels) in your `credentials.yml` file:
```
rest:
  # pass
```

Restart your Rasa server. Depending on your setup you might need to add CORS headers, e.g. `--cors "*"`.

```
rasa run --credentials ./credentials.yml  --enable-api --auth-token XYZ123 --model ./models --endpoints ./endpoints.yml --cors "*"
```

Note, the version of the Chatroom's Javascript file is encoded in the URL. `chatroom@master` is always the latest version from the GitHub master branch. Use e.g. `chatroom@0.10.0` to load a specific release. [All Releases can be found here.](https://github.com/scalableminds/chatroom/releases)


| Chatroom Version  | Compatible Rasa Core Version |
|-------------------|------------------------------|
| 0.10.x            | 1.0 - 2.x                    |
| 0.9.x (Deprecated)| 0.11.4+, 0.13.7              |
| 0.8.x (Deprecated)| 0.11.4+                      |
| 0.7.8 (Deprecated)| 0.10.4+                      |

Note, versions prior to `0.10.x` used a custom Python channel to connect the chatroom frontend with a Rasa bot backend. Upgrading, from version `0.9.x` or below will require you to modify the `credentials.yml` and include the Rasa REST channel. (see installation instructions above)


## Development

### Install dependencies

```
yarn install
```

### Continuously build the Chatroom component

```
yarn watch
yarn serve
```

Open `http://localhost:8080/demo.html` in your browser.

## Build

```
yarn build
```

Distributable files will be created in folder `dist`. I have already build one and can be found in existing `dist` directory. You can rebuild if you like.

## License

AGPL v3

Made by [scalable minds](https://scalableminds.com). Altered by Dingdong.
