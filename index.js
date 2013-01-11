module.exports = process.env.PASSWORD_COV ? require('./lib-cov/passwordPolicy') : require('./lib/passwordPolicy');
