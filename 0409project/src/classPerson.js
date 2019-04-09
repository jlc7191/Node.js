class Person{
    // 基本建構函式用constructor
    constructor(name='noname',age=20){
        this.name = name,
        this.age = age
    }
    
    
    // 以下為建立一個方法~可用可不用歐!!
    toJSON(){
        const obj= {
            name : this.name,
            age : this.age
        };
        return JSON.stringify(obj)
    }
}
module.exports = Person;