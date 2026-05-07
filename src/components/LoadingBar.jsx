import { useLoading } from '../context/LoadingContext';
import './LoadingBar.css';

function LoadingBar() {
  const { isLoading, progress } = useLoading();

  return (
    <div className={`loading-bar-container ${isLoading ? 'active' : ''}`}>
      <div 
        className="loading-bar"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

export default LoadingBar;
