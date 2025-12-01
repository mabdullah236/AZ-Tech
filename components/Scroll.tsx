import React, { useEffect } from 'react';

function Scroll(props: { setScrolled: (val: boolean) => void }) {
  useEffect(() => {
    const handleScroll = () => {
      props.setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [props]);

  return null;
}

export default Scroll;
