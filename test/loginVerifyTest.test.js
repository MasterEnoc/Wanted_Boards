const {strictEqual} = require('assert');
const {verifyLogin} = require('../app/routes/loginVerify.js');

describe('Verify the user with verifyLogin function', function(){
    it('should return the name of the directories in wanted_board directory', function(done){
	verifyLogin(function(files) {
	    strictEqual(files.toString(),['root'].toString());
	    done();
	});
    });
});
