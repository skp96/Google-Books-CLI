const prompt = require('prompt');
const CommandLine = require('./src/commandLine').CommandLine
const config = require("config");

module.exports = () => {

  // Set the properties for the initial prompt
  const initPrompt = () => {
    prompt.get(["input"], processSelection);
  };

  // Process user input
  const processSelection = (err, result) => {
    if (result.input === config.get("processSelectionInput1")) {
      // init a CLI instance to start the search process
      global.cli = new CommandLine();
      global.cli.startCli()
    } else if (result.input === config.get("processSelectionInput2")) {
      console.log("You have successfully exited the application");
    } else {
      console.log("Please enter a valid selection - yes or no.");
      initPrompt();
    }
  };

  console.clear();
  console.log("Welcome to Google Books CLI");
  console.log("Ready to start searching for your favorite books?");
  console.log("Please enter yes to start search, or no to exit application.");

  prompt.start();
  initPrompt();

}