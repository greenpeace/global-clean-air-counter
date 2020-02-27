<template>
    <div v-if="this.$parent.cityData">
        <i18n path="pm25no2o3deaths" tag="h2" id="costtext" class="mb-2" v-if="no2 && o3">
            <template #city>
                <strong class="bg-warning">{{ $t('cities.' + cityData.cityID) }}</strong>
            </template>
            <template #costLine><br />
                <span class="bg-warning font-weight-bold">{{ totalDeaths(cityData).toLocaleString() }} {{ $t('life_cost')}}</span>
                <span class="bg-transparent"> {{ $t('and') }} </span>
                <span class="bg-warning font-weight-bold">US${{ totalCosts(cityData).toLocaleString() }}</span><br />
            </template>
            <template #showDate>
                <span>{{ $d(new Date(2020, 0, 1), 'long') }}</span>
            </template>
        </i18n>
        <i18n path="pm25no2deaths" tag="h2" id="costtext" class="mb-2" v-else-if="no2">
            <template #city>
                <strong class="bg-warning">{{ $t('cities.' + cityData.cityID) }}</strong>
            </template>
            <template #costLine><br />
                <span class="bg-warning font-weight-bold">{{ totalDeaths(cityData).toLocaleString() }} {{ $t('life_cost')}}</span>
                <span class="bg-transparent"> {{ $t('and') }} </span>
                <span class="bg-warning font-weight-bold">US${{ totalCosts(cityData).toLocaleString() }}</span><br />
            </template>
            <template #showDate>
                <span>{{ $d(new Date(2020, 0, 1), 'long') }}</span>
            </template>
        </i18n>
        <i18n path="pm25o3deaths" tag="h2" id="costtext" class="mb-2" v-else-if="o3">
            <template #city>
                <strong class="bg-warning">{{ $t('cities.' + cityData.cityID) }}</strong>
            </template>
            <template #costLine><br />
                <span class="bg-warning font-weight-bold">{{ totalDeaths(cityData).toLocaleString() }} {{ $t('life_cost')}}</span>
                <span class="bg-transparent"> {{ $t('and') }} </span>
                <span class="bg-warning font-weight-bold">US${{ totalCosts(cityData).toLocaleString() }}</span><br />
            </template>
            <template #showDate>
                <span>{{ $d(new Date(2020, 0, 1), 'long') }}</span>
            </template>
        </i18n>
        <i18n path="pm25deaths" tag="h2" id="costtext" class="mb-2" v-else>
            <template #city>
                <strong class="bg-warning">{{ $t('cities.' + cityData.cityID) }}</strong>
            </template>
            <template #costLine><br />
                <span class="bg-warning font-weight-bold">{{ totalDeaths(cityData).toLocaleString() }} {{ $t('life_cost')}}</span>
                <span class="bg-transparent"> {{ $t('and') }} </span>
                <span class="bg-warning font-weight-bold">US${{ totalCosts(cityData).toLocaleString() }}</span><br />
            </template>
            <template #showDate>
                <span>{{ $d(new Date(2020, 0, 1), 'long') }}</span>
            </template>
        </i18n>
        <i18n path="methodology" tag="span" id="methodology" style="font-size: x-small; font-weight: 100;">
            <template #addLink>
                <a href="https://energyandcleanair.org/revealing-the-cost-of-air-pollution-in-real-time/" target="_blank" id="methodlink">{{ $t('here') }}</a>
            </template>
        </i18n>
        <hr />
        <div class="mb-2">
            <strong>{{ $t('share') }}</strong><br />
            <a class="btn btn-warning m-2" id="twittersharebutton" href="" target="_blank" role="button">{{ $t('twitter') }}</a>
            <a class="btn btn-warning m-2" id="facebooksharebutton" href="" target="_blank" role="button">{{ $t('facebook') }}</a>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'ShowData',
    props: ['cityData'],
    data: function() {
        return {
            no2: false,
            o3: false
        }
    },
    methods: {
        totalDeaths: function(cityData) {
            // Get all data resulting in deaths
            var pm25Deaths = (cityData.estimations.ytd['PM2.5'].filter(x => x.Outcome === 'Deaths')).filter(y => y.Cause.indexOf('LRI') >= 0)
            var no2Deaths = cityData.estimations.ytd['NO2'].filter(x => x.Outcome === 'Deaths')
            var o3Deaths = cityData.estimations.ytd['O3_8h'].filter(x => x.Outcome === 'Deaths')
            var totalDeaths = 0

            no2Deaths[0].number_central ? this.no2 = true : this.no2 = false
            o3Deaths[0].number_central ? this.o3 = true : this.o3 = false

            // Add up deaths and check for existence of other causes of death
            for (var death in pm25Deaths) {
                totalDeaths += pm25Deaths[death].number_central
            }
            totalDeaths += (this.no2 ? no2Deaths[0].number_central : 0) + (this.o3 ? o3Deaths[0].number_central : 0)
            
            return Math.round(totalDeaths)
        },
        totalCosts: function(cityData) {
            var pm25costs = (cityData.estimations.ytd['PM2.5'].filter(x => x.Outcome === 'YLLs')).filter(y => y.Cause.indexOf('LRI') >= 0)
            pm25costs.push(cityData.estimations.ytd['PM2.5'].filter(x => x.Outcome === 'Absences')[0])
            pm25costs.push(cityData.estimations.ytd['PM2.5'].filter(x => x.Outcome === 'YLDs')[0])
            pm25costs.push(cityData.estimations.ytd['PM2.5'].filter(x => x.Outcome === 'PTB')[0])
            var no2Costs = cityData.estimations.ytd['NO2'].filter(x => x.Outcome === 'YLLs')
            var o3Costs = cityData.estimations.ytd['O3_8h'].filter(x => x.Outcome === 'YLLs')
            var totalCosts = 0

            console.log('pm25costs: ')
            console.log(pm25costs)
            console.log('no2Costs: ')
            console.log(no2Costs)
            console.log('o3Costs: ')
            console.log(o3Costs)
            
            //no2Costs[0].cost.USD_central ? this.no2 = true : this.no2 = false
            //o3Costs[0].cost.USD_central ? this.o3 = true : this.o3 = false

            for (var cost in pm25costs) {
                totalCosts += pm25costs[cost]['cost.USD_central']
            }
            totalCosts += (no2Costs[0]['cost.USD_central'] ? no2Costs[0]['cost.USD_central'] : 0) + (o3Costs[0]['cost.USD_central'] ? o3Costs[0]['cost.USD_central'] : 0)

            return Math.round(totalCosts)
        }
    },
    updated: function () {
        var shareText = document.getElementById('costtext').textContent;
        var shareHashtag = this.$t('hashtag');
        var twitterShare = 'https://twitter.com/intent/tweet?text=' + shareText + '&url=' + window.location.href + '&hashtags=' + shareHashtag;
        var facebookShare = 'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href;
        document.getElementById('twittersharebutton').href = twitterShare
        document.getElementById('facebooksharebutton').href = facebookShare
    }
}
</script>
