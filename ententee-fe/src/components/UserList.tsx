import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  TablePagination,
  Chip,
  Avatar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { User } from './types';
import { useNavigate } from 'react-router-dom';

// Props interface
interface UserListProps {
  users?: User[];
  onEdit?: (user: User) => void;
  onDelete?: (userId: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users = [], onDelete }) => {
  const navigate = useNavigate();
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle pagination changes
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get current page of users
  const currentUsers = users.length > 0 ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage): [];

  // Handle delete action
  const handleDelete = (userId: number) => {
    if (onDelete) {
      onDelete(userId);
    }
  };


  return (
    <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
      <Box p={2}>
        <Typography variant="h5" component="h2" gutterBottom>
          Users
        </Typography>
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Age</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell component="th" scope="row">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        alt={`${user.firstName} ${user.lastName}`}
                        sx={{ mr: 2, width: 32, height: 32 }}
                      >
                        {`${user.firstName[0]}${user.lastName[0]}`}
                      </Avatar>
                      <Typography variant="body1">
                        {user.firstName} {user.lastName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.age}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    {
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => navigate(`/users/${user.id}`)}
                        aria-label="edit"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    }
                    {onDelete && (
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDelete(user.id)}
                        aria-label="delete"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body1" color="textSecondary" py={2}>
                    No users found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
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

export default UserList;