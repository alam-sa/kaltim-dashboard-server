'use-strict';

module.exports = class JoiException extends Error {

  constructor (message) {

    super (message);

    if (typeof message != "string") {
      message = message.details.map((e)=> e.message.replaceAll('"','').replaceAll('_',' '));
    };

    this.name = this.constructor.name;

    this.statusCode = 403;

    this.printMsg = message || "Forbidden";

  };

};