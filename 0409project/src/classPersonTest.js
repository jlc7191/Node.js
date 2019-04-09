// 引入是require
const Person = require('./classPerson.js');

// a套Person這個類別
const a = new Person(
    'bill' , 25
);

// 直接叫
console.log(a);

// 也可使用剛剛創造的toJSON這個方法
console.log(a.toJSON());