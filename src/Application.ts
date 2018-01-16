import * as builder from 'botbuilder';
import * as restify from 'restify';

export class Application {

    private server: any;
    private connector: any;
    private bot: any;

    constructor() {
        this.initServer();
        this.initConnector();
        this.initWebService();
        this.initBot();
    }


    public static init(): Application {
        return new Application();
    }

    private initServer(): void {
        this.server = restify.createServer();
        let instance = this;
        this.server.listen(3978, function () {
            console.log('%s listening to %s', instance.server.name, instance.server.url);
        });
    }

    private initConnector(): void {
        this.connector = new builder.ChatConnector({
            appId: null,
            appPassword: null
        });
    }

    private initWebService(): void {
        this.server.post('/api/messages', this.connector.listen());
    }

    private initBot(): void {
        this.bot = new builder.UniversalBot(this.connector, (session) => {
            let message = session.message.text;
            let responseMessage = "";
            switch (message.toLowerCase()) {
                case 'how are you?':
                    responseMessage = 'Fine thanks! And you?';
                    break;
                case 'what is your name?':
                    responseMessage = 'I\'m a bot, a bot has no name! If you know what i mean';
                    break;
                default:
                    responseMessage = 'You said: ' + message;
                    break;

            }
            session.send(responseMessage);
        });
    }
}