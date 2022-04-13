<template>
    <div v-if="this.$parent.cityData">
        <i18n path="pm25deaths" tag="h2" id="livestext" class="mb-2">
            <template #city>
                <strong class="bg-warning">{{ $t('cities.' + cityData.cityID) }}</strong>
            </template>
            <template #lostLives>
                <span class="bg-warning font-weight-bold">{{ totalDeaths(cityData).toLocaleString() }}</span>
            </template>
            <template #showDate>
                <span>{{ $d(new Date(2021, 0, 1), 'long') }}</span>
            </template>
        </i18n>
        <i18n path="costs" tag="h3" id="costtext" class="mb-2">
            <template #cost>
                <strong class="bg-warning">US${{ totalCosts(cityData).toLocaleString() }}</strong>
            </template>
        </i18n>
        <i18n v-if="this.$i18n.locale=='th'" path="methodology" tag="span" id="methodology" style="font-size: x-small; font-weight: 100;">
            <template #addLink>
                <a href="https://act.gp/3c4vK0p" target="_blank" id="methodlink">{{ $t('here') }}</a>
            </template>
        </i18n>
        <i18n v-else path="methodology" tag="span" id="methodology" style="font-size: x-small; font-weight: 100;">
            <template #addLink>
                <a href="https://www.greenpeace.org/static/planet4-southeastasia-stateless/2021/02/ef76f49b-methodology_-revealing-the-cost-of-air-pollution-in-world-cities-annual-results-for-2020.pdf" target="_blank" id="methodlink">{{ $t('here') }}</a>
            </template>
        </i18n>
        <hr />
        <div class="mb-2">
            <strong>{{ $t('share') }}</strong><br />
            <a class="btn btn-warning m-2" id="twittersharebutton" style="color:#212529;background-color:#ffc107;border-color:#ffc107;border-radius:0.25rem;" onMouseOver="this.style.color='#212529 !important;'" onMouseOut="this.style.color='color:#212529;'" href="" target="_blank" role="button">{{ $t('twitter') }}</a>
            <a class="btn btn-warning m-2" id="facebooksharebutton" style="color:#212529;background-color:#ffc107;border-color:#ffc107;border-radius:0.25rem;" onMouseOver="this.style.color='#212529 !important;'" onMouseOut="this.style.color='color:#212529;'" href="" target="_blank" role="button">{{ $t('facebook') }}</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShowData',
    props: ['cityData'],
    data: function() {
        return {
            no2: false
        }
    },
    methods: {
        totalDeaths: function(cityData) {
            // Get all data resulting in deaths
            var pm25Deaths = (cityData.estimations.ytd['PM2.5'].filter(x => x.Outcome === 'Deaths')).filter(y => y.Cause.indexOf('LRI') >= 0)
            // Exclude NO2 data
            // var no2Deaths = cityData.estimations.ytd['NO2'].filter(x => x.Outcome === 'Deaths')
            var totalDeaths = 0

            // Exclude NO2 data
            this.no2 = false
            // no2Deaths[0].number_central ? this.no2 = true : this.no2 = false

            // Add up deaths and check for existence of other causes of death
            for (var death in pm25Deaths) {
                totalDeaths += pm25Deaths[death].number_central
            }
            // Exclude NO2 deaths
            // totalDeaths += (this.no2 ? no2Deaths[0].number_central : 0)
            
            return parseFloat(totalDeaths.toPrecision(2))
        },
        totalCosts: function(cityData) {
            // Get all data resulting in costs
            var pm25costs = (cityData.estimations.ytd['PM2.5'].filter(x => x.Outcome === 'YLLs')).filter(y => y.Cause.indexOf('LRI') >= 0)
            pm25costs.push(cityData.estimations.ytd['PM2.5'].filter(x => x.Outcome === 'Absences')[0])
            pm25costs.push(cityData.estimations.ytd['PM2.5'].filter(x => x.Outcome === 'PTB')[0])
            var no2Costs = cityData.estimations.ytd['NO2'].filter(x => x.Outcome === 'YLLs')
            var totalCosts = 0
            
            // Update flags if cost data overrides deaths, other keep same
            no2Costs[0]['cost.USD_central'] ? this.no2 = true : this.no2 = this.no2

            // Add up costs and check for existence of other costs
            for (var cost in pm25costs) {
                totalCosts += pm25costs[cost]['cost.USD_central']
            }

            // Exclude NO2 costs
            // totalCosts += (no2Costs[0]['cost.USD_central'] ? no2Costs[0]['cost.USD_central'] : 0)

            return parseFloat(totalCosts.toPrecision(2))
        }
    },
    updated: function () {
        if (this.$parent.cityData !== null) {
            var shareText = document.getElementById('livestext').textContent;
            var shareHashtag = ''
            if (this.$t('hashtag') === 'CleanAirNow') {
                shareHashtag = 'CleanAirNow'
            }
            else {
                shareHashtag = this.$t('hashtag') + ',CleanAirNow'
            }
            var twitterShare = 'https://twitter.com/intent/tweet?text=' + shareText + '&url=' + window.location.href + '&hashtags=' + shareHashtag;
            var facebookShare = 'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href;
            document.getElementById('twittersharebutton').href = twitterShare
            document.getElementById('facebooksharebutton').href = facebookShare
        }
    }
}
</script>