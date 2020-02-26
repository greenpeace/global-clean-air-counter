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

            // Sort national cities to top if list contains global cities
            if (loadedCities.indexOf('xxxxxxxxxxxxxxxxx') > 0) {
                var topCities = loadedCities.slice(0, loadedCities.indexOf('xxxxxxxxxxxxxxxxx'))
                var bottomCities = loadedCities.slice(loadedCities.indexOf('xxxxxxxxxxxxxxxxx')+1, loadedCities.length)
                var sortedTopCities = []
                var sortedBottomCities = []
                for (var topCity in topCities) {
                    sortedTopCities.push({id: topCities[topCity], name: this.$t('cities.' + topCities[topCity])})
                    sortedTopCities.sort((a, b) => (a.name > b.name) ? 1 : -1); 
                }
                for (var bottomCity in bottomCities) {
                    sortedBottomCities.push({id: bottomCities[bottomCity], name: this.$t('cities.' + bottomCities[bottomCity])})
                    sortedBottomCities.sort((a, b) => (a.name > b.name) ? 1 : -1); 
                }
                sortedCities = sortedTopCities.concat(sortedBottomCities)
            }
            // Otherwise simple list sort
            else {
                for (var city in loadedCities) {
                    sortedCities.push({id: loadedCities[city], name: this.$t('cities.' + loadedCities[city])})
                    sortedCities.sort((a, b) => (a.name > b.name) ? 1 : -1);               
                }
            }
            return sortedCities
        }
    }
}
</script>
