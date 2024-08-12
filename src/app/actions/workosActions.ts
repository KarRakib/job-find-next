'use server'
import { WorkOS } from "@workos-inc/node";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const workos = new WorkOS(process.env.WORKOS_API_KEY)

export async function createCompany (companyName:string, userId :string)  {
 "use server";
//  const newCompany =  data.get('newCompanyName') as string;
//  console.log('new company ', newCompany);
 
//  if (!newCompany || typeof newCompany !== 'string') {
//     throw new Error('Company New must be a valid string')
//  }
 const org = await workos.organizations.createOrganization({ name:companyName});
 await workos.userManagement.createOrganizationMembership({
    userId,
    organizationId:org.id,
    roleSlug: 'admin'
 });
 revalidatePath('/add-job')
 redirect('/add-job')
}