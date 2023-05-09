import React, {Fragment,useRef,useState,useEffect}  from 'react'
import "./loginSignUp.css"
import {Link} from "react-router-dom"
import Loader from '../layout/Loader/Loader'
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import LockOpenIcon from "@material-ui/icons/LockOpen"
import FaceIcon from "@material-ui/icons/Face"
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors,login,register } from '../../redux/actions/userActions'
import { useAlert  } from 'react-alert'


    const LoginSignUp = ({history}) => {
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
    })
    const [avatar,setAvatar] = useState("/Profile.png")
    const [avatarPreview,setAvatarPreview] = useState("/Profile.png")

    const loginTab = useRef(null)
    const registerTab = useRef(null)
    const switcherTab = useRef(null)
    const {name,email,password} = user
    const alert = useAlert()
    const dispatch = useDispatch()
    const {error,loading,isAuthenticated} = useSelector(state=>state.user)

    const loginSubmit = (e) =>{
        e.preventDefault()
        console.log("Form Submited")
        dispatch(login(loginEmail,loginPassword))
    }

    const registerSubmit = (e) =>{
        e.preventDefault()
        const myForm = new FormData();

        myForm.set("name",name)
        myForm.set("email",email)
        myForm.set("password",password)
        myForm.set("avatar",avatar)

        console.log("signup form submited")
        dispatch(register(myForm))
    }

    const switchTabs = (e,tab)=>{
        if(tab == 'login'){
            switcherTab.current.classList.add("shiftToNeutral")
            switcherTab.current.classList.remove("shiftToRight")

            registerTab.current.classList.remove("shiftToNeutralForm")
            loginTab.current.classList.remove("shiftToLeft")
        }

        if(tab == 'register'){
            switcherTab.current.classList.add("shiftToRight")
            switcherTab.current.classList.remove("shiftToNeutral")

            registerTab.current.classList.add("shiftToNeutralForm")
            loginTab.current.classList.add("shiftToLeft")
        }
    }

    const registerDataChange = (e)=>{
        if(e.target.name == "avatar"){
            const reader = new FileReader()

            reader.onload=()=>{
                if(reader.readyState==2){
                    setAvatar(reader.result)
                    setAvatarPreview(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }else{
            setUser({...user, [e.target.name]:e.target.value})
        }
    }

    useEffect(() => {
      if(error){
        alert.error(error)
        dispatch(clearErrors())
      }
    
      if(isAuthenticated){
        history.push("/account")
      }
      
    }, [dispatch,error,alert,history,isAuthenticated])
    


  return (
    <Fragment>
        {loading?<Loader/>:<Fragment>
        <div className="loginSignUpContainer">
            <div className="loginSignUpBox">
                <div>
                    <div className="login_signUp_toggle">
                        <p onClick={(e)=>switchTabs(e,"login")}>LOGIN</p>
                        <p onClick={(e)=>switchTabs(e,"register")}>REGISTER</p>
                    </div>
                    <button ref={switcherTab}></button>
                </div>

                <form action="" className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                    <div className="loginEmail">
                        <MailOutlineIcon/>
                        <input 
                        type="email" 
                        placeholder='Email'
                        required
                        value={loginEmail}
                        onChange={(e)=>setLoginEmail(e.target.value)}
                        />
                    </div>
                    <div className="loginPassword">
                        <LockOpenIcon/>
                        <input 
                        type="password" 
                        placeholder='Password'
                        required
                        value={loginPassword}
                        onChange={(e)=>setLoginPassword(e.target.value)}
                        />
                    </div>
                    <Link to="/password/forget">Forget Password ?</Link>
                    <input type="submit" value='login' className='loginBtn' />
                </form>
                <form 
                encType='multipart/form-data' 
                className='signUpForm' 
                ref={registerTab} 
                onSubmit={registerSubmit}
                >
                    <div className="signUpName">
                        <FaceIcon/>
                        <input 
                        type="text" 
                        placeholder='Name'
                        required
                        value={name}
                        name="name"
                        onChange={registerDataChange}
                        />
                    </div>
                    <div className="signUpEmail">
                        <MailOutlineIcon/>
                        <input 
                        type="email" 
                        placeholder='Email'
                        required
                        name='email'
                        value={email}
                        onChange={registerDataChange}
                        />
                    </div>
                    <div className="signUpPassword">
                        <MailOutlineIcon/>
                        <input 
                        type="password" 
                        placeholder='Password'
                        required
                        name='password'
                        value={password}
                        onChange={registerDataChange}
                        />
                    </div>
                    <div id="registerImage">
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input 
                        type="file"  
                        name='avatar'
                        accept='image/*'
                        onChange={registerDataChange}
                        />
                    </div>
                    <input 
                    type="submit"
                    value='Register' 
                    className='signUpBtn' 
                    disabled={loading?true:false}
                    />
                </form>

            </div>
        </div>
    </Fragment>}
    </Fragment>
  )
}


export default LoginSignUp