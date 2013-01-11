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
    PasswordPolicy.prototype.policy = function (name, policy) {
        this.policies.push({
            name: name,
            policy: policy
        });
    };
    PasswordPolicy.prototype.test = function (password) {
        var i = this.policies.length,
            ret = [],
            curr;
        while (i--) {
            curr = this.policies[i];
            ret.push({
                name: curr.name,
                isValid: curr.policy(password)
            });
        }
        return ret;
    };
})();
