const keyValueToString = ([key, value]) => {
  if (typeof value === 'object' && !Array.isArray(value)) throw new Error()
  return `${key}=${value}`
}

const queryString = object =>
  Object.entries(object).map(keyValueToString).join('&')

const parse = queryString =>
  Object.fromEntries(
    queryString.split('&').map(attribute => {
      let [key, value] = attribute.split('=')
      if (value.indexOf(',') !== -1) value = value.split(',')
      return [key, value]
    }),
  )

module.exports = { queryString, parse }
