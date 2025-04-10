import { useMutation, useQuery } from '@tanstack/react-query';
import { request } from './API/apiConfig';
import UserList from './UserList';
import { User } from './types';
import { CircularProgress } from '@mui/material';

const fetchUsers = () => request<User[]>('users')
const deleteUser = (userId: number) => request(`users/${userId}`, { method: 'DELETE' });


const UserDashboard = () => { 
  const { data: users, isPending, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    refetchOnWindowFocus: false,
  });

  const { mutate: deleteUserMutation } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      refetch();
      // add notification
    },
  });

  const handleDelete = (userId: number) => {
    deleteUserMutation(userId);
  };

  return (
    isPending ? (
      <CircularProgress />
    ) : (
      <UserList
        users={users}
        onDelete={handleDelete}
      />)
  );
}

export default UserDashboard;