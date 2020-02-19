<template>
    <select style="width: 100%" v-model="selected" name="dropdown" id="dropdown" @change="optionChanged" class="custom-select custom-select-lg">
        <option disabled value="select_your_city">
            {{ $t('select_your_city') }}
        </option>
        <option v-for="city in sortCities" v-bind:key="city.id" v-bind:value="city.id">
            {{ city.name }}
        </option>
    </select>
</template>

<script>
import cities from './cities.json';

export default {
    name: 'Dropdown',
    props: ['cityList'],
    methods: {
        optionChanged: function() {
            this.$emit('update:option', this.selected)
        }
    },
    data: function() {
        return {
            selected: 'select_your_city'
        }
    },
    computed: {
        sortCities: function () {
            const loadedCities = cities[this.cityList];
            var sortedCities = [];
            for (var city in loadedCities) {
                sortedCities.push({id: loadedCities[city], name: this.$t('cities.' + loadedCities[city])})
                sortedCities.sort((a, b) => (a.name > b.name) ? 1 : -1);               
            }
            return sortedCities
        }
    }
}
</script>
