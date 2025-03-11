export type permissionCombinationType = Record<
  'action' | 'module' | 'submodule',
  { id: string; name: string }
>;
