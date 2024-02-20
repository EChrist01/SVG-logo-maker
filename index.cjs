const inquirer = require("inquirer");
const fs = require("fs");
const { Triangle, Circle, Square } = require("./shape/shape.cjs");

// Function for writing to file
function writeToFile(fileName, svgContent) {
  fs.writeFile(`./generated/${fileName}`, svgContent, (err) => {
    if (err) {
      console.error("Error writing SVG file:", err);
    } else {
      console.log(`Generated ${fileName}`);
    }
  });
}

// Generate SVG content based on user input
function generateSVG(answers) {
  let svg = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<g>`;
  if (answers.shape === "Triangle") {
    svg += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeColor}"/>`;
  } else if (answers.shape === "Circle") {
    svg += `<circle cx="150" cy="115" r="80" fill="${answers.shapeColor}"/>`;
  } else if (answers.shape === "Square") {
    svg += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeColor}"/>`;
  }
  svg += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text></g></svg>`;
  return svg;
}

// An array of questions for user input
const questions = [
  {
    type: "input",
    message: "What Text would you like the logo to display? (Max 3 characters)",
    name: "text",
  },
  {
    type: "input",
    message: "What color would you like the text to be? (Color Keyword or Hexadecimal input)",
    name: "textColor",
  },
  {
    type: "list",
    message: "What shape would you like your logo to be?",
    choices: ["Triangle", "Circle", "Square"],
    name: "shape",
  },
  {
    type: "input",
    message: "What color do you want the shape to be? (Color Keyword or Hexadecimal input)",
    name: "shapeColor",
  },
];

// Function to initialize app
function init() {
  inquirer.prompt(questions).then((answers) => {
    if (answers.text.length > 4) {
      console.log("Text display entry must be less than 4 characters!");
    } else {
      const svgContent = generateSVG(answers);
      writeToFile(`${answers.text}.svg`, svgContent);
    }
  });
}

// Function call to initialize app
init();