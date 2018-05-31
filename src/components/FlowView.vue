<template>
  <div id="flowview">
    <h1>{{ fileName }}</h1>
    <input
      id="input"
      ref="inputRef"
      type="file"
      @change="loadDiagram">
    <div id="aggregated-workflow"></div>
    <p>
      <a href="/#/">Home</a>
    </p>
  </div>
</template>

<script>
// TODO: make component reactive by adding a watcher on the 'diagram'
import BpmnViewer from 'bpmn-js'
export default {
  name: 'FlowView',
  data () {
    return {
      viewer: null,
      fileName: '',
      diagram: null
    }
  },
  methods: {
    loadDiagram: function () {
      const diagrams = this.$refs.inputRef.files
      this.fileName = diagrams[0].name

      var reader = new FileReader()

      reader.onload = (event) => {
        if (this.viewer) {
          this.viewer.destroy()
        }
        this.viewer = new BpmnViewer({ container: '#aggregated-workflow' })
        this.diagram = event.target.result
        this.viewer.importXML(this.diagram, function (err) {
          if (!err) {
            // console.log('Loaded ' + diagrams[0].name + ' successfully')
            this.viewer.get('aggregated-workflow').zoom('fit-viewport')
          }
        })
      }

      reader.readAsText(diagrams[0])
    }
  }
}
</script>

<style>
</style>
