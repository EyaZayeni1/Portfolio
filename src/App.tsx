import { MotionConfig } from 'framer-motion';
import { Home } from './pages/Home';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme, toggleTheme } = useTheme();

  // reducedMotion="user": honour the OS "reduce motion" setting for every animation.
  return (
    <MotionConfig reducedMotion="user">
      <Home theme={theme} onToggleTheme={toggleTheme} />
    </MotionConfig>
  );
}

export default App;
