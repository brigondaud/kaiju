require('./layout.styl')

import { api as router } from 'abyssa'
import { Component, h, ConnectParams } from 'dompteuse'

import appStore, { IncrementBlue } from '../appStore'
import fadeAnimation from '../util/animation/fadeAnimation'
import link from '../widget/link'
import index from '../index'
import blue from '../blue'


export default Component<void, State>({ name: 'app', initState, connect, render })


interface State {
  count: number
  route: string
}

function readGlobalState() {
  return {
    count: appStore.state().blue.count,
    route: appStore.state().route.fullName
  }
}

function initState() {
  return readGlobalState()
}


function connect({ on }: ConnectParams<void, State>) {
  on(appStore.state, readGlobalState)
}


function render(props: void, state: State) {
  return h('div', [
    h('header', [
      link({ href: router.link('app.index'), label: 'Index' }),
      link({ href: router.link('app.blue', { id: 33 }), label: 'Blue' }),
      String(state.count)
    ]),
    fadeAnimation('main', getChildren(state.route))
  ])
}

function getChildren(route: string) {
  if (route === 'app.index') return [index()]
  if (route.indexOf('app.blue') === 0) return [blue()]
  return []
}


//setInterval(appStore.send.bind(null, IncrementBlue()), 2500)