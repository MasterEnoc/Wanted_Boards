const {readdirSync} = require('fs');
const {homedir} = require('os');
const {join} = require('path');

let paths;
let usersPath;

try {
    paths = readdirSync(join(homedir(), 'wanted_boards'));
    usersPath = paths.map(path=>'/'+path);
} catch (err) {
    console.log('wanted_boards directory do not found. Create the wanted_boards directory in your home directory running the homedir script in the scripts directory or create it manually');
}

module.exports = {
    'usersPath':usersPath
};
