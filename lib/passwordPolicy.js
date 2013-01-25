(function () {
    function PasswordPolicy(options) {
        this.options = options = options || {};
        this.policies = [];
    }
    if (typeof exports === 'undefined') {
        this.PasswordPolicy = PasswordPolicy;
    } else {
        module.exports = PasswordPolicy;
    }
    PasswordPolicy.prototype.policy = function () {
        this.policies.push({
            name: arguments[0],
            policy: Array.prototype.slice.call(arguments, 1)
        });
    };

    function process() {
        var f = arguments;
        return function (initialContext) {
            var ctx = initialContext || {},
                i = 0,
                walk = function () {
                    return f[i++] ||
                    function () {
                        // end
                    };
                },
                getNext = function () {
                    return function () {
                        walk()(ctx, getNext());
                    };
                };
            getNext()();
        };
    }
    PasswordPolicy.prototype.test = function (password) {
        var i = this.policies.length,
            ret = [],
            curr, args, ctx;
        while (i--) {
            ctx = {
                password: password
            };
            curr = this.policies[i];
            process.apply(this, curr.policy)(ctx);
            ctx.name = curr.name;
            ret.push(ctx);
        }
        return ret;
    };
})();
