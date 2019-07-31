const { DialogSet, DialogTurnStatus } = require('botbuilder-dialogs');
const { LuisRecognizer } = require('botbuilder-ai');

const MAIN_DIALOG = 'MAIN_DIALOG';

const { CancelAndHelpDialog}= require('./CancelAndHelpDialog')
const { GreetingDialog,GREETING_DIALOG } = require('./greetingDialog');
const { ThanksDialog,THANKS_DIALOG}=require('./thanksDialog');
const { ByeDialog,BYE_DIALOG}=require('./byeDialog');

const luisRecognizer = new LuisRecognizer({
    applicationId: "",
    endpointKey: "",
    endpoint: ``
},{}, true);


class MainDialog extends CancelAndHelpDialog{
    constructor(){
        super('mainDialog');
  }

    async run(turnContext, accessor) {
        const dialogSet = new DialogSet(accessor);
        
        //add all the dialogs to dialog stack, so that we can route the dialogs from dialog stack
        dialogSet.add(this);
        dialogSet.add(new GreetingDialog(GREETING_DIALOG));
        dialogSet.add(new ThanksDialog(THANKS_DIALOG));
        dialogSet.add(new ByeDialog(BYE_DIALOG));

        const dialogContext = await dialogSet.createContext(turnContext);

        let results = await dialogContext.continueDialog();
        if (results.status === DialogTurnStatus.empty) {

            const recognizerResult = await luisRecognizer.recognize(turnContext);
            const topIntent = LuisRecognizer.topIntent(recognizerResult);

            switch (topIntent) {
                case 'Greeting':
                    await dialogContext.beginDialog(GREETING_DIALOG);
                    break;
                case 'Thanks':
                    await dialogContext.beginDialog(THANKS_DIALOG);
                    break;
                case 'Bye':
                    await dialogContext.beginDialog(BYE_DIALOG);
                    break;
                default: await turnContext.sendActivity('Deafult message');
                break;
            }
        }


    }
}


module.exports.MainDialog = MainDialog;
module.exports.MAIN_DIALOG = MAIN_DIALOG;