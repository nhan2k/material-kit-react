import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { refundTransaction } from '../../api/transaction';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function RefundModal({ transactionId }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['reservation'],
    mutationFn: refundTransaction,
    onSuccess: (data, variable, context) => {
      toast.success('Refund Successfully');
    },
    onError: (error, variables, context) => {
      toast.error('Refund Failed');
    },
  });

  const handleRefund = () => {
    mutation.mutate(transactionId);
    queryClient.invalidateQueries('reservation');

    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Refund
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Refund transaction {transactionId}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to refund?
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <Button color="error" variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleRefund}>
              Refund
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
