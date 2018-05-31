<template>
  <div id="flowview">
    <h1>{{ fileName }}</h1>
    <input
      id="input"
      ref="inputRef"
      type="file"
      accept=".bpmn"
      @change="loadDiagram">
    <div id="aggregated-workflow"></div>
    <p>
      <a href="/#/">Home</a>
    </p>
  </div>
</template>

<script>
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
  mounted: function () {
    this.viewer = new BpmnViewer({
      container: '#aggregated-workflow',
      width: '100%',
      height: '100%'
    })
  },
  methods: {
    loadDiagram: function () {
      const diagrams = this.$refs.inputRef.files

      var reader = new FileReader()

      reader.onload = (event) => {
        this.diagram = event.target.result
        this.viewer.importXML(this.diagram, function (err) {
          if (!err) {
          // console.log('Loaded ' + diagrams[0].name + ' successfully')
            this.viewer.get('aggregated-workflow').zoom('fit-viewport')
          }
        })
      }
      this.fileName = diagrams[0].name
      reader.readAsText(diagrams[0])
    }
  }
}
</script>

<style scoped>
#aggregated-workflow {
  border: 0.2em solid green;
  width: 50%;
  height: 400px;
  overflow: auto;
  margin: 0 auto;

}
</style>
