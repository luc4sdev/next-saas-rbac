import { api } from './api-client'

interface GetOrganizationRequest {
    org: string;
}

interface GetOrganizationResponse {
    organization: {
        slug: string;
        id: string;
        name: string;
        domain: string | null;
        shouldAttachUsersByDomain: boolean;
        avatarUrl: string | null;
        createdAt: string;
        updatedAt: Date;
        ownerId: string;
    }
}
export async function getOrganization({ org }: GetOrganizationRequest) {
    const result = await api.get(`organizations/${org}`).json<GetOrganizationResponse>()
    return result
}