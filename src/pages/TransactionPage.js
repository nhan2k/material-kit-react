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
import { Stack, Button, Popover, MenuItem, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';

import requireAuth from '../hocs/requireAuth';
import { getTransaction } from '../api/transaction';

const columns = [
  { id: 'transaction_id', label: 'Code', minWidth: 170 },
  { id: 'amount', label: 'Amount', minWidth: 100 },
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
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

function TransactionPage() {
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
    queryKey: ['transaction'],
    queryFn: getTransaction,
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
                    <TableBody key={row?.transaction_id}>
                      <TableCell>{row?.transaction_id}</TableCell>
                      <TableCell>
                        {!Number.isNaN(row?.amount) &&
                          Number(row?.amount).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          })}
                      </TableCell>
                      <TableCell>{row?.status}</TableCell>
                      <TableCell>{`${new Date(row?.created_at).toLocaleDateString()} ${new Date(
                        row?.created_at
                      ).toLocaleTimeString()}`}</TableCell>
                      <TableCell>action</TableCell>
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

export default requireAuth(TransactionPage);
