define([
    'knockout',
    'pages/characterizations/services/CharacterizationService',
    'pages/characterizations/services/PermissionService',
    'text!./characterizations-list.html',
    'appConfig',
    'webapi/AuthAPI',
    'providers/Component',
    'utils/CommonUtils',
    'utils/DatatableUtils',
    'pages/characterizations/const',
    '../tabbed-grid',
    'less!./characterizations-list.less',
    'components/ac-access-denied',
], function (
    ko,
    CharacterizationService,
    PermissionService,
    view,
    config,
    authApi,
    Component,
    commonUtils,
    datatableUtils,
    constants,
) {
    class Characterizations extends Component {
        constructor(params) {
            super();

            this.gridTab = constants.characterizationsTab;

            this.loading = ko.observable(false);
            // this.data = ko.observableArray();

            this.isGetCCListPermitted = PermissionService.isPermittedGetCCList;
            this.isCreatePermitted = PermissionService.isPermittedCreateCC;

            this.gridColumns = [
                {
                    title: 'Name',
                    data: 'name',
                    className: this.classes('tbl-col', 'name'),
                    render: datatableUtils.getLinkFormatter(d => ({
                        link: '#/cc/characterizations/' + d.id,
                        label: d['name']
                    })),
                },
                {
                    title: 'Created',
                    data: 'createdDate',
                    className: this.classes('tbl-col', 'created'),
                    type: 'date',
                    render: datatableUtils.getDateFieldFormatter(),
                },
                {
                    title: 'Updated',
	                data: 'modifiedDate',
	                className: this.classes('tbl-col', 'updated'),
                    type: 'date',
                    render: datatableUtils.getDateFieldFormatter(),
                },
                {
                    title: 'Author',
                    data: 'createdBy',
                    className: this.classes('tbl-col', 'author'),
                    render: (s, p, d) => (d.createdBy !== null ? d.createdBy.login : 'anonymous'),
                },

            ];
            this.gridOptions = {
                entityName: 'cohort_characterization',
                Facets: [
                    {
                        'caption': 'Created',
                    },
                    {
                        'caption': 'Updated',
                    },
                    {
                        'caption': 'Author',
                    },
                ]
            };

            if (this.isGetCCListPermitted()) {
                this.ajax = CharacterizationService.loadCharacterizationList
            }
        }

        createCharacterization() {
            commonUtils.routeTo('/cc/characterizations/0');
        }
    }

    return commonUtils.build('characterizations-list', Characterizations, view);
});