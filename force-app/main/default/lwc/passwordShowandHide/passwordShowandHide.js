import { LightningElement } from 'lwc';

export default class PasswordShowandHide extends LightningElement {

    password = '';
    inputType = 'password';
    eyeIcon = 'utility:preview';
    copied = false;

    handlePasswordChange(event) {
        this.password = event.target.value;
    }

    togglePassword() {
        this.inputType = this.inputType === 'password' ? 'text' : 'password';
        this.eyeIcon = this.inputType === 'password' ? 'utility:preview' : 'utility:hide';
    }

    copyPassword() {
         if (!this.password) {
            return;
        }
        navigator.clipboard.writeText(this.password);

        this.copied = true;

        setTimeout(() => {
            this.copied = false;
        }, 2000);
    }
}