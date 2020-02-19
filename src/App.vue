<template>
    <div id="cityinfo" class="jumbotron border bg-transparent" style="border-width: 5px !important; padding: 1rem !important; text-align: center;">
          <div class="btn-group btn-group-sm mb-3" role="group" aria-label="Select your list">
            <button @click="setList('global')" class="btn btn-primary">Global</button>
            <button @click="setList('indonesia')" class="btn btn-primary">Indonesia</button>
            <button @click="setList('thailand')" class="btn btn-primary">Thailand</button>
            <button @click="setList('taiwan')" class="btn btn-primary">Taiwan</button>
            <button @click="setList('mena')" class="btn btn-primary">MENA</button>
            <button @click="setList('turkey')" class="btn btn-primary">Turkey</button>
            <button @click="setList('israel')" class="btn btn-primary">Israel</button>
            <button @click="setList('southafrica')" class="btn btn-primary">South Africa</button>
            <button @click="setList('romania')" class="btn btn-primary">Romania</button>
            <button @click="setList('australia')" class="btn btn-primary">Australia</button>
            <button @click="setList('india')" class="btn btn-primary">India</button>
            <button @click="setList('spain')" class="btn btn-primary">Spain</button>
        </div>
        <br />
        <div class="btn-group btn-group-sm mb-3" role="group" aria-label="Select your city">
            <button @click="setLocale('ar')" class="btn btn-primary">اَلْعَرَبِيَّةُ</button>
            <button @click="setLocale('id')" class="btn btn-primary">Bahasa</button>
            <button @click="setLocale('en')" class="btn btn-primary">English</button>
            <button @click="setLocale('es')" class="btn btn-primary">Español</button>
            <button @click="setLocale('he')" class="btn btn-primary">עברית</button>
            <button @click="setLocale('ro')" class="btn btn-primary">Română</button>
            <button @click="setLocale('tr')" class="btn btn-primary">Türkçe</button>
            <button @click="setLocale('th')" class="btn btn-primary">ไทย</button>
            <button @click="setLocale('zh')" class="btn btn-primary">中文</button>
        </div>
        <h2>{{ $t('lead_text') }}</h2>
        <Dropdown @update:option="getData" :cityList=this.cityList class="mb-5"></Dropdown>
        <ShowData :cityData=cityData></ShowData>
        <i18n path="created" tag="p">
            <template #greenpeace>
                <a href="https://www.greenpeace.org/southeastasia/" target="_blank">{{ $t('greenpeace') }}</a>
            </template>
            <template #airvisual>
                <a href="https://www.airvisual.com/" target="_blank">Air Visual</a>
            </template>
        </i18n>
    </div>
</template>

<script>
import Dropdown from './components/Dropdown.vue'
import ShowData from './components/ShowData.vue'
export default {
    name: 'counter',
    components: {
        Dropdown,
        ShowData,
    },
    methods: {
        getData: function(value) {
            const url = 'https://y2mta1n6vj.execute-api.us-east-1.amazonaws.com/prod/pollutionCostCounter/' + value;
            this.axios
                .get(url)
                .then(response => (this.cityData = response.data));
        },
        setLocale: function(locale) {
            this.$i18n.locale = locale;
        },
        setList: function(list) {
          this.cityList = list;
        }
    },
    data: function() {
        return {
            cityData: null,
            cityList: this.$attrs.citylist
        }
    },
    mounted: function () {
      this.$i18n.locale = this.$attrs.lang
    }
}
</script>
