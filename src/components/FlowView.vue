<template>
  <div id="flowview">
    <h1>Select a workflow diagram</h1>
    <div>
      <button @click="test"> test </button>
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
        :file-list="exampleDiagrams"
        @filename-selected="onFileNameSelected"/>
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
import { mapState } from 'vuex'

export default {
  name: 'FlowView',
  components: {
    FileSelector
  },
  data () {
    return {
      exampleDiagrams: [],
      viewer: null
    }
  },
  computed: {
    ...mapState('diagrams', [
      'fileName',
      'diagram'
    ])

  },
  watch: {
    diagram: function (oldDiag, newDiag) {
      if (oldDiag !== newDiag) {
        // eslint-disable-next-line
        console.log('new diagram displayed: ' + this.fileName)
      }

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
    test: async function () {
      // eslint-disable-next-line
      console.log("test clicked")
      const url = 'http://127.0.0.1:3000/models/buyBookMethod1'
      await this.$store.dispatch('diagrams/requestJSONFile', url)
      // const self = this
      // eslint-disable-next-line
      console.log('XML: ' + this.diagram)
      this.viewer.importXML(this.diagram, function (err) {
        if (!err) {
          this.viewer.get('renderer').zoom('fit-viewport')
        }
      })
    },
    onFileNameSelected: async function (event) {
      // eslint-disable-next-line
      console.log("Selector event received: " + event);
      const url = '/static/resources/get_books_membership/' + event
      await this.$store.dispatch('diagrams/requestFile', url)

      this.viewer.importXML(this.diagram, function (err) {
        if (!err) {
          this.viewer.get('renderer').zoom('fit-viewport')
        }
      })
    },
    loadDiagram: async function () {
      const diagrams = this.$refs.inputRef.files
      await this.$store.dispatch('diagrams/readFile', diagrams[0])

      this.viewer.importXML(this.diagram, function (err) {
        if (!err) {
          this.viewer.get('renderer').zoom('fit-viewport')
        }
      })
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
