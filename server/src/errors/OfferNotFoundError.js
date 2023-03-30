const ApplicationError = require('./ApplicationError');

class OfferNotFoundError extends ApplicationError {
  constructor (message) {
    super(message || 'offer with this id not found', 404);
  }
}

module.exports = OfferNotFoundError;
