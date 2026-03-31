public with sharing class CaseDashboardController {

    @AuraEnabled(cacheable=true)
    public static Map<String,Integer> getCaseStats(){

        Map<String,Integer> stats = new Map<String,Integer>();

        stats.put('totalCases',[SELECT COUNT() FROM Case]);
        stats.put('openCases',[SELECT COUNT() FROM Case WHERE Status!='Closed']);
        stats.put('closedCases',[SELECT COUNT() FROM Case WHERE Status='Closed']);
        stats.put('highPriority',[SELECT COUNT() FROM Case WHERE Priority='High']);
        stats.put('mediumPriority',[SELECT COUNT() FROM Case WHERE Priority='Medium']);
        stats.put('lowPriority',[SELECT COUNT() FROM Case WHERE Priority='Low']);
        stats.put('casesThisMonth',[SELECT COUNT() FROM Case WHERE CreatedDate = THIS_MONTH]);

        return stats;
    }

    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> getCasesByOrigin(){

        return [
            SELECT Origin, COUNT(Id) total
            FROM Case
            GROUP BY Origin
        ];
    }
}