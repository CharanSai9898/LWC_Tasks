import { LightningElement, track } from 'lwc';
import getCryptoData from '@salesforce/apex/CryptoDashboardController.getCryptoData';
import chartjs from '@salesforce/resourceUrl/Chartjs';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import bitcoinIcon from '@salesforce/resourceUrl/Bitcoin';

export default class CryptoDashboard extends LightningElement {

    @track coins = [];
    isLoading = true;
    chartLoaded = false;

    lineChart;
    barChart;
    iconUrl = bitcoinIcon;

    renderedCallback() {
        if (this.chartLoaded) return;

        this.chartLoaded = true;

        loadScript(this, chartjs)
            .then(() => {
                this.loadData();
            })
            .catch(error => this.showError(error));
    }

    loadData() {
        this.isLoading = true;

        getCryptoData()
           .then(data => {

                this.coins = data.coins.map(c => ({
                    ...c,
                    formattedPrice: new Intl.NumberFormat('en-IN', {
                        style: 'currency',
                        currency: 'INR',
                        maximumFractionDigits: 0
                    }).format(c.price),

                    changeClass: c.change && c.change > 0 ? 'green' : 'red'
                }));

                // ⏳ wait for DOM
                setTimeout(() => {
                    this.renderCharts(data);
                }, 0);

                this.isLoading = false;
            })
            .catch(error => {
                this.showError(error);
                this.isLoading = false;
            });
    }

    renderCharts(data) {

        const lineCanvas = this.template.querySelector('.lineChart');
        const barCanvas = this.template.querySelector('.barChart');

        if (!lineCanvas || !barCanvas) {
            return;
        }

        //  destroy old charts
        if (this.lineChart) {
            this.lineChart.destroy();
        }
        if (this.barChart) {
            this.barChart.destroy();
        }

        const btc = data.btcPrices.map(p => p.price);
        const eth = data.ethPrices.map(p => p.price);

        const labels = data.btcPrices.map(p =>
            new Date(p.timestamp).toLocaleDateString()
        );

        // Line Chart
        this.lineChart = new Chart(lineCanvas, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    { label: 'Bitcoin', data: btc },
                    { label: 'Ethereum', data: eth }
                ]
            }
        });

        // Bar Chart
        this.barChart = new Chart(barCanvas, {
            type: 'bar',
            data: {
                labels: this.coins.map(c => c.name),
                datasets: [{
                    label: 'Market Cap',
                    data: this.coins.map(c => c.marketCap)
                }]
            }
        });
    }

    handleRefresh() {
        this.loadData();
    }

    showError(error) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: error.body?.message || error.message,
                variant: 'error'
            })
        );
    }
}