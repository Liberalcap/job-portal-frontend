import './Skeleton.css';

export function SkeletonBox({ width = '100%', height = '20px', className = '' }) {
  return <div className={`skeleton-box ${className}`} style={{ width, height }}></div>;
}

export function JobCardSkeleton() {
  return (
    <div className="job-card-skeleton">
      <SkeletonBox width="70%" height="20px" />
      <SkeletonBox width="100%" height="16px" className="mt-2" />
      <SkeletonBox width="60%" height="16px" className="mt-2" />
      <div className="skeleton-footer">
        <SkeletonBox width="40%" height="36px" />
        <SkeletonBox width="30%" height="24px" />
      </div>
    </div>
  );
}

export function JobsListSkeleton() {
  return (
    <div className="jobs-skeleton-container">
      {[...Array(6)].map((_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="hero-skeleton">
      <SkeletonBox width="60%" height="48px" className="mb-4" />
      <SkeletonBox width="80%" height="24px" className="mb-6" />
      <SkeletonBox width="100%" height="50px" />
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="stats-skeleton">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="stat-skeleton-card">
          <SkeletonBox width="80%" height="32px" className="mb-2" />
          <SkeletonBox width="60%" height="16px" />
        </div>
      ))}
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="categories-skeleton">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="category-skeleton-card">
          <SkeletonBox width="60px" height="60px" className="mb-3" />
          <SkeletonBox width="80%" height="18px" className="mb-2" />
          <SkeletonBox width="60%" height="14px" />
        </div>
      ))}
    </div>
  );
}
