var assert = require("assert");

var createCustomError = require('custom-error-generator');

export default class ErrorHelper {

  /*
   * Traitement de l'ensemble des données pour transformer les entrées
   * auteur de la base de donnée en suite d'objet Author
   */
  static throwQueryError(message) {

    var QueryError = createCustomError('QueryError', { 'returnCode': 400 }, TypeError);
    throw new QueryError(message);
  }

  
  static throwNotFoundError(message) {

    var NotFoundError = createCustomError('NotFoundError', { 'returnCode': 200 }, TypeError);
    throw new NotFoundError(message);
  }

}
