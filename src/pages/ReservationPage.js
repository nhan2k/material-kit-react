import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';

// @mui
import { Stack, Container, Typography } from '@mui/material';
// components
import requireAuth from '../hocs/requireAuth';
import { getReservation } from '../api/reservation';
import RefundModal from '../components/modal/Refund';

const columns = [
  { id: 'note', label: 'Room No', maxWidth: 170 },
  { id: 'check_in', label: 'Check In', minWidth: 100 },
  {
    id: 'checkout',
    label: 'Checkout',
    minWidth: 170,
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
  },
  {
    id: 'created_at',
    label: 'Date',
    minWidth: 170,
  },
];

function ReservationPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const query = useQuery({
    queryKey: ['reservation'],
    queryFn: getReservation,
  });

  return (
    <>
      <Helmet>
        <title> Transaction | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Transaction
          </Typography>
        </Stack>

        <Paper sx={{ width: '100%' }}>
          <TableContainer sx={{ maxHeight: '100%' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ top: 57, minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
              {query?.isSuccess ? (
                query?.data.map((row) => {
                  return (
                    <TableBody key={row?.reservation_id}>
                      <TableCell>{row?.note}</TableCell>
                      <TableCell>{`${new Date(row?.check_in).toLocaleDateString()} ${new Date(
                        row?.check_in
                      ).toLocaleTimeString()}`}</TableCell>
                      <TableCell>{`${new Date(row?.checkout).toLocaleDateString()} ${new Date(
                        row?.checkout
                      ).toLocaleTimeString()}`}</TableCell>
                      <TableCell>{row?.status}</TableCell>
                      <TableCell>{`${new Date(row?.created_at).toLocaleDateString()} ${new Date(
                        row?.created_at
                      ).toLocaleTimeString()}`}</TableCell>
                      <TableCell>
                        {row?.status === 'pending' && row?.____transactions____?.[0]?.status === 'paid' ? (
                          <RefundModal transactionId={row?.____transactions____?.[0]?.transaction_id} />
                        ) : (
                          <></>
                        )}
                      </TableCell>
                    </TableBody>
                  );
                })
              ) : (
                <></>
              )}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </>
  );
}

export default requireAuth(ReservationPage);
