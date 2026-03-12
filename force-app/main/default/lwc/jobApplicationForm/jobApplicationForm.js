import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class JobApplicationForm extends LightningElement {

    handleSubmit(event) {

        event.preventDefault();

        const inputs = this.template.querySelectorAll(
            'lightning-input, lightning-textarea'
        );

        let isValid = true;

        inputs.forEach(field => {

            if (field.name === 'phone') {

                const phoneRegex = /^[1-9][0-9]{9}$/;

                field.setCustomValidity(phoneRegex.test(field.value) ? '' : 'Enter a 10-digit phone number');
            }

            if (!field.checkValidity()) {
                field.reportValidity();
                isValid = false;
            }

        });

        if (isValid) {

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Application submitted successfully',
                    variant: 'success'
                })
            );

            this.template.querySelector('form').reset();
        }
    }
}