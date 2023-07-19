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
        <div className='citymasterContainer-2'>
            <div className='displayflexend'>
                <div className='emailInput'>
                <TextField
                   sx={muiStyles.input}
                    fullWidth
                    id="outlined-basic"
                    label="Mobile No"
                    variant="outlined"
                    value={vMobileNo}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*',maxLength: 12 }}
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
            left:'-10px',
            backgroundColor: 'transparent',
            zIndex: '1'
        },
        "& label.Mui-focused": {
            zIndex: '1'

        },
        '& .MuiInputAdornment-root':{
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
            left:'-10px',
          
        },
         "& label.Mui-focused": {
            zIndex: '1'
        },'& .MuiFormHelperText-root': {
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
            left:'-10px',  
            backgroundColor: 'transparent',
        },
         "& label.Mui-focused": {
            zIndex: '1'
        },'& .MuiFormHelperText-root': {
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
        left:'-10px',
        backgroundColor: 'transparent',
        "&.Mui-focused": {
            zIndex: '1'
        }
    },
   

};
export default UpdateMobileNo
