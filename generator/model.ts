// @ts-nocheck
import { Functions } from '../utils/imports.utils';
import instance from "../utils/axios.utils"

const _MNS_ = {
  create_MNS_: (body) => {
    let promise = new Promise((resolve, reject) => {
      let url = "_MN_/create__MN_"
      instance().post(url, body).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(Functions.modelError(error))
      })
    })
    return promise
  },
  edit_MNS_: (body) => {
    let promise = new Promise((resolve, reject) => {
      let url = "_MN_/edit__MN_"
      instance().post(url, body).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(Functions.modelError(error))
      })
    })
    return promise
  },
  get_MNS_: (body) => {
    let promise = new Promise((resolve, reject) => {
      let url = "_MN_/get__MN_"
      instance().post(url, body).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(Functions.modelError(error))
      })
    })
    return promise
  },
  getMany_MNS_: (body) => {
    let promise = new Promise((resolve, reject) => {
      let url = "_MN_/get_many__MN_"
      instance().post(url, body).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(Functions.modelError(error))
      })
    })
    return promise
  },
  delete_MNS_: (body) => {
    let promise = new Promise((resolve, reject) => {
      let url = "_MN_/delete__MN_"
      instance().post(url, body).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(Functions.modelError(error))
      })
    })
    return promise
  },
}

export default _MNS_
