/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
// import readline from 'readline';
// import fs from "fs";
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.question('Enter the URL: \n', (answer) => {
//     fs.writeFile("URL.txt", answer, (err)=>{
//         if(err) console.error(err);
//     })
//     rl.close();
// });

import inquirer from "inquirer";
import fs from "fs";
import qr from "qr-image";

inquirer.prompt([
    {
        type: "input",
        name: "url",
        message: "Enter the URL: "
    }
])
.then((answer)=>{
    const url = answer.url;
    fs.writeFile("URL.txt", url, (err)=>{
                if(err) console.error(err);
                console.log("URL saved to URL.txt");
            });
            const qr_png = qr.image(url, { type: 'png' });
            const qr_file = fs.createWriteStream("qr_img.png");
            qr_png.pipe(qr_file);
            
            qr_file.on("finish", ()=>{
                console.log("QR code saved as qr_img.png");
            });
            
            qr_file.on("error", (err)=>{
                console.error(err);
            });
});




