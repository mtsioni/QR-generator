import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';
  

// Prompt the user for a valid URL
inquirer
  .prompt([
    {
        type: 'input',
        name: 'url',
        message: 'Provide a valid base URL',
        validate: function (input){
            //Validate that the input is a valid URL
            const urlRegex = /^(http|https):\/\/[^ "]+$/;
            return urlRegex.test(input) ? true: 'Please enter a valid URL';
        }
    }
  ])

  .then((answers) => {
    const qr_png = qr.image(answers.url, { type: 'png' });   // Generate a QR code for the provided URL
    fs.writeFileSync('URL.txt', `User entered URL: ${answers.url}`);   // Save the user input to URL text file
    qr_png.pipe(fs.createWriteStream('qr_code.png'));  // Save the QR code image to an SVG file
    console.log('QR code generated and user input saved successfully!');
  })

  .catch((error) => {
    if (error.isTtyError) {
        console.error("Prompt couldn't be rendered in the current environment");
    } else {
        console.error('Something else went wrong:', error);
    }
});


// const svg_string = qr.imageSync(answers.url, { type: 'svg' });  // Generate SVG string for the provided URL
// console.log('SVG string:', svg_string);