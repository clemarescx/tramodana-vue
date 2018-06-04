const state = {
  diagram: null,
  fileName: ''
}
const getters = {}
const actions = {
  async readFile(ctx, file) {
    var reader = new FileReader()

    const event = await new Promise((resolve, reject) => {
      reader.onload = event => {
        resolve(event)
      }
      reader.readAsText(file)
    })

    ctx.dispatch('readDiagram', {
      name: file.name,
      result: event.target.result
    })
  },
  async requestJSONFile(ctx, url) {
    await ctx.dispatch('requestFile', url)
    ctx.commit('parseJSON')
  },
  async requestFile(ctx, url) {
    console.log(url)
    const result = await new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function () {
        if (this.readyState !== 4) {
          return
        }

        if (this.status !== 200) {
          return reject()
        }

        console.log(this.responseText)
        resolve(this.responseText)
      }

      xhttp.open('GET', url, true)
      // crutch solution to force JSON DB to give the data
      // otherwise it caches it and we get HTTP status 304
      // Solution source:
      // https://stackoverflow.com/questions/41942074/why-is-http-get-returning-304-error
      xhttp.setRequestHeader('Cache-Control', 'no-cache')
      xhttp.setRequestHeader('Cache-Control', 'no-store')
      xhttp.setRequestHeader('Cache-Control', 'must-revalidate')
      xhttp.setRequestHeader('Pragma', 'must-revalidate')
      xhttp.setRequestHeader('Expires', '0')
      xhttp.send()
    })

    ctx.dispatch('readDiagram', {
      name: url,
      result: result
    })
  },
  readDiagram(ctx, {
    result,
    name
  }) {
    ctx.commit('setDiagram', result)
    ctx.commit('setFileName', name)
  }
}
const mutations = {
  setDiagram(state, diagram) {
    state.diagram = diagram
  },
  parseJSON(state) {
    const result = JSON.parse(state.diagram)
    state.diagram = result.value
  },
  setFileName(state, filename) {}
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
