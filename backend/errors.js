class NotFoundError extends Error {
  constructor(message) {
      super(message);
      this.name = 'NotFoundError';
  }
}

class FoundError extends Error {
  constructor(message) {
      super(message);
      this.name = 'FoundError';
  }
}

module.exports = {
  NotFoundError,
  FoundError,
}