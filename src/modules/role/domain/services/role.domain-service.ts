export class RoleDomainService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async createRole(role: Role): Promise<Role> {
    // Business logic
    // El nombre de un rol solo lleva letras y espacios
    // El nombre tiene longitud máxima de 50 caracteres
    // El nombre tiene longitud mínima de 5 caracteres
    // El nombre no puede estar vacío
    // El nombre no puede ser nulo
    // El nombre no puede ser duplicado

    // La descripción de un rol solo lleva letras, números y espacios
    // La descripción tiene longitud máxima de 200 caracteres
    // La descripción tiene longitud mínima de 10 caracteres
    // La descripción no puede estar vacía
    // La descripción no puede ser nula

    const isRoleAvailable = await this.roleRepository.isRoleAvailable(role.name);

    if (!isRoleAvailable) {
      throw new RoleAlreadyExistsException();
    }

    const role = new Role(role);

    return this.roleRepository.createRole(role);
  }

  async getRoleById(id: string): Promise<Role> {
    return this.roleRepository.getRoleById(id);
  }
}
