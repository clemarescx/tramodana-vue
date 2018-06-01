<template>
  <select
    v-model="filename"
    size="3"
    name="Diagrams"
    @change="$emit('filename-selected',filename)">
    <option
      v-for="file in fileList"
      :value="file.name"
      :key="file.name"> {{ file.name }}
    </option>
  </select>
</template>

<script>

export default {
  name: 'FileSelector',
  props: {
    fileList: {
      type: Array,
      default: () => []
    }
  },
  data: function () {
    return {
      filename: ''
    }
  }
}
</script>

<style>
</style>
