'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

function PostView({ post, onClose }: { post: Post; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto p-8">
      <button
        onClick={onClose}
        className="mb-4 text-gray-600 hover:text-gray-800 text-lg"
      >
        Back to Posts
      </button>
      <article className="max-w-4xl mx-auto text-gray-800">
        <h1 className="text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
        <p className="text-gray-600 mb-8 text-lg">
          {new Date(post.createdAt).toLocaleString()}
        </p>
        <div className="text-xl leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </article>
    </div>
  );
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    // Check for existing login
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      const user = JSON.parse(userData);
      setIsLoggedIn(true);
      setUser(user.username);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuOpen && !(event.target as Element).closest('.menu-container')) {
        setMenuOpen(false);
      }
      if (loginOpen && !(event.target as Element).closest('.login-container')) {
        setLoginOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen, loginOpen]);

  const fetchPosts = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/posts');
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      setPosts(data.data || []);
    } catch (err) {
      setError('Error loading posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:4000/api/posts/${id}`);
      if (!res.ok) throw new Error('Failed to fetch post');
      const data = await res.json();
      setSelectedPost(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setIsLoggedIn(true);
      setUser(data.user.username);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setLoginOpen(false);
      setUsername('');
      setPassword('');
    } catch (err) {
      console.error('Login error:', err);
      alert(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    try {
      const res = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email: username, password }), // Using username as email for simplicity
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setIsLoggedIn(true);
      setUser(data.user.username);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setLoginOpen(false);
      setUsername('');
      setPassword('');
    } catch (err) {
      console.error('Registration error:', err);
      alert(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if (loading) return <div className="p-4 text-gray-800">Loading posts...</div>;
  if (selectedPost)
    return (
      <PostView post={selectedPost} onClose={() => setSelectedPost(null)} />
    );
  if (error) return <div className="p-4 text-gray-600">{error}</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Menu Button */}
      <div className="relative menu-container">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute top-4 left-4 z-10 p-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-800"
        >
          ☰
        </button>
        {menuOpen && (
          <div className="absolute top-12 left-4 z-10 bg-white border border-gray-300 rounded shadow-lg">
            <Link
              href="/"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>

      {/* Login Button */}
      <div className="relative login-container">
        <button
          onClick={() => isLoggedIn ? handleLogout() : setLoginOpen(!loginOpen)}
          className="absolute top-4 right-4 z-10 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
        >
          {isLoggedIn ? `Logout (${user})` : 'Login'}
        </button>
        {loginOpen && !isLoggedIn && (
          <div className="absolute top-12 right-4 z-10 bg-white border border-gray-300 rounded shadow-lg p-4 w-64">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Login</h3>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Username or Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 mb-2 border border-gray-300 rounded text-gray-800"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mb-3 border border-gray-300 rounded text-gray-800"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mb-2"
              >
                Login
              </button>
              <button
                type="button"
                onClick={handleRegister}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
              >
                Register
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto p-4 text-gray-800">
        <h1 className="text-3xl font-bold mb-6" style={{ color: '#E94F37' }}>
          All Posts
        </h1>

        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 border-gray-300 border rounded cursor-pointer hover:bg-gray-100 bg-white text-gray-800"
              onClick={() => handlePostClick(post.id)}
            >
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-600">
                {post.content.length > 100
                  ? post.content.substring(0, 100) + '...'
                  : post.content}
              </p>
              <small className="text-gray-400">
                {new Date(post.createdAt).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}