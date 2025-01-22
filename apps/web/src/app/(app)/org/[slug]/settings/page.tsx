import { ability, getCurrentOrg } from "@/auth/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OrganizationForm } from "../../organization-form"
import { ShutdownOrganizationButton } from "./shutdown-organization-button"
import { getOrganization } from "@/http/get-organization"

export default async function Settings() {
    const currentOrg = await getCurrentOrg()
    const permissions = await ability()

    const canUpdateOrganization = permissions?.can('update', 'Organization')
    const canGetBilling = permissions?.can('get', 'Billing')
    const canShutdownOrganization = permissions?.can('delete', 'Organization')

    const { organization } = await getOrganization({ org: currentOrg! })
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Settings</h1>

            <div className="space-y-4">
                {canUpdateOrganization && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Organization settings</CardTitle>
                            <CardDescription>Update your organization details.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <OrganizationForm isUpdating initialData={organization} />
                        </CardContent>
                    </Card>
                )}


                {canGetBilling && (
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Billing</CardTitle>
                                <CardDescription>Manage your billing information</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Coming soon</p>
                            </CardContent>
                        </Card>
                    </div>
                )}


                {canShutdownOrganization && (
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Shutdown Organization</CardTitle>
                                <CardDescription>This will delete organization data including all projects. You cannot undo this action.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ShutdownOrganizationButton />
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}
