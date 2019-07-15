const fs = require("fs");

//write out data
function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

//where we will store our commands
function evaluateCmd(userInput) {
  //parses the user input to understand which command was typed
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];

  switch (command) {
    case "echo":
      commandLibrary.echo(userInputArray.slice(1).join(" "));
      break;
      case "cat":
       commandLibrary.cat(userInputArray.slice(1));
      break;
      case "head":
        commandLibrary.head(userInputArray.slice(1));
      break;
      case "tail":
        commandLibrary.tail(userInputArray.slice(1));
        break;
      case "help":
        process.stdout.write("echo - prints back the string recieved \ncat - prints the contents of the file requested \nhead - prints the first 5 lines of the file requested \ntail - prints the last 5 lines of the file requested \nhelp - prints the full list of available commands");
        break;
      default:
        process.stdout.write("Command not found, try typing 'help' into the promt for a full list of commands.");
  }
}

//where we will store the logic of our commands
const commandLibrary = {
  //the echo command
  "echo": function(userInput) {
    done(userInput);
  },
  //the cat command
  "cat": function(fullPath) {
       const fileName = fullPath[0];
       fs.readFile(fileName, (err, data) => {
           if (err) throw err;
           done(data);
       });
   },
   //the head command
   "head": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            var text = data.toString('utf8');
            var splitLines = text.split('\n');
            var slicedText = splitLines.slice(0,5).join('\n');
            var bufferText = Buffer.from(slicedText, 'utf8');
            done(bufferText);
        });
    },
    //the tail command
    "tail": function(fullPath) {
         const fileName = fullPath[0];
         fs.readFile(fileName, (err, data) => {
             if (err) throw err;
             var text = data.toString('utf8');
             var splitLines = text.split('\n');
             var slicedText = splitLines.slice(-5).join('\n');
             var bufferText = Buffer.from(slicedText, 'utf8');
             done(bufferText);
         });
     }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
