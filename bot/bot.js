// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler } = require('botbuilder');
var logger = require('../utils/logger')

class EchoBot extends ActivityHandler {
    constructor(conversationState, userState, dialog) {
        super();

        this.conversationState = conversationState;
        this.userState = userState;
        this.dialog = dialog;
        this.dialogState = this.conversationState.createProperty('DialogState');


        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async(context, next) => {

            // Run the Dialog with the new message Activity.
            await this.dialog.run(context, this.dialogState);

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onTurn(async(context, next) => {
            if (!context) {
                throw new Error(`Context is returning null`);
            };





            await context.onSendActivities(async(context, activities, nextSend) => {

                let user = context._activity;
                let bot = activities[0];

                let chat = {};

                chat["user_message_type"] = user.type
                chat["user_input"] = user.text;
                chat["user_input_ts"] = user.timestamp;
                chat["bot_message_type"] = bot.type
                chat["bot_response"] = bot.text;
                chat["bot_response_ts"] = new Date();
                if (bot.type == "trace") {
                    chat["trace_type"] = bot.label;
                    chat["trace_data"] = bot.value;
                } else {
                    chat["trace_type"] = "";
                    chat["trace_data"] = "";
                }







                // console.log("***************")
                // console.log("User Input: ",user.text," @",user.timestamp);
                // console.log();
                // console.log("Bot Response: ",bot.text," @",new Date());
                // console.log("***************")
                logger.log(chat)
                    // console.log(chat)
                console.log()

                return await nextSend();
            });



            // By calling next() you ensure that the next Middleware is run.
            await next();
        });


        this.onMembersAdded(async(context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity('Welcome, How may I help you?');
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;