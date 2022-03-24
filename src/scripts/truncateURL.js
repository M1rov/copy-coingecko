const truncateURL = (url) => url.replace(/^http(s)?:\/\/(www.)?/, '')

export default truncateURL;