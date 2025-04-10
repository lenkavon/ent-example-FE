

import React, { useState, FormEvent } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Grid2 as Grid,
  Paper
} from '@mui/material';
import { User } from './types';

type UserFormData = Omit<User, 'id'>;

const UserForm: React.FC = () => {

  const onSubmit = (data: UserFormData) => {
    //TODO: handle form submission
    console.log('Form submitted:', data);
  }

  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    age: 15,
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.age) {
      newErrors.age = 'Age is required';
      if (formData.age <= 15) {
        newErrors.age = 'Age must be a greater than 15';
      }
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          User Registration
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                required
                id="firstName"
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                margin="normal"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                required
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                margin="normal"
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                required
                id="email"
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
              />
            </Grid>

          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserForm;