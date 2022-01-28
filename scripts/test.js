//clase 3
//object constructor
function Dog(name,age,color){
    this.name=name;
    this.age=age;
    this.color=color;
}
class cat{
    constructor(name,age){
        this.name=name;
        this.age=age;
    }
    roar(){
        console.log("Corre Macquin")
    }
}
function test1(){
    //crear el objeto
    //objeto literal
    let lol={
        name:"Lola",
        age:17,

    };
    console.log(lol);

    //object constructor
    let jojo=new Dog("Jojo",10,"black");
    console.log(jojo);

    //objeto de una clase
    let ford= new cat("Corre",10);
    console.log(ford);
    ford.roar();
}
test1();