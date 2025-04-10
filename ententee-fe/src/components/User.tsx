import UserList from './UserList';
import { User } from './types';

// Sample user data
const sampleUsers = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    age: 25,
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    age: 35,
  },
  {
    id: 3,
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@example.com',
    age: 45,
  }
];

const UserDashboard = () => {
  const handleEdit = (user: User) => {
    console.log('Edit user:', user);
  };

  const handleDelete = (userId: number) => {
    console.log('Delete user with ID:', userId);
  };

  return (
    <UserList
      users={sampleUsers}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}

export default UserDashboard;