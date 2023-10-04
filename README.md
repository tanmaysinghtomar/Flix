# Account Contract Clause View Lightning Web Component

The Account Contract Clause View Lightning Web Component displays a list of contract clauses related to an Account based on the Account's billing country. It allows users to link these contract clauses to a new Account Contract and provides a way to navigate to the newly created Account Contract record.

## Functionality

- Fetches contract clauses based on the billing country of the associated Account.
- Displays the fetched contract clauses in a Lightning datatable.
- Allows users to link the displayed contract clauses to a new Account Contract.
- Provides a "Proceed" button to initiate the linking process.
- After successful linking, allows users to navigate to the newly created Account Contract record.

## Usage

1. **Setup:**
   - Ensure that the quick action is added to the page layout of Account.

2. **Viewing Contract Clauses:**
   - When the component is loaded, it fetches contract clauses associated with the billing country of the Account record.

3. **Linking Contract Clauses:**
   - Review the list of fetched contract clauses.
   - Click on the "Proceed" button to create a new Account Contract and link the selected contract clauses.

4. **Viewing the New Account Contract:**
   - After successful linking, a link to the newly created Account Contract record is displayed.
   - Click on the link to navigate to the newly created Account Contract record.


## Development and Customization

To further customize or enhance the functionality of this component, you can modify the `accountContractClauseView.js` file.
## Instructions for Swapping Permissions between Permission Sets :
1. Retrieve both the Permission Set in VS Code
2. we can swap Object, Tab & field Permission etc in the meta file & deploy it again

## Deployment

Deploy all the component to your Salesforce environment using Salesforce DX or the Salesforce Developer Console. Ensure the component is added to the appropriate record page layout to make it accessible to users.

## Post Deployment ->

Test Records
- Please unzip the package, three csv files will be there, one for Account, one for Account Contract ,one for Account Contract Clause.
- Click insert -> it will prompt for username & Password
- Navigate to data loader application, login with your id & password(appending the security token with your password), once this is successfull, it will ask you to choose the object
- Choose the Account object, and choose the related csv from your system.
- Now map your columns against your csv sheet
- Once done, hit next, choose your result directory and we are done
- Records will be created in your logged in environment

- Once you have success file of Account use the AccountId to update in the Account Contract csv

- Follow the above steps and load the file to the data loader

- Once we have the success file of Account Contract, copy the Id's and map it with Account_Contract__c column on 3rd file of Account Contract Clause.
- Upload the csv in the data loader by choosing the Account Contract Clause object from the list, and repeat the above steps again.
- Data setup is done, and now we can test the functionality