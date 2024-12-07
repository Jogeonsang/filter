import { useMediaQuery } from 'react-responsive';

function useDevice() {
  const isDesktop: boolean = useMediaQuery({
    query: '(min-width:1024px)',
  });
  const isTablet: boolean = useMediaQuery({
    query: '(min-width:768px) and (max-width:1023px)',
  });
  const isMobile: boolean = useMediaQuery({
    query: '(max-width:767px)',
  });

  return { isDesktop, isTablet, isMobile };
}

export default useDevice;
