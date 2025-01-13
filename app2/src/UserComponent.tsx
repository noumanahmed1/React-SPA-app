import React, { useState, useEffect, useCallback, useMemo } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Use useEffect to trigger data fetch on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoize the processed data for rendering
  const processedUserList = useMemo(() => {
    return users.map((user) => ({
      id: user.id,
      displayName: `${user.name} (${user.email})`,
    }));
  }, [users]);

  // Memoize the rendered list to avoid unnecessary recalculations
  const userList = useMemo(() => {
    return processedUserList.map((user) => (
      <li key={user.id}>{user.displayName}</li>
    ));
  }, [processedUserList]);

  // Handle loading and error states
  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section>
      <h2>Users List</h2>
      <ul>{userList}</ul>
    </section>
  );
};

export default UserList;
