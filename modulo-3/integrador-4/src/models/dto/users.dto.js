const { hashPassword } = require("../../utils/hashPassword.utils")

class SaveUserDTO {
  constructor(payload) {
    this.firstName = payload.firstName;
    this.lastName = payload.lastName;
    this.githubUsername = payload.githubUsername || "";
    this.email = payload.email;
    this.age = payload.age;
    this.password =  hashPassword(payload.password)
    this.role = payload.role;
    this.active = true;
  }
}

module.exports = { SaveUserDTO };
