// import { login } from '@/api/sys'
// import md5 from 'md5'
import router from '@/router'

const state = () => ({})
const mutations = {}
const actions = {
  login(context, userInfo) {
    // const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // login({
      //   username,
      //   password: md5(password)
      // })
      //   .then((data) => {
      //     resolve()
      //   })
      //   .catch((err) => {
      //     reject(err)
      //   })
      router.replace('/')
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
