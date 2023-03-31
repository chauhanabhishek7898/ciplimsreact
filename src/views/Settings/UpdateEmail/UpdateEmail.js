import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SimpleReactValidator from 'simple-react-validator';
import { useForm } from 'react-hook-form';
import { CButton, CSpinner } from '@coreui/react'
import { UserEmailId_Update } from '../SettingsApi'

function UpdateEmail() {
    const [vEmail, setvEmail] = React.useState('');
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
            vEmailId: vEmail
        }
        UserEmailId_Update(data).then(res => {
            if (res) {
                toast.success(res)
                setLoader(false)
                setvEmail('')
            }
        })
    }
    return (
        <div className='citymasterContainer'>
            <div className='displayflexend'>
                <div className='emailInput'>
                <TextField
                   sx={muiStyles.input}
                    fullWidth
                    id="outlined-basic"
                    label="Email Id"
                    variant="outlined"
                    value={vEmail}
                    name='vEmail'
                    onChange={e => setvEmail(e.target.value)}
                    inputRef={register({ required: "Email Id is required.*", })}
                    error={Boolean(errors.vEmail)}
                    helperText={errors.vEmail?.message}
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
                padding: '5px 14px',
                fontSize: '13px'
            }
        },
        "& .MuiFormLabel-root": {
            fontSize: '13px',
            lineHeight: '0',
            top: '4.6px',
            overflow: 'visible',
            background: '#fff',
            zIndex: '1'
        },
        "& label.Mui-focused": {
            top: '5px',
            background: '#fff',
            zIndex: '1'

        },
    },
    autoCompleate: {
        "& .MuiOutlinedInput-root": {
            padding: '0px',
            "& .MuiAutocomplete-input": {
                padding: '5px 14px',
                fontSize: '13px'
            }

        },
        "& .MuiFormLabel-root": {
            fontSize: '13px',
            lineHeight: '0',
            top: '-4px',
            overflow: 'visible',
        },
        "& label.Mui-focused": {
            top: '5px',
            backgroundColor: '#fff',
            zIndex: '1'
        },
    },
    input: {
        "& .MuiOutlinedInput-root": {
            "& input": {
                padding: '6px 14px',
                fontSize: '12px'
            }
        },
        "& .MuiFormLabel-root": {
            fontSize: '13px',
            lineHeight: '0',
            top: '-4px',
            overflow: 'visible',
        },
        "& label.Mui-focused": {
            top: '5px',
            backgroundColor: 'green',
            zIndex: '1'
        },
    },
    select: {
        "& .MuiSelect-select": {
            padding: '3px 14px',
            fontSize: '12px'
        },

    },
    InputLabels: {
        fontSize: '13px',
        lineHeight: '0',
        top: '-4px',
        overflow: 'visible',
        "&.Mui-focused": {
            top: '5px',
            backgroundColor: 'green',
            zIndex: '1'
        }
    }

};
export default UpdateEmail
