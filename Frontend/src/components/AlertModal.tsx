import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { AlertColor } from '@mui/material/Alert';

interface OutlinedAlertsProps {
  type: AlertColor; // "success" | "info" | "warning" | "error"
  message: string;
}

export default function CustomAlerts({ type, message }: OutlinedAlertsProps) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert variant="outlined" severity={type}>
        {message}
      </Alert>
    </Stack>
  );
}