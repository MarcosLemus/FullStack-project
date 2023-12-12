const config = require('config')

module.exports = function () {
	if (!config.has('jwtSecret')) {
		console.error('FATAL ERROR: jwtSecret is not defined.')
		process.exit(1)
	}
}
