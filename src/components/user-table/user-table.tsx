import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';

import { useUser } from '../../services/user';
import { ProfilePatch } from '../../services/user/types';
import { ProfileResponseData } from '../../services/api';

interface Column {
  id: 'id' | 'firstName' | 'middleName' | 'lastName' | 'email' | 'role';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 30 },
  { id: 'email', label: 'Email', minWidth: 160 },
  { id: 'firstName', label: 'First Name', minWidth: 90 },
  {
    id: 'middleName',
    label: 'Middle Name',
    minWidth: 160,
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'lastName',
    label: 'Last Name',
    minWidth: 160,
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'role',
    label: 'Role',
    minWidth: 180,
    format: (value: number) => value.toFixed(2),
  },
];

type Props = {
  setProfileSelect: (profile: ProfilePatch, modalType: 'role' | 'profile') => void;
};

export const UserTable = ({ setProfileSelect }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { users, allUsers } = useUser();

  useEffect(() => {
    allUsers();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectUser = (user: ProfileResponseData, modalType: 'role' | 'profile') => {
    const profile: ProfilePatch = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      height: user.height,
      weight: user.weight,
      gender: user.gender,
      role: user.role,
    };

    setProfileSelect(profile, modalType);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];

                    if (column.id === 'role') {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                            <Box sx={{ width: 110 }}>{value}</Box>
                            <Button
                              onClick={() => handleSelectUser(row, 'profile')}
                              sx={{ fontSize: 10 }}
                            >
                              Profile
                            </Button>
                            <Button
                              onClick={() => handleSelectUser(row, 'role')}
                              sx={{ fontSize: 10 }}
                            >
                              Role
                            </Button>
                          </Box>
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
