
import JobForm from '@/app/components/JobForm';
import { getUser } from '@workos-inc/authkit-nextjs';
import { WorkOS } from '@workos-inc/node';
import React from 'react'

type PageProps = {
    params: {
        id: string;
    }
}
const page = async (props: PageProps) => {
    const { user } = await getUser();
    const workos = new WorkOS(process.env.WORKOS_API_KEY);


    if (!user) {
        return 'Please log in';
    }
    const orgId = props.params.id;
    // console.log(orgId);

    const oms = await workos.userManagement.listOrganizationMemberships({ userId: user.id, organizationId: orgId });
    const hasAccess = oms.data.length > 0;
    if (!hasAccess) {
        return 'no access'
    }
    return (
        <JobForm orgId={orgId} />
    )
}

export default page