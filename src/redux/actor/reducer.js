import { SET_ACTOR} from './actions'
import { backend } from '../../declarations/backend'
import { User } from '../../declarations/User'
import { hotel } from '../../declarations/hotel'

const initialState={
    actors:{
        backendActor:backend,
        userActor:User,
        hotelActor:hotel
    }
}
async function who(actor){
    let principal=await actor.whoami()
    console.log("redux dispatch",principal)
}


export function actorReducer(state=initialState,action){
    switch(action.type){
        case SET_ACTOR:
            console.log({...state,actors:action.payload})
            state = {...state,actors:action.payload};
            who(state.actors.backendActor)
            console.log("action payload : ",action.payload)
            return {...state,actors:action.payload}
        default:
            return state
    }
}
