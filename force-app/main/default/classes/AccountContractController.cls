public with sharing class AccountContractController {
    @AuraEnabled(cacheable=true)
    public static List<Account_Contract_Clause__c> getAccountContractClauses(String accountId, String billingCountry) {
        // Query Account Contract Clause records based on Account Id of Account Contract and Billing Country
        return [SELECT id, Name,Country__c FROM Account_Contract_Clause__c WHERE 
                Account_Contract__r.Account__c = :accountId AND Country__c = :billingCountry order by Name];
    }

    @AuraEnabled
    public static Id createAccountContract(String accountId, List<Account_Contract_Clause__c> contractClauses) {
        Account_Contract__c newContract = new Account_Contract__c();
       try{
       // Create a new Account Contract
        newContract.Account__c = accountId; // Link the new contract to the Account
        Database.insert(newContract,false);

        // Save contractClauses as a file linked to the new Account Contract record
        String clausesText = String.join(contractClauses, '\n');
        Blob clausesBlob = Blob.valueOf(clausesText);
        
        ContentVersion content = new ContentVersion();
        content.Title = 'AccountContractClauses.txt';
        content.PathOnClient = 'AccountContractClauses.txt';
        content.VersionData = clausesBlob;
        content.FirstPublishLocationId = newContract.Id;
        Database.insert(content,false);
        }
        catch(Exception ex){
            System.debug('Exception occured :'+ex.getMessage());
        }
        
        return newContract.Id <> null ? newContract.Id : null;
    }
}