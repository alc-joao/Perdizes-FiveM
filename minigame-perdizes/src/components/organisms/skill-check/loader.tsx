'use client';
import dynamic from 'next/dynamic';

// dynamic(..., { ssr: false }) só pode ser chamado a partir de um Client
// Component — por isso esse wrapper fica separado do index.tsx (que é
// importado por Server Components como src/app/page.tsx).
export const SkillCheckClient = dynamic(() => import('./index').then((m) => m.SkillCheck), {
  ssr: false,
});
