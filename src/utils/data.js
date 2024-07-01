const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
  },
];

const listings = [
  {
    id: 1,
    address: "123 Maple Street",
    description: "A beautiful 3-bedroom house in a quiet neighborhood.",
    price: 350000.0,
    user: {
      id: 1,
      name: "John Doe",
    },
  },
  {
    id: 2,
    address: "456 Oak Avenue",
    description: "Modern apartment with city views and close to amenities.",
    price: 250000.0,
    user: {
      id: 2,
      name: "Jane Smith",
    },
  },
  {
    id: 3,
    address: "789 Pine Lane",
    description: "Spacious family home with a large backyard and pool.",
    price: 450000.0,
    user: {
      id: 1,
      name: "John Doe",
    },
  },
  {
    id: 4,
    address: "101 Elm Drive",
    description: "Cozy bungalow perfect for first-time buyers.",
    price: 200000.0,
    user: {
      id: 3,
      name: "Alice Johnson",
    },
  },
  {
    id: 5,
    address: "202 Birch Road",
    description: "Luxury villa with stunning views and high-end finishes.",
    price: 950000.0,
    user: {
      id: 2,
      name: "Jane Smith",
    },
  },
];

export {users, listings}
