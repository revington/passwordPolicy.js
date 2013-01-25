var assert = require('assert'),
    pa = require('..');
describe('passwordPolicy.js', function () {
    it('should be able to validate a password against more than policy', function () {
        var t = new pa(),
            report;
        t.policy('a password should be longer than 5', function (ctx) {
            return ctx.length > 5;
        });
        t.policy('a password can not be qwerty', function (ctx) {
            return ctx.password === 'qwerty';
        });
        report = t.test('qwerty');
        assert.equal(report.length, 2);
        assert(!report[0].isValid);
        assert(!report[1].isValid);
    });
    describe('context augmentation', function () {
        it('should be able to augmentate context using middleware', function () {
            var t = new pa(),
                one = function (ctx, next) {
                    ctx.one = 1;
                    next();
                },
                two = function (ctx, next) {
                    ctx.two = 2;
                    next();
                },
                report;
            t.policy('some', one, two);
            report = t.test('a');
            assert.equal(report[0].one, 1);
            assert.equal(report[0].two, 2);
        });
    });
});
