import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getCaseStats from '@salesforce/apex/CaseDashboardController.getCaseStats';
import getCasesByOrigin from '@salesforce/apex/CaseDashboardController.getCasesByOrigin';

export default class CaseDashboard extends NavigationMixin(LightningElement) {

    stats = {};
    data = [];

    columns = [
        { label: 'Origin', fieldName: 'Origin' },
        { label: 'Total Cases', fieldName: 'total' }
    ];

    @wire(getCaseStats)
    wiredStats({ data }) {
        if (data) {
            this.stats = data;
        }
    }

    @wire(getCasesByOrigin)
    wiredOrigin({ data }) {
        if (data) {
            this.data = data.map(row => ({
                Origin: row.Origin,
                total: row.total
            }));
        }
    }

    handleCardClick(event) {
    const filterName = event.currentTarget.dataset.filter;

    const pageRef = {
        type: 'standard__objectPage',
        attributes: {
            objectApiName: 'Case',
            actionName: 'list'
        },
        state: {
            filterName: filterName
        }
    };

    // Generate URL and open in new tab
    this[NavigationMixin.GenerateUrl](pageRef).then(url => {
        window.open(url, '_blank');
    });
}
}