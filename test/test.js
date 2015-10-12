var app = require('../app'),
	assert = require('assert'),
	supertest = require('supertest');

describe('basic tests', function() {
	var lastUser;
	it('should get a collection of users', function (done) {
		request(app)
			.get('/users')
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				var result = res.body;
				assert.equals(result.success, true);
				done();
			});
	});
});
