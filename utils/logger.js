//Хз зачем это (возможно потом сделаю)

const chalk = require("chalk");
const strftimee = require('strftime')
let strftime = strftimee.timezone('+0300')

class Logger {
  now() {
    return strftime('%d.%m.%Y в %H:%M:%S', new Date.now())
  }

  /**
   * @param {string} type
   * @param {string} error
   */
  error(type, error) {
    return console.error(
      chalk.red(`[${type.toUpperCase()}][${this.now()}]: ${error}`)
    );
  }

  warn(type, warning) {
    return console.warn(
      chalk.yellow(`[WARNING] [${type.toUpperCase()}][${this.now()}]: ${warning}`)
    );
  }

  /**
   * @param {string} type
   * @param {string} message
   */
  log(type, message) {
    return console.log(`[INFO] [${type.toUpperCase()}][${this.now()}]: ${message}`);
  }
}

module.exports = new Logger();