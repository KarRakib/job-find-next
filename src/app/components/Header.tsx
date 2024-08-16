
import Link from "next/link";
import { getSignInUrl, getSignUpUrl, getUser, signOut } from '@workos-inc/authkit-nextjs';
import { addOrgAndUserData, JobModel } from "../models/Job";
export default async function Header() {

  const { user } = await getUser();
  console.log(user);
  const latestJobs = await addOrgAndUserData(
    await JobModel.find({}, {}, { limit: 5, sort: '-createdAt' }),
    user,
  );
const admin = latestJobs[0].isAdmin

  const signInUrl = await getSignInUrl()
  const email = user?.email || '';
  console.log('header email', email);
  
  return (
    <header>
      <div className="container flex items-center justify-between mx-auto my-4">
        <Link href={'/'} className="font-bold text-xl">Job Board</Link>
        <nav className="flex gap-2">
          {!user && (
            <Link className="rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4" href={signInUrl}>
              Login
            </Link>
          )}
          {user && (
            <>

              <form action={async () => {
                'use server';
                await signOut();
              }}>
                <button type="submit" className="rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4">
                  Logout
                </button>
              </form>
              {!admin &&<Link className="rounded-md py-1 px-2 sm:py-2 sm:px-4 bg-rose-600 text-white" href={`/applied-favorite/${encodeURIComponent(email)}`}>
                Applied / <span className="">Favorites</span>
              </Link>}

            </>
          )}
          <Link className="rounded-md py-1 px-2 sm:py-2 sm:px-4 bg-blue-600 text-white" href={'/add-job'}>
            Post a job
          </Link>
        </nav>
      </div>
    </header>
  );
}