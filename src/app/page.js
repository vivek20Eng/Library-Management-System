"use client"; 

import { useRouter } from 'next/navigation';  
import { useEffect } from 'react';
import Login from '../Component/Login/Login';
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);

  return (
    <div>
      <Login />
    </div>
  );
}
