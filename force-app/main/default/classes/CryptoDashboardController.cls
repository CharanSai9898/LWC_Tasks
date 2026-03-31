public with sharing class CryptoDashboardController {

    public class CoinData {
        @AuraEnabled public String name;
        @AuraEnabled public String symbol;
        @AuraEnabled public Decimal price;
        @AuraEnabled public Decimal change;
        @AuraEnabled public Decimal marketCap;

    }

    public class PricePoint {
        @AuraEnabled public Long timestamp;
        @AuraEnabled public Decimal price;
    }

    public class CryptoDataResponse {
        @AuraEnabled public List<CoinData> coins;
        @AuraEnabled public List<PricePoint> btcPrices;
        @AuraEnabled public List<PricePoint> ethPrices;
    }

    @AuraEnabled(cacheable=true)
    public static CryptoDataResponse getCryptoData() {

        CryptoDataResponse response = new CryptoDataResponse();
        response.coins = new List<CoinData>();

        try {
            Http http = new Http();

            // 🔹 Top 5 Coins
            HttpRequest req = new HttpRequest();
            req.setEndpoint('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=5&page=1');
            req.setMethod('GET');

            HttpResponse res = http.send(req);
            List<Object> result = (List<Object>) JSON.deserializeUntyped(res.getBody());

            for (Object obj : result) {
                Map<String, Object> coin = (Map<String, Object>) obj;

                CoinData c = new CoinData();
                c.name = (String) coin.get('name');
                c.symbol = (String) coin.get('symbol');
                c.price = (Decimal) coin.get('current_price');
                c.change = (Decimal) coin.get('price_change_percentage_24h');
                c.marketCap = (Decimal) coin.get('market_cap');
            

                response.coins.add(c);
            }

            response.btcPrices = fetchChartData('bitcoin');
            response.ethPrices = fetchChartData('ethereum');

        } catch (Exception e) {
            System.debug(e.getMessage());
        }

        return response;
    }

    private static List<PricePoint> fetchChartData(String coin) {

        List<PricePoint> listData = new List<PricePoint>();

        Http http = new Http();
        HttpRequest req = new HttpRequest();

        req.setEndpoint('https://api.coingecko.com/api/v3/coins/' + coin + '/market_chart?vs_currency=inr&days=7');
        req.setMethod('GET');

        HttpResponse res = http.send(req);

        Map<String, Object> json = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
        List<Object> prices = (List<Object>) json.get('prices');

        for (Object obj : prices) {
            List<Object> point = (List<Object>) obj;

            PricePoint p = new PricePoint();
            p.timestamp = (Long) point[0];
            p.price = (Decimal) point[1];

            listData.add(p);
        }

        return listData;
    }
}