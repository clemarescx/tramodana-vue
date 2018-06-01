<template>
  <div id="flowview">
    <h1>Select a workflow diagram</h1>
    <div>
      <input
        id="input"
        ref="inputRef"
        type="file"
        accept=".bpmn"
        @change="loadDiagram">
    </div>
    <div id="selectable-view">
      <file-selector
        id="selector"
        :file-list="exampleDiagrams"></file-selector>
      <div id="renderer"></div>
    </div>
    <p>
      <a href="/#/">Home</a>
    </p>
  </div>
</template>

<script>
import BpmnViewer from 'bpmn-js'
import FileSelector from './FileSelector.vue'
import QueryAPI from '../services/QueryAPI.js'

export default {
  name: 'FlowView',
  components: {
    FileSelector
  },
  data () {
    return {
      exampleDiagrams: [],
      viewer: null,
      fileName: '',
      diagram: null
    }
  },
  watch: {
    diagram: function (oldDiag, newDiag) {
      // eslint-disable-next-line
      if (oldDiag !== newDiag) { console.log('new diagram displayed: ' + this.fileName) }

      /*
        this.viewer.importXML(newDiag, function (err) {
          if (!err) {
            this.viewer.get('aggregated-workflow').zoom('fit-viewport')
          }
        })
        */
    }
  },
  created: function () {
    var query = new QueryAPI()
    this.exampleDiagrams = query.getDiagramFileNames()
  },
  mounted: function () {
    this.viewer = new BpmnViewer({
      container: '#renderer',
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
        // BpmnViewer does not play well with the reactive properties of
        // Vue's "watch" of the 'diagram' state variable, so we have to
        // trigger rendering from here :(
        this.viewer.importXML(this.diagram, function (err) {
          if (!err) {
            this.viewer.get('renderer').zoom('fit-viewport')
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
div {
  border: 0.1em solid green;
}

#selectable-view {
  display: grid;
  grid-template-areas: "2em auto auto";
  grid-gap: 0.5em;
}

#renderer {
  width: 50%;
  height: 400px;
  overflow: auto;
  margin: 0 auto;
}
</style>
