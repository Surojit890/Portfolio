import SingularityBackground from './SingularityBackground';

const Background = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-[-1]">
      <SingularityBackground
        hue={217}
        saturation={1}
        brightness={0.8}
        speed={0.5}
        mouseSensitivity={0.5}
        damping={0.9}
      />
    </div>
  );
};

export default Background;
