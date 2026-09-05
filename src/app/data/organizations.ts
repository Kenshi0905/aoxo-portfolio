export const organizations = {
  nic: { name: 'National Informatics Centre', src: '/images/organizations/nic.png' },
  wordsmith: { name: 'KIIT Wordsmith Society', src: '/images/organizations/wordsmith.png' },
  kfs: { name: 'KIIT Film Society', src: '/images/organizations/kfs.png' },
  factlens: { name: 'FactLens', src: '/images/projects/factlens.png' },
  openai: { name: 'OpenAI', src: '/images/organizations/openai.png' },
};
export type OrganizationId = keyof typeof organizations;
