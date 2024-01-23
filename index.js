const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const employees = [];

//Manager
const promptForManager = () => {
inquirer.prompt([
    {   
        type: 'input',
        name: 'name',
        message: "What is the Managers name?",
        validate: input => {
            if(!input) {
                return "Please enter a name";
            }
            return true;
        }
    },
    {
        type: 'input',
        name: 'id',
        message: "What is the team managers ID?",
        validate: input => {
            if(!input) {
                return "Please enter employee ID";
            }
            if (isNaN(input)) {
                return "Please enter a valid employee ID";
            }
            return true;
        }

    },
    {
        type: 'input',
        name: 'email',
        message: "What is the manager's email address",
        validate: input => {
            if (!input) {
                return "Please enter a valid email address";
            }
            if (!/\S+@\S+\.\S+/.test(input)) {
                return "Please enter a valid email address";
            }
            return true;
        }

    },
    {
        type: 'input',
        name: 'officeNumber',
        message: "What is the managers office number",
        validate: input => {
            if (!input) {
                return "Please enter the office number";
            }
            if (isNaN(input)) {
                return "Please enter a valid office number";
            }
            return true;
        }
    },
]).then(response => {
    // populate manager info
    const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
    employees.push(manager);
    // promptForNexEmployee ()
    promptForNextEmployee();
})
}


// EMPLOYEE 
const promptForNextEmployee = () => {
    inquirer.prompt([{
        type: 'list',
        name: 'role',
        message: "What type of team member would you like to add?",
        choices: ['Engineer', 'Intern', 'I do not want to add any more team members']
    },
    ]).then(response => {
        if (response.role === 'Engineer') {
            promptForEngineer();
        } else if (response.role === 'Intern') {
            promptForIntern();
        } else {
            buildPage();          
        }
    });
};

// ENGINEER 
const promptForEngineer = () => {
    inquirer.prompt([
        { 
            type: 'input',
            name: 'name',
            message: "What is the engineer's name?",
            validate: input => {
                if(!input) {
                    return "Please enter a name";
                }
                return true;
            }
        },
        { // engineer's id
            type: 'input',
            name: 'id',
            message: "What is the engineer's employee ID?",
            validate: input => {
                if(!input) {
                    return "Please enter an employee ID";
                }
                if (isNaN(input)) {
                    return "Please enter a valid employee ID";
                } 
                return true;
            }
        },
        { // engineer's email
            type: 'input',
            name: 'email',
            message: "What is the engineer's email address?",
            validate: input => {
                if (!input) {
                    return "Please enter an email address";
                }
                if (!/\S+@\S+\.\S+/.test(input)) {
                    return "Please enter a valid email address";
                }
                return true;
            }
        },
        { // engineer's GitHub
            type: 'input',
            name: 'github',
            message: "What is the engineer's GitHub username?",
            validate: input => {
                if(!input) {
                    return "Please enter a GitHub username";
                }
                return true;
            }
        },
    ]).then(response => {
        const engineer = new Engineer(response.name, response.id, response.email, response.github);
        employees.push(engineer);
        promptForNextEmployee();
    });
};

// INTERN 
const promptForIntern = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the intern's name?",
            validate: input => {
                if(!input) {
                    return "Please enter a name";
                }
                return true;
            }
        },
        { // intern's id
            type: 'input',
            name: 'id',
            message: "What is the intern's ID?",
            validate: input => {
                if(!input) {
                    return "Please enter an employee ID";
                }
                if (isNaN(input)) {
                    return "Please enter a valid employee ID";
                } 
                return true;
            }
        },
        { // intern's email
            type: 'input',
            name: 'email',
            message: "What is the intern's email address?",
            validate: input => {
                if (!input) {
                    return "Please enter an email address";
                }
                if (!/\S+@\S+\.\S+/.test(input)) {
                    return "Please enter a valid email address";
                }
                return true;
            }
        },
        { // intern's school
            type: 'input',
            name: 'school',
            message: "What is the intern's school?",
            validate: input => {
                if(!input) {
                    return "Please enter a School name";
                }
                return true;
            }
        },
    ]).then((response) => {
        const intern = new Intern(response.name, response.id, response.email, response.school);
        employees.push(intern);
        promptForNextEmployee();
    });
};

// HTML file
const buildPage = () => {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
  const htmlpage = render(employees)
  fs.writeFileSync(outputPath, htmlpage)
  };
  
  promptForManager()


