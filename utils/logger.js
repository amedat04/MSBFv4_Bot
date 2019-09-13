var fs = require('fs');

function formatDate(date) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return monthNames[monthIndex] + '_' + year;
}



module.exports = {
    log(chats) {

        var folderName = formatDate(new Date()); //set the folder name in format(month_year) e.g.January_2019
        var file_name = folderName + "_ " + (new Date().getUTCDate()) + ".json"; // set the file name in the format (month_year_date.txt) for eg. January_2019_1.txt
        var directory = "./logs/" + folderName;
        //makes directory if it doesn't exist
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }

        //create file in directory
        var logFilePath = directory + "/" + file_name;

        fs.open(logFilePath, 'r', function(logFile_OpenErr, fd) { //rename err
            //if log file does not exist
            if (logFile_OpenErr) {
                //create and write logs to log file
                fs.writeFile(logFilePath, JSON.stringify([]), function(topQuestionsFile_WriteErr) {
                    if (topQuestionsFile_WriteErr) {
                        console.log(topQuestionsFile_WriteErr);
                    }
                    fs.readFile(logFilePath, 'utf-8', (readError, logData) => {
                        logData = JSON.parse(logData);
                        logData.push(chats);
                        fs.writeFile(logFilePath, JSON.stringify(logData), function(logFile_WriteErr) {
                            if (logFile_WriteErr) {
                                console.log("There was error while writing the logs, error: ", logFile_WriteErr)
                            }
                        })
                    })


                    console.log("chat were was succesfully logged ");
                });
            }
            //if log file already exists
            else {
                console.log("The log file for " + logFilePath + " exists!");

                fs.readFile(logFilePath, 'utf-8', (readError, logData) => {
                    logData = JSON.parse(logData);
                    logData.push(chats);
                    fs.writeFile(logFilePath, JSON.stringify(logData), function(logFile_WriteErr) {
                        if (logFile_WriteErr) {
                            console.log("There was error while writing the logs, error: ", logFile_WriteErr)
                        }
                        console.log("chat were was succesfully logged ");
                    })
                })

            }
        })

        //Append the file content along with the time stamp in the format as for eg. Wed, 06 Feb 2019 06:43:48 GMT ==> FileContents
        // var fileContentsToWrite = new Date().toUTCString() + " ==>\n" + FileContent + '\n\n=======================================================' + '\n\n';
        // fs.appendFile(logs, JSON.stringify(chats), function (err, data) {
        //     if (err) console.log(err);

        // });

    }
}