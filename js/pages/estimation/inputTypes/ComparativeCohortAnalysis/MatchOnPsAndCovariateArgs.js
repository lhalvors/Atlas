define(function (require, exports) {

    var ko = require('knockout');

	function MatchOnPsAndCovariateArgs(data) {
		var self = this;
        data = data || {};

        self.caliper = ko.observable(data.caliper || 0.2);
        self.caliperScale = ko.observable(data.caliperScale || "standardized logit");
        self.maxRatio = ko.observable(data.maxRatio || 1);
        self.covariateIds = (data.covariateIds && Array.isArray(data.covariateIds)) ? data.covariateIds : [];
        self.attr_class = data.attr_class || "args";
	}
	
	return MatchOnPsAndCovariateArgs;
});