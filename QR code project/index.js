import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

// Step 1: Getting user input and outputting it as a URL
inquirer
    .prompt([{
        message: "Please enter your link to generate a QR code:",
        name: "URL",
    }])
    .then((answers) => {
        const url = answers.URL;

        // Step 2: Generating a QR code image for our URL
        const qr_png = qr.image(url, { type: 'png' });
        qr_png.pipe(fs.createWriteStream("qr_code.png"));

        // Step 3: Saving our user input to a text file
        fs.writeFile("URL.txt", url, (err) => {
            if (err) throw err;
            console.log("The URL has been saved to URL.txt!");
        });
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.error("Prompt couldn't be rendered in the current environment.");
        } else {
            console.error("Something else went wrong:", error);
        }
    });