const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function rectangle() {
    rl.question("Enter the height of the rectangle: \n", (height) => {
        rl.question("Enter the width of the rectangle: \n", (width) => {
            //Print area
            if (Math.abs(height - width) > 5 || height === width) {
                const area = height * width;
                console.log("The area of the rectangle is: ", area, "\n");
            }
            //Print perimeter
            else {
                const perimeter = 2 * (parseFloat(height) + parseFloat(width));
                console.log("The perimeter of the rectangle is: ", perimeter, "\n");
            }
            main();
        });
    });
}

function triangle() {
    rl.question("Enter the height of the triangle: \n ", (height) => {
        rl.question("Enter the width of the triangle:  \n", (width) => {
            rl.question("Please choose an option (1/2): \n 1. Calculate the perimeter of the triangle\n 2. Print the triangle\n", (choice) => {
                switch (choice) {
                    case "1":
                        trianglePerimeter(height, width);
                        break;

                    case "2":
                        printTriangle(height, width);
                        break;

                    default:
                        console.log("Illegal choice \n");
                        triangle();
                }
            });
        });
    });
}

//Print triangle perimeter
function trianglePerimeter(height, width) {

    height = parseInt(height)
    width = parseInt(width)
    sideLength = Math.sqrt(Math.pow(height, 2) + Math.pow(width / 2, 2))
    const perimeter = width + (2 * sideLength)
    console.log("The perimeter of the rectangle is: ", perimeter, '\n');
    main()
}

//Print triangle
function printTriangle(height, width) {

    height = parseInt(height);
    width = parseInt(width);
    let counterOddNumber = 0
    
    if (width % 2 === 0 || width > (height * 2)) {
        console.log("The triangle cannot be printed. (The width of the triangle is even / Its width is more than twice as long as its height)");
    }
    else if (width % 2 !== 0 && width < (height * 2)) {

        //Print top line
        console.log(" ".repeat((width - 1 ) / 2) + "*");

        //Print middle lines
        if (height > 2) {
            //Count how many odd numbers between the top and the bottom(width and 1)
            for (let i = 3; i <= width; i += 2) {
                counterOddNumber++
            }
            counterOddNumber>1? counterOddNumber-- : counterOddNumber
            let remainer = (height - 2) % counterOddNumber
            let rows = Math.floor((height - 2) / counterOddNumber)

            //Printing additional lines according to remainder
            if (remainer > 0) {
                for (let i = 0; i < remainer; i++) {
                    const spaces = (width - 3) / 2;
                    console.log(" ".repeat(spaces) + "*".repeat(3));
                }
            }
            height = (height - 2 - remainer)
            
            //Printing the rows according to the division
            for (let i = 1; i <= counterOddNumber; i++) {
                let stars = (i*2) +1
                let spaces = Math.floor((width - stars) / 2); 
                for (let j = 0; j < rows; j++) {
                    console.log(" ".repeat(spaces) + "*".repeat(stars));
                }
            }
        }
        //Print bottom line
        console.log("*".repeat(width));
        main();
    }

}


function main() {
    rl.question("Menu:\n 1. Rectangle\n 2. Triangle\n 3. Exit\n Please choose an option (1/2/3): ", (choice) => {
        switch (choice) {
            case "1":
                rectangle();
                break;

            case "2":
                triangle();
                break;

            case "3":
                console.log("Good Day!");
                rl.close();
                break;

            default:
                console.log("Illegal choice");
                main();
        }
    });
}
main()

