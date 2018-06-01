<template>
  <select
    size="3"
    name="Diagrams">
    <option
      v-for="file in fileList"
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
  }
}
</script>

<style>
</style>
