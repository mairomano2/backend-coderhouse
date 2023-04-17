class CostumeError {
  static CreateError({ name = "error", message, cause }) {
    const error = new Error(message, { cause });
    error.name = name;
    throw Error
  }
}

module.exports = CostumeError