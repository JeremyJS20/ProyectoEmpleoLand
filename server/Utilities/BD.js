const mysql = require('mysql');
let dbCC = null;

 class Database {
    constructor() {
      if (Database.exists) {
        return Database.instance;
      }
      dbCC = null;
      Database.instance = this;
      Database.exists = true;
      return this;
    }
   
    dbCreateCon(){
      if (dbCC != null) {
        return dbCC;
      } 
      dbCC = mysql.createPool({
        host:'ba3lrsiialbetrr9d4r0-mysql.services.clever-cloud.com',
        database:'ba3lrsiialbetrr9d4r0',
        user:'utays06rw9jcqcm4',
        password:'hQF6RJBV38GFazNuTHUe'
     });

      return dbCC;
      }

  }

  module.exports = Database;