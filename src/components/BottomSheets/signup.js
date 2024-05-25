import { Dialog , ALERT_TYPE} from "react-native-alert-notification"

async function signUp(fname,lname,DOB,email,actors,setLoading,openComm,closeModal,dispatch){
    console.log(actors?.userActor.createUser)
    setLoading(true)
    const userObj={
      firstName:fname,
      lastName:lname,
      dob:DOB,
      userEmail:email,
    }
    // await actors.userActor?.createUser(fname,lname,DOB,email,"user").then(async(res)=>{
    let whoami=await actors?.backendActor?.whoami().catch((err)=>{console.log(err)})
    console.log("principal signup page : ",whoami)
    await actors.userActor?.createUser(userObj).then(async(res)=>{
      console.log(res)
      setLoading(false)
      // alert(`Welcome ${fname}! You are successfully registered `)
      Dialog.show({
        type:ALERT_TYPE.WARNING,
        title:'WARNING',
        textBody:message,
        button:'OK',
      })
      await actors.userActor?.getUserInfo().then((res)=>{
        console.log(res[0]),
        dispatch(setUser(res[0]))
        openComm()
        closeModal()
        console.log(user)
      }).catch((err)=>{console.log("get user info catch : ",err)})
    }).catch((err)=>{
      // alert(err)
      console.log("err create user : ",err)
      setLoading(false)
    })
    //alert(email)
  }

  module.exports={signUp}