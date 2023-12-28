export const SET_ACTOR="SET_ACTOR"


export const setActor=actors=>{
    return {
        type:SET_ACTOR,
        payload:actors
    }
}
// export const updateUser=async(userActor,user)=>{
//     let res=await userActor.updateUserInfo(user)
//     console.log("redux updateUser : ",res[0])
//     getUser(userActor)
// }
// export const getUser=async(userActor)=>{
//     let res=await userActor.getUserInfo()
//     console.log("redux getUser : ",res[0])
//     dispatch((setUser(res[0])))
// }
