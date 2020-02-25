<template>
    <div v-if="this.$parent.cityData">
        <i18n path="pm25no2o3deaths" tag="h2" id="costtext" v-if="no2 && o3">
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
        <i18n path="pm25no2deaths" tag="h2" id="costtext" v-else-if="no2">
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
        <i18n path="pm25o3deaths" tag="h2" id="costtext" v-else-if="o3">
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
        <i18n path="pm25deaths" tag="h2" id="costtext" v-else>
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
        <i18n path="methodology" tag="h4" id="methodology">
            <template #addLink>
                <a href="http://www.lauri.com/" target="_blank" id="methodlink">{{ $t('here') }}</a>
            </template>
        </i18n>
        <hr />
        <div>
            <strong>{{ $t('share') }}</strong><br />
            <a class="btn btn-warning m-1" id="twittersharebutton" href="" target="_blank" role="button">{{ $t('twitter') }}</a>
            <a class="btn btn-warning m-1" id="facebooksharebutton" href="" target="_blank" role="button">{{ $t('facebook') }}</a>
        </div>
    </div>
</template>

<script>
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
            var pm25Costs = cityData.estimations.ytd['PM2.5'].find(x => x.Outcome === 'Absences')
            return Math.round(pm25Costs['cost.USD_central'])
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
