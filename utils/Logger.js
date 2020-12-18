const chalk = require("chalk");
const { formatDate } = require('./functions')

class Logger {
  now() {
    return formatDate(new Date());
  }

  /**
   * @param {string} type
   * @param {string} error
   */
  error(type, error) {
    if(!type || type === '') throw TypeError("Нужен тип!")
    if(!error || error === '') throw TypeError("Нужна сообщение!")
    return console.error(
      chalk.red(`[${type.toUpperCase()}][${this.now()}]: ${error}`)
    );
  }

  /**
   * @param {string} type
   * @param {string} warning
   */
  warn(type, warning) {
    if(!type || type === '') throw Error("Нужен тип!")
    if(!warning || warning === '') throw TypeError("Нужно сообщение!")
    return console.warn(
      chalk.yellow(
        `[WARNING][${type.toUpperCase()}][${this.now()}]: ${warning}`
      )
    );
  }

  /**
   * @param {string} type
   * @param {string} message
   */
  log(type, message) {
    if(!type || type === '') throw TypeError("Нужен тип!")
    if(!message || message === '') throw TypeError("Нужно сообщение!")
    return console.log(
      `[INFO][${type.toUpperCase()}][${this.now()}]: ${message}`
    );
  }
}

module.exports = new Logger();