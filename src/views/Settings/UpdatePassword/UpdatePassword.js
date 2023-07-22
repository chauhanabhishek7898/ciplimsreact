import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CButton, CSpinner } from '@coreui/react'
import { UserChangePassword_Update } from '../SettingsApi'
function UpdatePassword() {
    const [vPassword, setvPassword] = React.useState('');
    const [confirmvPassword, setconfirmvPassword] = React.useState('');
    const [Error, setError] = React.useState({
        pass: '',
        confpass: ''
    });
    const [nUserId, setnUserId] = React.useState('');
    const [loader, setLoader] = React.useState(false);
    useEffect(() => {
        const userId = localStorage.getItem("nUserId")
        setnUserId(userId)
    }, [])
    const validate = () => {
        if (vPassword == '') {
            setError({
                pass: 'Enter Password'
            }
            )
            return false
        }
        if (confirmvPassword == "") {
            setError({
                confpass: 'Enter confirm Password'
            })
            return false
        }
        if (confirmvPassword != vPassword) {
            setError({
                confpass: 'Passwords do not match'
            })
            return false
        } else {
            return true
        }
    }
    const submit = () => {
        if (validate() == true) {
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
                    setError('')
                }
            })
        }
    }
    return (
        <div className='citymasterContainers'>
            <div >
                <div className='emailInput'>
                    <TextField
                        sx={muiStyles.input}
                        fullWidth
                        id="outlined-basic"
                        label="New Password"
                        variant="outlined"
                        value={vPassword}
                        name='vPassword'
                        onChange={e => setvPassword(e.target.value)}

                    />
                    {Error.pass != '' ? <p style={{ color: 'red', fontSize: 10 }}>{Error.pass}</p> : null}
                </div>
                <div className='emailInput mt-4'>
                    <TextField
                        sx={muiStyles.input}
                        fullWidth
                        id="outlined-basic"
                        label="Confirm Password"
                        variant="outlined"
                        value={confirmvPassword}
                        name='confirmvPassword'
                        onChange={e => setconfirmvPassword(e.target.value)}
                    />
                    {Error.confpass != '' ? <p style={{ color: 'red', fontSize: 10 }}>{Error.confpass}</p> : null}
                </div>
            </div>
            <div>
                {loader == true ?
                    <CButton disabled className='submitbtn'>
                        <CSpinner component="span" size="sm" aria-hidden="true" />
                        Loading...
                    </CButton>
                    :
                    <button type="submit" className='submitbtn' onClick={submit}>Update</button>
                }
            </div>
        </div>
    )
}
const muiStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
    },
    date: {
        "& .MuiInputBase-root": {
            "& input": {
                padding: '6px 6px',
                fontSize: '13px'
            }
        },
        "& .MuiFormLabel-root": {
            fontSize: '13px',
            top: '-13px',
            left: '-10px',
            backgroundColor: 'transparent',
            zIndex: '1'
        },
        "& label.Mui-focused": {
            zIndex: '1'
        },
        '& .MuiInputAdornment-root': {
            position: 'absolute',
            right: '10px'
        }
    },
    autoCompleate: {
        "& .MuiOutlinedInput-root": {
            padding: '0px',
            "& .MuiAutocomplete-input": {
                padding: '6px 6px',
                fontSize: '13px'
            }
        },
        "& .MuiFormLabel-root": {
            fontSize: '13px',
            backgroundColor: 'transparent',
            top: '-13px',
            left: '-10px',
        },
        "& label.Mui-focused": {
            zIndex: '1'
        }, '& .MuiFormHelperText-root': {
            position: 'absolute',
            fontSize: 10,
            bottom: -18
        },
    },
    input: {
        "& .MuiOutlinedInput-root": {
            "& input": {
                padding: '6px',
                fontSize: '12px'
            }
        },
        "& .MuiFormLabel-root": {
            fontSize: '13px',
            top: '-13px',
            left: '-10px',
            backgroundColor: 'transparent',
        },
        "& label.Mui-focused": {
            zIndex: '1'
        }, '& .MuiFormHelperText-root': {
            position: 'absolute',
            fontSize: 10,
            bottom: -18
        },
    },
    select: {
        "& .MuiSelect-select": {
            padding: '3px',
            fontSize: '12px'
        },
    },
    InputLabels: {
        fontSize: '13px',
        top: '-13px',
        left: '-10px',
        backgroundColor: 'transparent',
        "&.Mui-focused": {
            zIndex: '1'
        }
    },
};
export default UpdatePassword