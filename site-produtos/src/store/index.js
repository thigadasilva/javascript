import { createStore} from 'vuex'
import auth from './modules/auth'
import produtos from './modules/produtos'

export default createStore({
    modules:{
        auth,
        produtos
    }
})