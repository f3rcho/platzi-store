const sum = (a: number, b: number) => {
  return a + b;
};
console.log(sum(2, 1));

class Person {
  myName;
  myAge;
  getSummary() {
    return `My name is ${this.myName} and age ${this.myAge}`;
  }
}
const p = new Person();
p.myAge = 31;
p.myName = 'Fernando';
console.log(p);
