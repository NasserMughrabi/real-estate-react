const API_BASE_URL = "http://localhost:8080"; // Replace with your Spring Boot backend URL

// Function to fetch all users
const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; // Return empty array or handle error as needed
  }
};

// Function to fetch a user by ID
const getUserById = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    if (!response.ok) {
      throw new Error("User not found");
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
    console.log("User created successfully");
    const createdUser = await response.json();
    return createdUser;
  } catch (error) {
    console.error("Error creating user:", error);
    // Handle error as needed
  }
};

// Function to delete a user by ID
const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
    console.log("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    // Handle error as needed
  }
};

// Function to fetch all listings for a user by user ID
const getListingsForUser = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/listings`);
    if (!response.ok) {
      throw new Error("Failed to fetch listings for user");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching listings for user with ID ${userId}:`, error);
    return []; // Return empty array or handle error as needed
  }
};

// Function to fetch a specific listing for a user by user ID and listing ID
const getListingForUser = async (userId, listingId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/users/${userId}/listings/${listingId}`
    );
    if (!response.ok) {
      throw new Error("Listing not found");
    }
    return await response.json();
  } catch (error) {
    console.error(
      `Error fetching listing with ID ${listingId} for user with ID ${userId}:`,
      error
    );
    return null; // Return null or handle error as needed
  }
};

// Function to create a new listing for a user
const createListingForUser = async (userId, listing) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/listings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listing),
    });
    if (!response.ok) {
      throw new Error("Failed to create listing for user");
    }
    console.log("Listing created successfully");
  } catch (error) {
    console.error(`Error creating listing for user with ID ${userId}:`, error);
    // Handle error as needed
  }
};

export {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  getListingsForUser,
  getListingForUser,
  createListingForUser,
};
