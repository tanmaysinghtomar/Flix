@isTest
public class AccountContractControllerTest {

    @isTest
    static void testGetAccountContractClauses() {
        // Create test Account and Account Contract records
        Account testAccount = new Account(Name = 'Test Account', BillingCountry = 'US');
        insert testAccount;
        
        Account_Contract__c testContract = new Account_Contract__c(Account__c = testAccount.Id);
        insert testContract;
        
        // Create test Account Contract Clauses
        List<Account_Contract_Clause__c> testClauses = new List<Account_Contract_Clause__c>{
            new Account_Contract_Clause__c(Country__c = 'India', Account_Contract__c = testContract.Id),
            new Account_Contract_Clause__c(Country__c = 'Netherlands', Account_Contract__c = testContract.Id),
            new Account_Contract_Clause__c(Country__c = 'Germany', Account_Contract__c = testContract.Id)
        };
        insert testClauses;

        // Call the controller method
        List<Account_Contract_Clause__c> resultClauses = AccountContractController.getAccountContractClauses(testAccount.Id, 'US');
        
    }

    @isTest
    static void testCreateAccountContract() {
        // Create test Account
        Account testAccount = new Account(Name = 'Test Account', BillingCountry = 'US');
        insert testAccount;

        // Call the controller method to create an Account Contract
        Account_Contract__c createdContract = new Account_Contract__c(Account__c = testAccount.Id);
        Test.startTest();
        Id newContractId = AccountContractController.createAccountContract(testAccount.Id, new List<Account_Contract_Clause__c>());
        Test.stopTest();
    }
    
    @isTest
    static void testException(){
        try{
            AccountContractController.createAccountContract(null,null);
        }
        catch(Exception ex){}
    }
}