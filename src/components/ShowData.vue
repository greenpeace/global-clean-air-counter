<template>
    <div v-if="this.$parent.cityData">
        <i18n path="deaths" tag="h2" id="costtext">
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
        }
    },
    methods: {
        totalDeaths: function(cityData) {
            // Get all data resulting in deaths
            var pm25Deaths = cityData.estimations.ytd['PM2.5'].filter(x => x.Outcome === 'Deaths')
            var no2Deaths = cityData.estimations.ytd['NO2'].filter(x => x.Outcome === 'Deaths')
            var o3Deaths = cityData.estimations.ytd['O3_8h'].filter(x => x.Outcome === 'Deaths')
            var totalDeaths = 0

            // Add up deaths and check for existence of other causes of death
            for (var death in pm25Deaths) {
                totalDeaths += pm25Deaths[death].number_central
            }
            totalDeaths += (no2Deaths[0].number_central ? no2Deaths[0].number_central : 0) + (o3Deaths[0].number_central ? o3Deaths[0].number_central : 0)
            
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
