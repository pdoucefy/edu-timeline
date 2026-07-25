'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/fr');
  }, [router]);

  return null;
};

// eslint-disable-next-line import/no-default-export
export default NotFound;
