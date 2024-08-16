import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

export default authkitMiddleware();

export const config ={matcher:['/', '/add-job','/add-job/:orgId*','/new-company','/jobs/:orgId*','/show/:id*','/api/jobs','/applied-favorite/:email*']}