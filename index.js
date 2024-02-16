// Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const { Triangle, Circle, Square, Bean } = require("./shape/shape.js");

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
  } else if (answers.shape === "Bean") {
    svg += `<path d="M165.71855477658534 84.43113955194787C158.08381966916346 82.18563072219527 150.2993856685124 85.17964164748824 145.05986337033534 81.73652895624474C139.82034107215827 78.29341626500124 139.22154041297858 68.4131825003528 134.28142098752284 63.77246340448693C129.3413015620671 59.13174430862105 122.00597187049812 54.79041791295046 115.41914681760096 53.89221438104943C108.8323217647038 52.994010849148395 99.99999042518559 54.94012697870568 94.76047067014002 58.38324221308068C89.52095091509446 61.82635744745568 86.22753711708012 67.9640807344023 83.98202828732752 74.55090578729943C81.73651945757493 81.13773084019655 79.79041095741215 90.86826316848433 81.2874176916244 97.90419253046349C82.78442442583665 104.94012189244265 87.12574319211268 111.52696220412884 92.96406869260096 116.76648195917443C98.80239419308924 122.00600171422002 107.63473824826502 125.44909914667443 116.31737069455409 129.34131106073698C125.00000314084315 133.23352297479937 135.32932341265303 137.7245406343044 145.05986337033534 140.1197534435492C154.79040332801765 142.51496625279395 166.1676718013249 144.1616896821559 174.70061044064784 143.71258791620545C183.23354907997077 143.2634861502549 191.61677865353846 142.8143665823838 196.25749520627284 137.42514284784613C200.8982117590072 132.03591911330852 203.44311328895515 118.41317232782677 202.54490975705409 111.37724550897912C201.64670622515303 104.34131869013146 197.0059998449447 99.70059959426558 190.86827401486659 95.20958193476037C184.73054818478846 90.71856427525515 173.3532898840072 86.67664838170046 165.71855477658534 84.43113955194787C158.08381966916346 82.18563072219527 150.2993856685124 85.17964164748824 145.05986337033534 81.73652895624474" fill="${answers.shapeColor}"/>`;
  }
  svg += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text></g></svg>`;
  return svg;
}

// An array of questions for user input
const questions = [
  {
    type: "input",
    message: "What Text would you like the logo to display? (Max 4 characters)",
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
    choices: ["Triangle", "Circle", "Square", "Bean"],
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