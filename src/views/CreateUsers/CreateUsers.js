import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CButton, CSpinner } from '@coreui/react';
import { UserMasterPost } from './CreateUsersApi';
import { RoleMaster_SelectAll } from '../RoleMaster/RoleMasterApi';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function CreateUsers() {

    const [nUserId, setnUserId] = React.useState('');

    const [vFullName, setvFullName] = React.useState('');
    const [vUserName, setvUserName] = React.useState('');

    const [vPassword, setvPassword] = React.useState('');
    const [vMobileNo, setvMobileNo] = React.useState('');

    const [vEmailId, setvEmailId] = React.useState('');
    const [nRoleId, setnRoleId] = React.useState('');

    const [RoleMasterData, setRoleMasterData] = React.useState([]);
    const [roleName, setnRoleName] = React.useState("");

    const [loader, setLoader] = React.useState(false);

    const { register, handleSubmit, control, errors } = useForm();

    const [errorText, setErrorText] = React.useState({
        roleName: ''
    });

    const [showPassword, setShowPassword] = React.useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleMobileNumberChange = (event) => {
        const { value } = event.target;
        // Basic validation to allow only numeric characters and limit the input to 10 digits
        if (/^\d*$/.test(value) && value.length <= 10) {
            setvMobileNo(value);
        }
    };

    const handleEmailChange = (event) => {
        setvEmailId(event.target.value);
    };

    const isValidEmail = (email) => {
        // Basic email validation using a regular expression
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    useEffect(() => {
        const userId = localStorage.getItem("nUserId")
        setnUserId(userId)
    }, [])

    const validateform = () => {
        if (roleName == '' || roleName == undefined || roleName == null) {
            setErrorText({
                roleName: 'Select Role Name *'
            })
            return false
        } else {
            setErrorText('')
            return true
        }
    }

    useEffect(() => {
        getRoleMaster_SelectAll()
    }, [])

    const getRoleMaster_SelectAll = () => {
        RoleMaster_SelectAll().then(response => {
            setRoleMasterData(response)
        })
    }

    const handleChangeRoleMaster = (event) => {
        const selectedId = event.target.value;
        setnRoleName(selectedId)
        const selectedValue = RoleMasterData.find((item) => item.vRoleName === selectedId);
        console.log("selectedValue", selectedValue)
    };

    const handleBlurRoleMaster = (item) => {
        console.log("itemitemitem", item)
        setnRoleName(item.vRoleName)
        setnRoleId(item.nRoleId)
    };

    const submit = () => {
        if (validateform() == true) {
            setLoader(true)
            setErrorText('')
            let data = {
                vFullName: vFullName,
                vUserName: vUserName,
                vPassword: vPassword,
                vMobileNo: vMobileNo,
                vEmailId: vEmailId,
                nRoleId: parseInt(nRoleId),
            }
            UserMasterPost(data).then(res => {
                if (res) {
                    toast.success(res)
                    setLoader(false)
                    setnRoleName('')
                    setvFullName('')
                    setvUserName('')
                    setvMobileNo('')
                    setvEmailId('')
                    setvPassword('')
                    setError('')
                }
            })
        }
    }

    return (
        <div className='createusersContainer'>
            <div className='createusersInput'>

                <Box className='inputBox-48 mt-4' >
                    <FormControl fullWidth className='input'>
                        <TextField
                            sx={muiStyles.input}
                            onChange={e => setvFullName(e.target.value)}
                            required id="outlined-basic"
                            label="Full Name"
                            variant="outlined"
                            value={vFullName}
                            name='vFullName'
                            inputRef={register({ required: "Full Name is required.*", })}
                            error={Boolean(errors.vFullName)}
                            helperText={errors.vFullName?.message} />
                    </FormControl>
                </Box>

                <Box className='inputBox-48 mt-4' >
                    <FormControl fullWidth className='input'>
                        <TextField
                            sx={muiStyles.input}
                            onChange={e => setvUserName(e.target.value)}
                            required id="outlined-basic"
                            label="User Name"
                            variant="outlined"
                            value={vUserName}
                            name='vUserName'
                            inputRef={register({ required: "User Name is required.*", })}
                            error={Boolean(errors.vUserName)}
                            helperText={errors.vUserName?.message} />
                    </FormControl>
                </Box>

                <Box className='inputBox-47 mt-4' >
                    <FormControl fullWidth className='input'>
                        <TextField
                            sx={muiStyles.input}
                            onChange={handleMobileNumberChange}
                            required id="outlined-basic"
                            label="Mobile No."
                            variant="outlined"
                            type="tel"
                            value={vMobileNo}
                            name='vMobileNo'
                            inputRef={register({ required: "Mobile No. is required.*", })}
                            error={Boolean(errors.vMobileNo)}
                            helperText={errors.vMobileNo?.message} />
                    </FormControl>
                </Box>

                <Box className='inputBox-47 mt-4' >
                    <FormControl fullWidth className='input'>
                        <TextField
                            sx={muiStyles.input}
                            // onChange={e => setvEmailId(e.target.value)} handleEmailChange
                            onChange={handleEmailChange}
                            required id="outlined-basic"
                            label="Email Id"
                            variant="outlined"
                            type="email"
                            value={vEmailId}
                            name='vEmailId'
                            inputRef={register({ required: "Email Id is required.*", })}
                            // error={Boolean(errors.vEmailId)}
                            // helperText={errors.vEmailId?.message} 
                            error={vEmailId && !isValidEmail(vEmailId)}
                            helperText={vEmailId && !isValidEmail(vEmailId) ? 'Invalid email format' : ''}
                        />
                    </FormControl>
                </Box>

                <Box className='inputBox-48 mt-4' >
                    <FormControl fullWidth className='input'>
                        <TextField
                            sx={muiStyles.input}
                            onChange={e => setvPassword(e.target.value)}
                            required id="outlined-basic"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            value={vPassword}
                            name='vPassword'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePasswordVisibility}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            inputRef={register({ required: "Password is required.*", })}
                            error={Boolean(errors.vPassword)}
                            helperText={errors.vPassword?.message} />
                    </FormControl>
                </Box>

                <Box className='inputBox-47 mt-4'>
                    <FormControl fullWidth className='input'>
                        <InputLabel required id="demo-simple-select-label" sx={muiStyles.InputLabels}>Role Id</InputLabel>
                        <Select
                            sx={muiStyles.select}
                            style={{ width: '100%', }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={roleName}
                            label="Role Name"
                            onChange={handleChangeRoleMaster}
                            name='roleName' >
                            {RoleMasterData.map((item, index) => {
                                return (
                                    <MenuItem key={index} onBlur={() => handleBlurRoleMaster(item)} value={item.vRoleName} id={item.nRoleId}>{item.vRoleName}</MenuItem>
                                )
                            })
                            }
                        </Select>
                        {errorText.roleName != '' ? <p className='error'>{errorText.roleName}</p> : null}
                    </FormControl>
                </Box>

                {loader == true ?
                    <CButton disabled className='submitbtn'>
                        <CSpinner component="span" size="sm" aria-hidden="true" />
                        Loading...
                    </CButton>
                    :
                    <button type="submit" className='submitbtn' onClick={handleSubmit(submit)}>SignUp</button>
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
                fontSize: '12px',
                position: 'relative'
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
            padding: '3px 8px',
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
    tableBox: {
        "&.MuiTableContainer-root": {
            width: '100%',
            maxHeight: '440px',
            padding: '0px 16px',
        },
    },
    tableHead: {
        "&.MuiTableCell-root": {
            padding: '8px',
            fontWeight: 'bold'
        }
    },
    tableBody: {
        "&.MuiTableCell-root": {
            padding: '8px',
            fontSize: '14px',
            lineHeight: '39px'
        }
    },
    checkboxLabel: {
        "&.MuiFormControlLabel-root": {
            "&.MuiTypography-root": {
                fontSize: '14px'
            }
        }
    },
};
export default CreateUsers