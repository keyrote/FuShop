import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS
} from './mutation-types'
import {
    reqAddress,
    reqFoodCategorys,
    reqShops
} from '../api'

export default {
    async getAddress({ commit, state }) {
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqAddress(geohash)
        if (result.code === 0) {
            const address = result.data
            commit(RECEIVE_ADDRESS, { address })
        }
    },
    async getCategorys({ commit }) {
        const result = await reqFoodCategorys()
        if (result.code === 0) {
            const categorys = result.data
            commit(RECEIVE_CATEGORYS, { categorys })
        }
    },
    async getShops({ commit, state }) {
        const result = await reqShops(state.latitude, state.longitude)
        if (result.code === 0) {
            const shops = result.data
            commit(RECEIVE_SHOPS, { shops })
        }
    },
}