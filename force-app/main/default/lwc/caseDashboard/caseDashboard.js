import { LightningElement,wire } from 'lwc';
import getCaseStats from '@salesforce/apex/CaseDashboardController.getCaseStats';
import getCasesByOrigin from '@salesforce/apex/CaseDashboardController.getCasesByOrigin';
export default class CaseDashboard extends LightningElement {

    stats = {};
    data = [];

    columns = [
        { label: 'Origin', fieldName: 'Origin' },
        { label: 'Total Cases', fieldName: 'total' }
        
    ];

    @wire(getCaseStats)
    wiredStats({data,error}){
        if(data){
            this.stats = data;
        }
    }

    @wire(getCasesByOrigin)
    wiredOrigin({data,error}){
        if(data){
            this.data = data.map(row => ({
                Origin: row.Origin,
                total: row.total
            }));
        }
    }
}
