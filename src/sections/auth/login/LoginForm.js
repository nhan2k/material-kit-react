import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSignIn } from 'react-auth-kit';
import { toast } from 'react-toastify';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { axiosInstance } from '../../../utils/axios';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const signIn = useSignIn();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/auth/login', data);

      if (response && response.data?.user?.role === 'admin') {
        if (
          signIn({
            expiresIn: 60 * 3600,
            token: response.data.access_token,
            tokenType: 'Bearer',
          })
        ) {
          sessionStorage.setItem('access-token', response.data.access_token);
          sessionStorage.setItem('refresh-token', response.data.refresh_token);
          navigate('/dashboard', { replace: true });
        } else {
          toast.error(`Login fail`);
        }
      } else {
        toast.error(`Login fail`);
      }
    } catch (error) {
      console.log('🚀 ~ file: LoginForm.js:45 ~ onSubmit ~ error:', error);
      toast.error(`Login fail ${error?.message}`);
    }
  };

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField {...register('email')} name="email" label="Email address" />

          <TextField
            {...register('password')}
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Checkbox name="remember" label="Remember me" />
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Login
        </LoadingButton>
      </form>
    </>
  );
}
