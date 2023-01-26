import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SimpleReactValidator from 'simple-react-validator';
import { useForm } from 'react-hook-form';
import { CButton, CSpinner } from '@coreui/react'
import { UserMobileNo_Update } from '../SettingsApi'
function UpdateMobileNo() {
    const [vMobileNo, setvMobileNo] = React.useState('');
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
            vMobileNo: vMobileNo
        }
        UserMobileNo_Update(data).then(res => {
            if (res) {
                toast.success(res)
                setLoader(false)
                setvMobileNo('')
            }
        })
    }
    return (
        <div className='citymasterContainer'>
            <div className='displayflexend'>
                <div className='emailInput'>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Mobile No"
                    variant="outlined"
                    value={vMobileNo}
                    name='vMobileNo'
                    onChange={e => setvMobileNo(e.target.value)}
                    inputRef={register({ required: "Mobile No is required.*", })}
                    error={Boolean(errors.vMobileNo)}
                    helperText={errors.vMobileNo?.message}
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

export default UpdateMobileNo
