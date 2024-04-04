'use client'
import Image from "next/image";
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useCounterContract } from '../hooks/useCounterContract';

export  default  function Home1() {
  const { value, address } = useCounterContract();
  return (
   <main className="flex min-h-screen flex-col items-center justify-between p-24">
   <div className='App'>
      <div className='Container'>
        <TonConnectButton />

        <div className='Card'>
          <b>Counter Address</b>
          <div className='Hint'>{address?.slice(0, 30) + '...'}</div>
        </div>

        <div className='Card'>
          <b>Counter Value</b>
          <div>{value ?? 'Loading...'}</div>
        </div>
      </div>
    </div>
      </main>
  );
}
