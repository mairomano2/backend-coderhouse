class SaveProductDTO {
  constructor(payload) {
    this.title = payload.title;
    this.description = payload.description;
    this.code = payload.code;
    this.price = payload.price;
    this.status = payload.status;
    this.stock = payload.stock;
    this.category = payload.category;
    this.thumbnails = payload.thumbnails;
    this.owner = payload.owner
  }
}

class UpdateProductDTO {
  constructor(payload) {
    Object.assign(this, payload);
    this.title = payload.title;
    this.description = payload.description;
    this.code = payload.code;
    this.price = payload.price;
    this.status = payload.status;
    this.stock = payload.stock;
    this.category = payload.category;
    this.thumbnails = payload.thumbnails;
    this.owner = payload.owner
  }
}

module.exports = { SaveProductDTO, UpdateProductDTO };
