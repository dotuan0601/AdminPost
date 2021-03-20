export default class Validator {
  constructor(data) {
    this.data = data;
    this.errors = {
      title: [],
      content: [],
    };
  }

  validatePresence(attr) {
    if(this.data[attr] == ""){ 
      this.errors[attr].push("can't be blank");
    }
    return this;
  }

  isValid() {
    let count = Object.keys(this.errors.title).length +
    Object.keys(this.errors.content).length;

    return count === 0;
  }
}

