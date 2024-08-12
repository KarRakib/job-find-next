
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getUser } from '@workos-inc/authkit-nextjs';
import Link from 'next/link';
import React from 'react'
import { WorkOS } from '@workos-inc/node'
import { createCompany } from '../actions/workosActions';
const page = async () => {
  const { user } = await getUser();
  const workos = new WorkOS(process.env.WORKOS_API_KEY)
  const hanldeData = async (data: FormData) => {
    'use server'
   if(user){
    await createCompany(data.get('newCompanyName') as string, user?.id)
   }
  }

  // console.log(workos);
  // let organizationMemberships:AutoPaginatable<OrganizationMembership>={};

  const organizationMemberships = await workos.userManagement.listOrganizationMemberships({
    userId: user?.id,
  });



  if (!user) {
    return (
      <div className="container">
        <div>You need to be logged in to post a job</div>
      </div>
    );
  }

  // const organizationMemberships = await workos.userManagement.listOrganizationMemberships({
  //   userId: user.id,
  // });

  const activeOrganizationMemberships = organizationMemberships.data.filter(om => om.status === 'active');
  // console.log('active',activeOrganizationMemberships);
  
  const organizationsNames:{[key: string]: string} = {};

  // console.log('organizationa', JSON.stringify(organizationsNames));
  
  for (const activeMembership of activeOrganizationMemberships) {
    const organization = await workos.organizations.getOrganization(activeMembership.organizationId);
    organizationsNames[organization.id] = organization.name;
  }


  if (user) {
    return (
      <div className="container">
        <div>
  
          <h2 className="text-lg mt-6">Your companies</h2>
          <p className="text-gray-500 text-sm mb-2">Select a company to create a job add for</p>
          <div>
            <div className="border inline-block rounded-md">
              {Object.keys(organizationsNames).map(orgId => (
                  <Link
                    href={'/add-job/' + orgId}
                    className={
                      "py-2 px-4 flex gap-2 items-center "
                      + (Object.keys(organizationsNames)[0] === orgId ? '' : 'border-t')
                    }>
                    {organizationsNames[orgId]}
                    <FontAwesomeIcon className="h-4" icon={faArrowRight} />
                  </Link>
                ))}
            </div>
          </div>
  
          {organizationMemberships.data.length === 0 && (
              <div className="border border-blue-200 bg-blue-50 p-4 rounded-md">
                No companies found assigned to your user
              </div>
            )}
       
          <Link
            className="inline-flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md mt-6"
            href={'/new-company'}>
            Create a new company
            <FontAwesomeIcon className="h-4" icon={faArrowRight} />
          </Link>
        </div>
      </div>
    )
  }
}

export default page