// let p = [{ 1: 1 }, { 1: 1 }, { 1: 1 }]

// console.log(p.map((item) => item), "pppp");

// console.log("pkpkpkpk");


// const nam = (n) => {
//     if ((n & 1) == 0) {
//         return "even"
//     }
//     else {
//         return "noteven"
//     }
// }
// console.log(nam(33));

// for (let i = 1; i <= 4; i++) {
//     let p = ""
//     for (let j = 1; j <= 4; j++) {
//         if (j <= i) {
//             p += "*";
//         }
//         else {
//             p += ""
//         }
//     }
//     console.log(p);

// }


// const np = (n) => {
//     return n.split(" ").map((item) => {
//         let pk = item[0].toUpperCase() + item.slice(1).toLowerCase()
//         console.log(pk);



//     }

//     ).join(" ")




// }

// console.log(np("pawan kumar"));


let a = (nm) => {

    if (nm % 2 === 0) {
        console.log("its even");

    }
    else {
        console.log("its Odd");

    }


}

console.log(a(123));

let pt = "123454";
console.log(+pt);

const arr = ["", null, undefined, false, 5]
console.log(arr.filter(Boolean));

let num = 1320;

console.log(num.toString(2));



