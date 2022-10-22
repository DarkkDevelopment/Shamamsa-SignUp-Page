import { MuiOtpInput } from 'mui-one-time-password-input'
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import axios from '../utils/axios';
type Props = {

};


export const EmailStage = (props: Props) => {
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    let countDownInterval: NodeJS.Timer;
    const [time, setTime] = useState(0);
    const handleChange = (newValue: string) => {
        setOtp(newValue)
    }

    const countDown = () => {
        console.log(time)
        if (time <= 0) clearInterval(countDownInterval);
        setTime(time - 1);
    }

    const handleVerifyEmail = async (e: any) => {
        e.preventDefault();
        const response = await axios.post('/api/auth/emailOTP', { email });
        if (response.status === 200) {
            setTime(10);
            setTimeout(() => {
                console.log('time is starting from ', time)
                countDownInterval = setInterval(countDown, 1000);
            }, 1000)
        }
    }

    const handleVerifyOTP = async () => {
        const response = await axios.post('/api/auth/verifyMailOTP', { otp, email });
        if (response.status === 200) {
            console.log(response.data)
        }
    }
    return (
        <div className='flex flex-col items-center justify-between'>
            <TextField
                id="outlined-basic"
                label="الايميل"
                variant="outlined"
                style={{
                    width: "100%",
                    textAlign: "right",
                    justifyContent: "flex-end",
                    fontSize: "1.2rem",
                    marginBottom: '1rem'
                }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            {
                time == 0 ? <Button variant="contained"
                    sx={{ marginBottom: '1rem' }}
                    onClick={handleVerifyEmail}
                >ارسال</Button> : <div>
                    <Button variant="contained"
                        sx={{ marginBottom: '1rem' }}
                        onClick={handleVerifyEmail}
                        disabled
                    >ارسال</Button>
                    <div>الرجاء الانتظار {time} ثانية</div>
                </div>
            }
            <MuiOtpInput value={otp} onChange={handleChange} length={6} sx={
                {
                    zoom: 0.9,
                    width: '100%',
                    textAlign: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    '& input': {
                        fontSize: '0.8rem',
                        width: '0.5rem',
                        height: '0.5rem',
                    }
                }
            } />
            <div id='recaptcha-container'></div>
            <Button variant="contained"
                sx={{ marginBottom: '1rem' }}
                onClick={handleVerifyOTP}
            >تأكيد</Button>

        </div >
    );
};