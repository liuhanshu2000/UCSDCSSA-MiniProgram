/**
 * Copyright (c) 2019
 *
 * Contains utility methods for various pages
 *
 * @summary Utility methods for verifying 
 * @author Arjun <arjunkomath@gmail.com>
 *
 * Created at     : 2017-11-03 02:21:56 
 * Last modified  : 2019-03-11 11:29:20
 */

const isValidNumber = num => {
  let regexp = /^1[34578]\d{9}$/
  return num.match(regexp)
}

const isValidEmail = str => {
  let regexp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  return str.match(regexp)
}

module.exports = {
  isValidEmail: isValidEmail,
  isValidNumber: isValidNumber
}
