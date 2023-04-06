class SaveCartDTO {
  constructor(payload) {
    this.code = payload.code;
    this.products = payload.products;
    this.email = payload.email;
    this.dateTime = payload.dateTime;
  }
}

class UpdateCartDTO {
  constructor(newPayload, currentPayload) {
    Object.assign(this, currentPayload);

    if (newPayload.name && newPayload.lastName) {
      this.first_name = newPayload.name;
      this.last_name = newPayload.lastName;
      this.full_name = `${newPayload.name} ${newPayload.lastName}`;
    } else if (newPayload.name) {
      this.first_name = newPayload.name;
      this.full_name = `${newPayload.name} ${
        currentPayload.last_name || ""
      }`.trim();
    } else if (newPayload.lastName) {
      this.last_name = newPayload.lastName;
      this.full_name = `${currentPayload.first_name} ${newPayload.lastName}`;
    }

    newPayload.email && (this.email = newPayload.email);
    newPayload.phone && (this.phone = newPayload.phone.split("-").join(""));
    newPayload.active !== undefined && (this.active = newPayload.active);
  }
}

module.exports = { SaveCartDTO, UpdateCartDTO };
