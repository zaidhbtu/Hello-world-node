// what is Modules ?
// function add(a,b) {
//     return a+b;
// }

// function sub(a,b){
//     return a-b;
// }

// It override the add function with sub function
// module.exports = add;
// module.exports = sub;

// Solution to this problem is
// module.exports = {
//     addFn: add, 
//     subFn: sub,
// }


// Second way of doing this exports
exports.add = (a,b) => a+b;
exports.sub = (a,b) => a-b;