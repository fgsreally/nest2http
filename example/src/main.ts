import { AppController } from './app.controller'
import { useRequest,toReq,injectInstance } from 'nest2http'
import axios from 'axios'
async function request() {
  const { helloFoo } = toReq(AppController)

  try {
    const { data } = await useRequest(helloFoo({ name: 'fgs' }, 'cmd', 'param'))

    console.log(data)
  } catch (e) {
    console.log(e)
  }
}

injectInstance(axios.create({
  baseURL:'http://localhost:3002/'
}))

request()