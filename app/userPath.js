const {readdirSync} = require('fs');
const {homedir} = require('os');
const {join} = require('path');

let usersPath;

try {
    usersPath = readdirSync(join(homedir(), 'wanted_boards'));
} catch (err) {
    console.log('wanted_boards directory do not found. Create the wanted_boards directory in your home directory running the homedir script in the scripts directory or create it manually');
}

module.exports = {
    'usersPath':usersPath
};
