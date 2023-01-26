import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SimpleReactValidator from 'simple-react-validator';
import { useForm } from 'react-hook-form';
import { CButton, CSpinner } from '@coreui/react'
import { UserChangePassword_Update } from '../SettingsApi'
function UpdatePassword() {
    const [vPassword, setvPassword] = React.useState('');
    const [confirmvPassword, setconfirmvPassword] = React.useState('');
    const [nUserId, setnUserId] = React.useState('');
    const [loader, setLoader] = React.useState(false);
    const { register, handleSubmit, control, errors } = useForm();

    useEffect(() => {
        const userId = localStorage.getItem("nUserId")
        setnUserId(userId)
    }, [])

    const submit = () => {
        setLoader(true)
        let data = {
            nUserId: parseInt(nUserId),
            vPassword: vPassword
        }
        UserChangePassword_Update(data).then(res => {
            if (res) {
                toast.success(res)
                setLoader(false)
                setvPassword('')
                setconfirmvPassword('')
            }
        })
    }
    return (
        <div className='citymasterContainer'>
            <div >
                <div className='emailInput'>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="New Password"
                    variant="outlined"
                    value={vPassword}
                    name='vPassword'
                    onChange={e => setvPassword(e.target.value)}
                    inputRef={register({ required: "New Password is required.*", })}
                    error={Boolean(errors.vPassword)}
                    helperText={errors.vPassword?.message}
                />
                    
                </div>
                <div className='emailInput mt-4'>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Confirm Password"
                    variant="outlined"
                    value={confirmvPassword}
                    name='confirmvPassword'
                    onChange={e => setconfirmvPassword(e.target.value)}
                    inputRef={register(
                        // { required: "Confirm Password is required.*" },
                        {
                        validate: value =>
                          value === vPassword.current || "The passwords do not match"
                      }
                      )}
                    
                    error={Boolean(errors.confirmvPassword)}
                    helperText={errors.confirmvPassword?.message}
                />
                    
                </div>
            </div>
            <div>
                {loader == true ?
                    <CButton disabled className='submitbtn'>
                        <CSpinner component="span" size="sm" aria-hidden="true" />
                        Loading...
                    </CButton>
                    :
                    <button type="submit" className='submitbtn' onClick={handleSubmit(submit)}>Update</button>
                }

            </div>
        </div>
    )
}
export default UpdatePassword
