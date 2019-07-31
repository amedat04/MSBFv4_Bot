

const { ComponentDialog } = require('botbuilder-dialogs');

const GREETING_DIALOG = 'GREETING_DIALOG';

class GreetingDialog extends ComponentDialog {
    constructor() {
        super(GREETING_DIALOG);
      
    }

    async beginDialog(dc, options) {
        await dc.context.sendActivity(`Hi! I'm a bot.`);
        return await dc.endDialog();
    }
}

module.exports.GreetingDialog= GreetingDialog;
module.exports.GREETING_DIALOG = GREETING_DIALOG;