import { ability, getCurrentOrg } from "@/auth/auth"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { getMembers } from "@/http/get-members"
import { getMembership } from "@/http/get-membership"
import { getOrganization } from "@/http/get-organization"
import { organizationSchema } from "@saas/auth"
import { ArrowLeftRight, Crown } from "lucide-react"
import Image from "next/image"

export async function MemberList() {
    const currentOrg = await getCurrentOrg()
    const permissions = await ability()

    const [{ membership }, { members }, { organization }] = await Promise.all([
        getMembership(currentOrg!),
        getMembers({ org: currentOrg! }),
        getOrganization({ org: currentOrg! })
    ])

    const authOrganization = organizationSchema.parse(organization)
    return (
        <div className="space-y-2">
            <h2 className="text-lg font-semibold">Members</h2>

            <div className="rounded border">
                <Table>
                    <TableBody>
                        {members.map(member => {
                            return (
                                <TableRow key={member.id}>
                                    <TableCell className="py-2.5" style={{ width: 40 }}>
                                        <Avatar>
                                            <AvatarFallback />
                                            {member.avatarUrl && (
                                                <Image src={member.avatarUrl} width={32} height={32} alt="" className="aspect-square" />
                                            )}
                                        </Avatar>
                                    </TableCell>

                                    <TableCell className="py-2.5">
                                        <div className="flex flex-col">
                                            <span className="font-medium inline-flex items-center gap-2">
                                                {member.name}
                                                {member.userId === membership.userId && ' (me)'}
                                                {member.userId === organization.ownerId && (
                                                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Crown className="size-3" /> Owner</span>
                                                )}
                                            </span>
                                            <span className="text-xs text-muted-foreground">{member.email}</span>
                                        </div>
                                    </TableCell>

                                    <TableCell className="py-2.5">
                                        <div className="flex items-center justify-end gap-2">
                                            {permissions?.can('transfer_ownership', authOrganization) && (

                                                <Button size="sm" variant="ghost">
                                                    <ArrowLeftRight className="size-4 mr-2" />
                                                    Transfer ownership
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}