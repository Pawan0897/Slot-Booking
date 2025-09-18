
for (let i = 1; i <= 3; i++) {
    let p = ""

    for (j = 1; j <= 5; j++) {
        if (j >= 4 - i && j <= 2 + i) {
            p += "*"


            // console.log(j);


        }
        else {
            p += " "
        }
    }
    console.log(p);


}