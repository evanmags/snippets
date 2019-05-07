"use strict"

const fs = require("fs").promises;
const inquire = require("inquirer");

async function main() {
  let infile;
  const answers = await inquire.prompt([
    {
      type: "input",
      name: "name",
      message: "Name your snippet"
    },
    {
      type: "checkbox",
      name: "entry_type",
      message: "How would you like to submit your snippet?",
      choices: ["Upload a file", "Create a file (opens default code editor)"]
    }
  ]);

  const outfile = answers.name;

  if (answers.entry_type == "Create a file") {
    inquire.prompt([
      {
        type: "editor",
        name: "code",
        message: "Please enter your snippet"
      }
    ]);
  } else {
    infile = await inquire.prompt([
      {
        type: "input",
        name: "filename",
        message: "What file would you like to upload?"
      }
    ]).then(async (answers) => {
      const filename = answers.filename;
      console.log(filename);
      let file
      try{
        file = await fs.readFile(filename, 'utf-8');
      } catch (err) {
        console.log(err);
      }
      return file;
    });
  }

  fs.writeFile(outfile, infile);
}

main();
