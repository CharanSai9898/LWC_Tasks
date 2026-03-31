import { LightningElement } from 'lwc';

export default class FaqAccordion extends LightningElement {

    isSingleOpen = false;

    faqs = [
        {
            id: 1,
            question: 'What is a Trigger in Salesforce?',
            answer: 'A trigger in Salesforce is a piece of code that executes automatically when a specific event occurs on a record, such as before or after an insert, update, or delete operation. Triggers are used to perform custom business logic and maintain data integrity.',
            open: false,
            iconName: 'utility:add'
        },
        {
            id: 2,
            question: 'What is SOQL?',
            answer: 'SOQL (Salesforce Object Query Language) is a query language used to retrieve data from Salesforce objects. It is similar to SQL but is specifically designed for the Salesforce platform and provides a simple way to query and filter data.',
            open: false,
            iconName: 'utility:add'
        },
        {
            id: 3,
            question: 'What is a Governor Limit?',
            answer: 'Governor limits in Salesforce are constraints that control the amount of resources a single transaction can use. These limits ensure fair resource allocation and prevent any single operation from consuming excessive system resources.',
            open: false,
            iconName: 'utility:add'
        }
    ];
    

    handleToggle(event) {
        this.isSingleOpen = event.target.checked;
        this.faqs = this.faqs.map(faq => ({ ...faq, open: false,iconName: 'utility:add'}));
    }

    handleClick(event) {
        const clickedId = parseInt(event.currentTarget.dataset.id);

        this.faqs = this.faqs.map(faq => {

            // SINGLE OPEN MODE
            if (this.isSingleOpen) {
                if (faq.id === clickedId) {
                    const isOpen = !faq.open;
                    return {
                        ...faq,
                        open: isOpen,
                        iconName: isOpen ? 'utility:dash' : 'utility:add'
                    };
                }
                return {
                    ...faq,
                    open: false,
                    iconName: 'utility:add'
                };
            }

            // MULTIPLE OPEN MODE
            if (faq.id === clickedId) {
                const isOpen = !faq.open;
                return {
                    ...faq,
                    open: isOpen,
                    iconName: isOpen ? 'utility:dash' : 'utility:add'
                };
            }

            return faq;
        });
    }
}