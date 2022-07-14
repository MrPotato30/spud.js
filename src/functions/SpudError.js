class customError extends Error {}

async function throwCustomError(errorName, errorMessage){
    this.errorName = errorName;
    this.errorMessage = errorMessage;

    if(!this.errorMessage || !this.errorName) throw new TypeError(`Not enough values provided`)


  Object.defineProperty(customError.prototype, "name", {
    value: this.errorName,
  });
  throw new customError(this.errorMessage);
}

module.exports = throwCustomError;