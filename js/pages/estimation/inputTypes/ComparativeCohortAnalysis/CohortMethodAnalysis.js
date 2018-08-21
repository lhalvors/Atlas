define(function (require, exports) {

    var ko = require('knockout');
    var GetDbCohortMethodDataArgs = require('./GetDbCohortMethodDataArgs');
    var CreateStudyPopulationArgs = require('./CreateStudyPopulationArgs');
    var CreatePsArgs = require('./CreatePsArgs');
    var TrimByPsArgs = require('./TrimByPsArgs');
    var TrimByPsToEquipoiseArgs = require('./TrimByPsToEquipoiseArgs');
    var MatchOnPsArgs = require('./MatchOnPsArgs');
    var MatchOnPsAndCovariatesArgs = require('./MatchOnPsAndCovariateArgs');
    var StratifyByPsArgs = require('./StratifyByPsArgs');
    var StratifyByPsAndCovariatesArgs = require('./StratifyByPsAndCovariatesArgs');
    var FitOutcomeModelArgs = require('./FitOutcomeModelArgs');

	function CohortMethodAnalysis(data) {
		var self = this;
        data = data || {};
        
        self.analysisId = ko.observable(data.analysisId || null);
        self.description = ko.observable(data.description || null);
        self.targetType = ko.observable(data.targetType || null);
        self.comparatorType = ko.observable(data.comparatorType || null);
        self.getDbCohortMethodDataArgs = ko.observable(new GetDbCohortMethodDataArgs(data.getDbCohortMethodDataArgs));
        self.createStudyPopulationArgs = ko.observable(new CreateStudyPopulationArgs(data.createStudyPopulationArgs));
        self.createPs = ko.observable(data.createPs || false);
        self.createPsArgs = ko.observable(new CreatePsArgs(data.createPsArgs));
        self.trimByPs = ko.observable(data.trimByPs || false);
        self.trimByPsArgs = ko.observable(new TrimByPsArgs(data.trimByPsArgs));
        self.trimByPsToEquipoise = ko.observable(data.trimByPsToEquipoise || false);
        self.trimByPsToEquipoiseArgs = ko.observable(new TrimByPsToEquipoiseArgs(data.trimByPsToEquipoiseArgs));
        self.matchOnPs = ko.observable(data.matchOnPs || false);
        self.matchOnPsArgs = ko.observable(new MatchOnPsArgs(data.matchOnPsArgs));
        self.matchOnPsAndCovariates = ko.observable(data.matchOnPsAndCovariates || false);
        self.matchOnPsAndCovariatesArgs = ko.observable(new MatchOnPsAndCovariatesArgs(data.matchOnPsAndCovariatesArgs));
        self.stratifyByPs = ko.observable(data.stratifyByPs || false);
        self.stratifyByPsArgs = ko.observable(new StratifyByPsArgs(data.stratifyByPsArgs));
        self.stratifyByPsAndCovariates = ko.observable(data.stratifyByPsAndCovariates || false);
        self.stratifyByPsAndCovariatesArgs = ko.observable(new StratifyByPsAndCovariatesArgs(data.stratifyByPsAndCovariatesArgs));
        self.computeCovariateBalance = ko.observable(data.computeCovariateBalance || false);
        self.fitOutcomeModel = ko.observable(data.fitOutcomeModel || false);
        self.FitOutcomeModelArgs = ko.observable(new FitOutcomeModelArgs(data.fitOutcomeModelArgs));
        self.attr_class = data.attr_class || "cmAnalysis";
	}
	
	return CohortMethodAnalysis;
});