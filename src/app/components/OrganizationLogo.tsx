import { organizations, type OrganizationId } from '../data/organizations';

export function OrganizationLogo({ id, decorative = false }: { id: OrganizationId; decorative?: boolean }) {
  const organization = organizations[id];
  return <span className={`organization-logo organization-${id}`}><img src={organization.src} alt={decorative ? '' : `${organization.name} logo`} decoding="async" /></span>;
}
