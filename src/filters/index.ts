export const getMylonaCategorySlug = (name: string): string =>
  name.toLowerCase().split(' ').join('-')

export const getDisplay = (exp: any, eqf: any, tuc: any): any => {
  const priority1 = exp
  const priority2 = tuc
  const priority3 = eqf

  // Method to determine median result
  if ((priority1 === priority2 || priority1 === eqf) && priority1)
    return priority1
  else if (priority2 === priority3 && priority2) return priority2
  else {
    if (priority1) {
      return priority1
    } else if (priority2) return priority2
    else if (priority3) return priority3
  }

  return null
}

export const getAttributeValue = (object: any, field: string) => {
  const value = field
    .split('.')
    .reduce((acc, val) => (acc && (acc as any)[val]) || null, object)

  // Not sure how else to handle the remark field values
  if (Array.isArray(value) && field.includes('Remark')) {
    return value.map((x) => x?.RemarkCode?.description).join('; ')
  }

  if (value?.RemarkCode?.description) return value.RemarkCode.description

  return value
}

export const mergeName = (nameObj) =>
  `${stripWhitespace(nameObj.first)} ${stripWhitespace(
    nameObj.middle
  )} ${stripWhitespace(nameObj.last)}`

export const formatAddress = (addressObj) => {
  let street = ''
  if (addressObj.unparsedStreet) {
    street = stripWhitespace(addressObj.unparsedStreet)
  } else if (addressObj.streetName) {
    if (
      addressObj.streetName.split(' ').indexOf(addressObj.houseNumber) !== -1
    ) {
      street = stripWhitespace(addressObj.streetName)
    } else {
      street = `${stripWhitespace(addressObj.houseNumber)} ${stripWhitespace(
        addressObj.streetName
      )}`
    }
  }

  return `${street}<br>${stripWhitespace(addressObj.city)}${
    addressObj?.city && addressObj?.stateCode ? ',' : ''
  } ${stripWhitespace(addressObj.stateCode)} ${stripWhitespace(
    addressObj.postalCode
  )}`
}

export const formatPaymentDate = (str: string) => {
  const date = new Date(str)
  const month = date.toLocaleString('default', { month: 'short' })
  return month === 'Jan'
    ? "'" + date.toLocaleString('default', { year: '2-digit' })
    : month
}

export const getPaymentMonth = (str: string) => {
  const date = new Date(str)
  const month = date.toLocaleString('default', { month: 'short' })
  return month
}

export const getPaymentYear = (str: string) => {
  const date = new Date(str)
  const year = date.toLocaleString('default', { year: '2-digit' })
  return year
}

export const formatDate = (str: string | null) => {
  if (str) {
    const date = new Date(str)
    return date.toLocaleString('default', {
      timeZone: 'UTC',
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return str
}

export const formatPhone = (str: string) =>
  isNaN(parseInt(str))
    ? str
    : `${str.slice(0, 3)}-${str.slice(3, 6)}-${str.slice(6)}`

export const currency = (value) => {
  if (value === 0) return '$0'

  if (
    (value && typeof parseInt(value) !== 'number') ||
    !value ||
    value === '--'
  ) {
    return value
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  })

  return formatter.format(value)
}

/**
 *
 * Account number obfuscation rules from Experian
 * a. 3 Digits
 * 	i. All digits masked
 * 	ii. Example: Account# = 123, after masking=XXX
 * b. 4 Digits
 * 	i. All digits masked
 * 	ii. Example: Account# = 1234, after masking=XXXX
 * c. 5 Digits
 * 	i. 4 trailing digits masked, 1 leading digit shared clear text
 * 	ii. Example: Account#=12345, after masking=1XXXX
 * d. 6 Digits
 * 	i. 4 trailing digits masked, 2 leading digit shared clear text ii. Example: Account#=123456, after masking=12XXXX
 * e. 7 digits or more
 * 	i. 6 leading characters are shared clear text, remainder are masked. Masking will keep going depending on number of digits in accounts.
 * 	ii. Example: Account#=123456789, after masking=123456XXX (edited)
 *
 * @param {string} accountNumber
 * @returns {string}
 */
export const obscureAccountNumber = (accountNumber: string | null) => {
  if (!accountNumber?.length) return

  if (accountNumber.length < 7) {
    return accountNumber
      .replace(/.{1,4}$/, '****')
      .slice(0, accountNumber.length)
  } else {
    return accountNumber.replace(
      /(?<=.{6}).*/,
      '*'.repeat(accountNumber.length - 6)
    )
  }
}

export const flag = (value, display) => {
  if (typeof parseInt(value) !== 'number') {
    return value
  }

  return (display - value) / display > 0.1
}

export const diffThresholdFlag = (value, display) =>
  isNaN(parseInt(value)) ? false : (display - value) / display > 0.25

export const truncate = (str, chars) => (str ? str.slice(0, chars) : str)

export const stripWhitespace = (str) =>
  str?.length ? str.replace(/\s+/g, ' ').trim() : ''

export const calculateMax = (tuc, exp, eqf) => {
  return Math.max(tuc ? tuc : 0, exp ? exp : 0, eqf ? eqf : 0).toString()
}

export const pluralize = (str: string, count: number) => {
  if (count === 1) return str

  if (str.endsWith('y')) return str.slice(-1).concat('ies')

  return str.concat('s')
}

export const parseJwt = (token: string): object => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}
