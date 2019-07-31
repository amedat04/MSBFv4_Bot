const { ComponentDialog } = require('botbuilder-dialogs');

const THANKS_DIALOG = 'THANKS_DIALOG';

class ThanksDialog extends ComponentDialog {
    constructor() {
        super(THANKS_DIALOG);
      
    }

    async beginDialog(dc, options) {
        await dc.context.sendActivity( `You are welcome`);
        return await dc.endDialog();
    }
}

module.exports.ThanksDialog= ThanksDialog;
module.exports.THANKS_DIALOG = THANKS_DIALOG;