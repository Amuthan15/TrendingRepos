import React, { useState, useEffect, useCallback } from 'react';
import { fetchRepos } from './utils/api';
import RepoItem from './components/RepoItem';
import useInfiniteScroll from './hooks/useInfiniteScroll';
import './App.css';
import { FaStar, FaCog } from 'react-icons/fa';



const App = () => {
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [date] = useState(new Date(Date.now() - 10 * 24 * 60 * 60 * 1000));
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    const newRepos = await fetchRepos(page, date);
    setRepos(prev => [...prev, ...newRepos]);
    setPage(prev => prev + 1);
    setLoading(false);
  }, [page, date, loading]);

  useInfiniteScroll(loadMore);

  useEffect(() => {
    loadMore();
  }, []);

return (
  <div className="app">
    <h1>Trending Repos</h1>
    
    {repos.map(repo => <RepoItem key={repo.id} repo={repo} />)}
    
    {loading && <p>Loading...</p>}

   <div className="bottom-nav">
  <div className="nav-item active">
    <FaStar size={20} />
    <span>Trending</span>
  </div>
  <div className="nav-item">
    <FaCog size={20} />
    <span>Settings</span>
  </div>
</div>
  </div>
);
};


export default App;
