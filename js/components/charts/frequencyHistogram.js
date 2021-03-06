define([
	'components/Chart',
	'atlascharts',
	'text!components/charts/chart.html',
	'utils/CommonUtils'
], function (
	Chart,
	atlascharts,
	view,
	commonUtils
) {
	
	class FrequencyHistogramComponent extends Chart {
		constructor(params) {
			super(params);
			this.renderer = new atlascharts.histogram();
		}

	}

	return commonUtils.build('frequency-histogram', FrequencyHistogramComponent, view);
});
