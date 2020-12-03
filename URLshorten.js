function generateShortenedURL() {
  const number = '0123456789'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = lowercase.toUpperCase()
  let collection = []
  collection = collection.concat(number.split(''), lowercase.split(''), uppercase.split(''))
  let shortLink = ''
  for (let i = 0; i < 5; i++) {
    shortLink += collection[Math.floor(Math.random() * collection.length)]
  }
  console.log('shortLink: ' + shortLink)
  return shortLink
}

module.exports = generateShortenedURL