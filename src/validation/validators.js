import { helpers } from '@vuelidate/validators'

/**
 * Regex library for validators
 */
const ccRegex = helpers.regex(
  /^(?:4[0-9]{15}?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
)
const phoneRegex = helpers.regex(/^[2-9]\d{2}[2-9]\d{2}\d{4}$/)
const invalidCharsRegex = helpers.regex(/^(?=[-0-9A-Za-z.#'\s]*$).*/)
const invalidPWRegex = helpers.regex(/^(?=[-a-zA-Z0-9@_*.!#$%^&]*$).*/)
const emailNoDomainRegex = helpers.regex(/^[a-zA-Z0-9_.-].*/)

/**
 * Custom validator rules
 */
const phone = (value) =>
  !helpers.req(value) || phoneRegex(value.replace(/\D/g, ''))

const zip = (val) => val.length === 5

const creditCard = (value) => ccRegex(value.replace(/\s/g, ''))

/* expiration date must be in the future to be valid */
const expirationDate = (value) => {
  const currentTime = new Date()
  const currMonth = currentTime.getMonth() + 1
  const currYear = parseInt(currentTime.getFullYear().toString().slice(-2))
  const month = value.slice(0, 2)
  const year = parseInt(value.slice(-2))

  if (year > currYear) return true
  else if (year === currYear && month >= currMonth) return true
  else return false
}

// Validates true if valid date and date is not in the future
const birthdate = (value) => {
  if (Date.parse(value) && value.length > 9) {
    const date = new Date(value)

    if (date) {
      const age = (Date.now() - date) / 31557600000
      if (age < 18) return false
      else return true
    }
  }

  return false
}

const invalidChars = (value) => invalidCharsRegex(value)

const invalidPWChars = (value) => invalidPWRegex(value)

const emailNoDomain = (value) => emailNoDomainRegex(value)

export {
  creditCard,
  phone,
  invalidChars,
  invalidPWChars,
  zip,
  birthdate,
  emailNoDomain,
  expirationDate,
}
