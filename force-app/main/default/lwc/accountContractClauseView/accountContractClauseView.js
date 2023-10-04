import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import { CloseActionScreenEvent } from 'lightning/actions';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import BILLINGCOUNTRY_FIELD from "@salesforce/schema/Account.BillingCountry";
import getAccountContractClauses from '@salesforce/apex/AccountContractController.getAccountContractClauses';
import createAccountContract from '@salesforce/apex/AccountContractController.createAccountContract';
const FIELDS = [BILLINGCOUNTRY_FIELD];
export default class AccountContractClauseView extends LightningElement {
    @api recordId;
    contractClauses;
    clauseId;
    billingCountry;
    isLoading = false; 
    showProceedButton = true;
    recordPageUrl;
    columns = [
        { label: 'Name', fieldName: 'Name', type: 'text' },
        { label: 'Country', fieldName: 'Country', type: 'text' }
    ];
    

// This method will load the data for the requested field
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    loadFields({ error, data }) {
        this.isLoading = true;
        if (error) {
            this.isLoading = false;
        } else if (data) {
            this.isLoading = false;
            this.billingCountry = getFieldValue(data, BILLINGCOUNTRY_FIELD); 
            this.fetchAccountContractClauses();
        }
    }
// This method will get the Account Contract Clause based on Account's billing country
    fetchAccountContractClauses() {
        this.isLoading = true;
        getAccountContractClauses({ accountId: this.recordId, billingCountry: this.billingCountry })
            .then(data => {
                if (data) {
                    this.isLoading = false;
                    this.contractClauses = data.map(item => ({
                        Id: item.Id, // Add 'Id' field for key-field property of datatable
                        Name: item.Name,
                        Country: this.billingCountry // Set the country for each record
                    }));
                    
                }
            })
            .catch(error => {
                this.isLoading = false;
                this.showToast('Error', 'Some error occurred', 'error');
                console.error(error);
            });
    }

    closeModal() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }

    handleProceed() {
        this.isLoading = true;
        // Proceed logic - handle creating new Account Contract and linking Contract Clauses
        createAccountContract({ accountId: this.recordId, contractClauses: this.contractClauses })
            .then(result => {
                if(result!=null){
                this.isLoading = false;
                this.showProceedButton = false;
                this.recordPageUrl = `/${result}`;
                this.showToast('Success', 'Account Contract Clauses linked successfully', 'success');
                }
                else{
                    this.isLoading = false;
                    this.showToast('Error', 'Some error occurred', 'error');
                }
            })
            .catch(error => {
                this.isLoading = false;
                this.showToast('Error', 'Some error occurred', 'error');
                console.error('Error creating Account Contract:', error);
            });
    }

    handleNavigation() {
         // Navigate to the newly created Account Contract record
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                url: this.recordPageUrl
            }
        });
    }

    
    showToast(title, message, variant) {
        // Display a toast message
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }
}