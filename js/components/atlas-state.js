define(['knockout', 'lscache', 'services/job/jobDetail', 'assets/ohdsi.util'], function (ko, cache, jobDetail, ohdsiUtil) {
	var state = {};
	state.resultsUrl = ko.observable();
	state.vocabularyUrl = ko.observable();
	state.evidenceUrl = ko.observable();
	state.jobListing = ko.observableArray();
	state.priorityScope = ko.observable('session');
	state.roles = ko.observableArray();
	state.sources = ko.observableArray([]);

	// Extending the jobListing array to include a 'queue' 
	// function that will check if an existing job is 
	// already present in the list and replace it.
	state.jobListing.queue = function(newItem) {
		var oldItem = state.jobListing().find(j => j.executionUniqueId() == newItem.executionUniqueId());
		if (oldItem != null) {
			state.jobListing.replace(oldItem, newItem);
		} else {
			state.jobListing.push(newItem);
		}
	}

	// job listing notification management
	var jobListingCacheKey = "atlas:jobListing";
	var jobListingCache = cache.get(jobListingCacheKey);
	if (jobListingCache) {
		jobListingCache.forEach(j => {
			state.jobListing.push(new jobDetail(j));
		})
	}

	state.jobListing.subscribe(function (data) {
		cache.set(jobListingCacheKey, ko.toJSON(data));
	});

	// shared concept selection state
	state.selectedConceptsIndex = {};
	state.selectedConcepts = ko.observableArray(null);
	state.appInitializationStatus = ko.observable('initializing');

	state.clearSelectedConcepts = function () {
		this.selectedConceptsIndex = {};
		this.selectedConcepts([]);
	}
	
	state.IRAnalysis = {
		current: ko.observable(null),
		selectedId: ko.observable(null)
	}
	state.IRAnalysis.dirtyFlag = ko.observable(new ohdsiUtil.dirtyFlag(state.IRAnalysis.current()));

	// Pathways State
	state.CohortPathways = {
		current: ko.observable(null),
		selectedId: ko.observable(null)
	};	
	state.CohortPathways.dirtyFlag = ko.observable(new ohdsiUtil.dirtyFlag(state.CohortPathways.current()));
	
	
	state.estimationAnalysis = {
		current: ko.observable(null),
		selectedId: ko.observable(null),
		comparisons: ko.observableArray(),
	}
	state.estimationAnalysis.dirtyFlag = ko.observable(new ohdsiUtil.dirtyFlag(state.estimationAnalysis.current()));

	state.predictionAnalysis = {
		current: ko.observable(null),
		selectedId: ko.observable(null),
		targetCohorts: ko.observableArray(),
		outcomeCohorts: ko.observableArray(), 
	}
	state.predictionAnalysis.dirtyFlag = ko.observable(new ohdsiUtil.dirtyFlag(state.predictionAnalysis.current()));

	return state;
});