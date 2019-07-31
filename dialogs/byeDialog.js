const { ComponentDialog } = require('botbuilder-dialogs');

const BYE_DIALOG = 'BYE_DIALOG';

class ByeDialog extends ComponentDialog {
    constructor() {
        super(BYE_DIALOG);
      
    }

    async beginDialog(dc, options) {
        await dc.context.sendActivity(`Good bye :)`);
        return await dc.endDialog();
    }
}

module.exports.ByeDialog= ByeDialog;
module.exports.BYE_DIALOG = BYE_DIALOG;