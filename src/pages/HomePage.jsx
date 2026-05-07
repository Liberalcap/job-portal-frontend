import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";
import { HeroSkeleton, StatsSkeleton, CategorySkeleton } from "../components/Skeleton";
import "./Home.css";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { isLoading } = useLoading();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?search=${searchQuery}`);
    }
  };

  if (isLoading) {
    return (
      <div className="home-container">
        <section className="hero-section">
          <div className="hero-content">
            <HeroSkeleton />
          </div>
        </section>
        <section className="stats-section">
          <StatsSkeleton />
        </section>
        <section className="featured-section">
          <CategorySkeleton />
        </section>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-heading">Find Your Dream Job</h1>
          <p className="hero-subtitle">
            Discover amazing career opportunities and connect with top employers
          </p>
          
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search jobs, companies, positions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="stats-section">
        <div className="stat-card">
          <div className="stat-number">10K+</div>
          <div className="stat-label">Job Openings</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">5K+</div>
          <div className="stat-label">Companies</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">50K+</div>
          <div className="stat-label">Happy Candidates</div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section">
        <h2 className="section-heading">Browse Job Categories</h2>
        <div className="categories-grid">
          <div className="category-card">
            <div className="category-icon">💻</div>
            <h3>Technology</h3>
            <p>2,500+ jobs</p>
          </div>
          <div className="category-card">
            <div className="category-icon">📊</div>
            <h3>Business</h3>
            <p>1,800+ jobs</p>
          </div>
          <div className="category-card">
            <div className="category-icon">🎨</div>
            <h3>Design</h3>
            <p>1,200+ jobs</p>
          </div>
          <div className="category-card">
            <div className="category-icon">📱</div>
            <h3>Marketing</h3>
            <p>950+ jobs</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Find Your Next Opportunity?</h2>
          <p>Browse thousands of job listings from top companies</p>
          <button onClick={() => navigate('/jobs')} className="cta-button">
            Explore Jobs
          </button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;