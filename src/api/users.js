const API_BASE_URL = 'http://localhost:8080'; // Replace with your Spring Boot backend URL

// Function to fetch all users
const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return []; // Return empty array or handle error as needed
  }
};

// Function to fetch a user by ID
const getUserById = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    if (!response.ok) {
      throw new Error('User not found');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    return null; // Return null or handle error as needed
  }
};

// Function to create a new user
const createUser = async (user) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    console.log('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
    // Handle error as needed
  }
};

// Function to delete a user by ID
const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    console.log('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    // Handle error as needed
  }
};

export { getAllUsers, getUserById, createUser, deleteUser };
