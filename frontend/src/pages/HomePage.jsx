import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/clerk-react'
import React from 'react'
import toast from 'react-hot-toast';

function HomePage() {
  
  return (
    <div>

       <button className='btn btn-primary' onClick={() => toast.success("Success")}>Click</button>
      <SignedOut>
        <SignInButton mode='modal'>
            <button>Login</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn>
    </div>
  )
}

export default HomePage;
