export  default class Students{
    constructor(name,age,gender){
        this.name=name;
        this.age=age;
        this.gender=gender;
    }
    getDescription(){
        return '姓名：'+this.name+" 性别："+this.gender+" 年龄："+this.age
    }
}