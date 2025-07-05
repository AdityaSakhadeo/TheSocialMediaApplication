import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store/store';
import { useEffect } from 'react';
import { clearAlert } from '../redux/slices/alertSlice';

export default function CustomAlerts() {
  const { type, message } = useSelector((state: RootState) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    if (type) {
      const timer = setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [type]);

  if (!type || !message) return null;

  return (
    <Stack
      sx={{
        position:"fixed",
        alignItems:"flex-end"
      }}
    >
      <Alert severity={type}>
        {message}
      </Alert>
    </Stack>
  );
}
