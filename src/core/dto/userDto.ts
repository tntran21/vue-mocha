interface IUser {
  id?: string;
  name?: string;
  email?: string;
  address?: string | null;
  phone?: string | null;
  code?: string | null;
}

class UserDto {
  id: string;
  name: string;
  email: string;
  code: string;
  address: string | null;
  phone: string | null;

  constructor(user?: IUser) {
    this.id = user?.id ?? "";
    this.name = user?.name ?? "";
    this.email = user?.email ?? "";
    this.code = user?.code ?? "";
    this.address = user?.address ?? null;
    this.phone = user?.phone ?? null;
  }
}

export { UserDto, IUser };
