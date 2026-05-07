import { useLoading } from '../context/LoadingContext';
import './LoadingBar.css';

function LoadingBar() {
  const { isLoading } = useLoading();

  return (
    <div className={`loading-bar ${isLoading ? 'active' : ''}`}></div>
  );
}

export default LoadingBar;
