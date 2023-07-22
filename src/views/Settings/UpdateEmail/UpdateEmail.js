import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const [isValidEmail, setIsValidEmail] = React.useState(true);
    // Regular expression for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Event handler for the email input change
    const handleEmailChange = (event) => {
        const inputEmail = event.target.value;
        setvEmail(inputEmail);
        // Validate the email using the emailPattern regex
        setIsValidEmail(emailPattern.test(inputEmail));
    };
    const submit = () => {
        event.preventDefault();
        // Check if the email is valid before submitting the form
        if (isValidEmail) {
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
        } else {
            toast.error('Invalid email format.');
        }
    }
    return (
        <div className='citymasterContainer-2'>
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
                        // onChange={e => setvEmail(e.target.value)}
                        onChange={handleEmailChange}
                        inputRef={register({ required: "Email Id is required.*", })}
                        error={Boolean(errors.vEmail)}
                        helperText={errors.vEmail?.message}
                    />
                    {!isValidEmail && vEmail != "" && <p style={{ color: 'red', fontSize: 10, }}>Invalid email format</p>}
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
export default UpdateEmail