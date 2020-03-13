<template>
    <div id="cityinfo" class="jumbotron border bg-transparent" style="border-width: 5px !important; padding: 1rem !important; text-align: center;">
        <h2 class="mb-3">{{ $t('lead_text') }}</h2>
        <Dropdown @update:option="getData" :cityList=this.cityList class="mb-4"></Dropdown>
        <RingLoader :color="'#66cc00'" :loading=loadingState />
        <ShowData :cityData=cityData></ShowData>
        <i18n path="created" tag="p">
            <template #greenpeace>
                <a href="https://www.greenpeace.org/southeastasia/" target="_blank">{{ $t('greenpeace') }}</a>
            </template>
            <template #airvisual>
                <a href="https://www.iqair.com/air-pollution-data-api/" target="_blank">{{ $t('airvisual') }}</a>
            </template>
        </i18n>
    </div>
</template>

<script>
import Dropdown from './components/Dropdown.vue'
import ShowData from './components/ShowData.vue'
import RingLoader from '@bit/joshk.vue-spinners-css.ring-loader'
export default {
    name: 'counter',
    components: {
        Dropdown,
        ShowData,
        RingLoader
    },
    methods: {
        getData: function(value) {
            //const url = 'https://y2mta1n6vj.execute-api.us-east-1.amazonaws.com/prod/pollutionCostCounter/' + value
            const url = 'https://website-api.airvisual.com/v1/analytics/counter/' + value
            this.loadingState = true
            this.axios
                .get(url)
                .then(response => (this.cityData = response.data))
                .then(this.loadingState = false);
        }
    },
    data: function() {
        return {
            cityData: null,
            cityList: this.$attrs.citylist,
            loadingState: false
        }
    },
    mounted: function () {
      this.$i18n.locale = this.$attrs.lang
    }
}
</script>
