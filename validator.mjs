export class Validator {
  constructor(config) {
    this.elementConfig = config;
    this.errors = {};
    this.errorsObject();
    this.inputListener();
  }
  errorsObject() {
    for (let field in this.elementConfig) {
      this.errors[field] = [];
    }
  }
    inputListener() {
      let selector = this.elementConfig
    for (let field in selector) {
      const element = document.querySelector(`input[name="${field}"]`);
      element.addEventListener("input", this.validate.bind(this));
    }
  }
  validate(e) {
    let elFields = this.elementConfig;

    const field = e.target;
    const fieldName = field.getAttribute("name");
    const filedValue = field.value;
    this.errors[fieldName] = [];


    if (elFields[fieldName].required) {
      if (filedValue === "") {
        this.errors[fieldName].push("Field can not be empty.");
      }
    }
      if (elFields[fieldName].email) {
        if (!this.validateEmail(filedValue)) {
          this.errors[fieldName].push("Email address is not correct.");
        }
      }
      if (
        filedValue.length < elFields[fieldName].minLength ||
        filedValue.length > elFields[fieldName].maxLength
      ) {
        this.errors[fieldName].push(
          `Field must have minimum ${elFields[fieldName].minLength} and maximum ${elFields[fieldName].maxLength} caracters`
        );
      }
      if (elFields[fieldName].matching) {
        let matchingEl = document.querySelector(
          `input[name="${elFields[fieldName].matching}"]`
        ).value;
        if (filedValue !== matchingEl) {
          this.errors[fieldName].push("Passwords are not maching");
          }
          if (this.errors[fieldName].length === 0) {
            this.errors[fieldName] = [];
            this.errors[elFields[fieldName].matching] = [];
          }
      }
    this.populateErrors();
    
  }
  validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
  }
  populateErrors() {
    let ulErrors = document.querySelectorAll("ul");
    ulErrors.forEach((ul) => {
      ul.remove();
    });
    for (let key of Object.keys(this.errors)) {
      let parentElement = document.querySelector(
        `input[name="${key}"]`
      ).parentElement;

      const ul = document.createElement("ul");
      parentElement.append(ul);
      console.log(this.errors[key]);
      this.errors[key].forEach((error) => {
        console.log(error);
        const li = document.createElement("li");
        li.innerText = error;
        ul.append(li);
      });
      
    }
  }
}
