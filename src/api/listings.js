const API_BASE_URL = 'http://localhost:8080';

// Function to fetch all listings
const getAllListings = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/listings`);
    if (!response.ok) {
      throw new Error('Failed to fetch listings');
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
};

// Function to delete a listing by ID
const deleteListingById = async (listingId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/listings/${listingId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete listing');
    }
    console.log('Listing deleted successfully');
  } catch (error) {
    console.error('Error deleting listing:', error);
    // Handle error as needed
  }
};

export { getAllListings, deleteListingById };
