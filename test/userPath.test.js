const {strictEqual} = require('assert');
const {usersPath} = require('../app/userPath');

describe('usersPath object', function() {
    it('should return the names of the wanted_boards directory', function(){
        strictEqual(usersPath.toString, ['root'].toString);
    });
});
