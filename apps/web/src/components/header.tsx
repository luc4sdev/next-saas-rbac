import rocketseatIcon from '@/assets/rocketseat-icon.svg'
import Image from 'next/image'
import { ProfileButton } from './profile-button'
import { Slash } from 'lucide-react'
import { OrganizationSwitcher } from './organization-switcher'
import { ability } from '@/auth/auth'
import { Separator } from './ui/separator'
import { ThemeSwitcher } from './theme/theme-switcher'
import { ProjectSwitcher } from './project-switcher'
import { PendingInvites } from './pending-invites'

export async function Header() {

    const permissions = await ability()

    return (
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
            <div className="flex items-center gap-3">
                <Image src={rocketseatIcon} className='size-6 dark:invert' alt='Icon' />

                <Slash className='size-3 -rotate-[24deg] text-border' />

                <OrganizationSwitcher />

                {permissions?.can('get', 'Project') && (
                    <>
                        <Slash className='size-3 -rotate-[24deg] text-border' />
                        <ProjectSwitcher />
                    </>
                )}
            </div>

            <div className='flex items-center gap-4'>
                <PendingInvites />
                <ThemeSwitcher />
                <Separator orientation='vertical' className='h-5' />
                <ProfileButton />
            </div>
        </div>
    )
}