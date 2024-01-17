class CodeDto {
  id: string;
  name: string;
  type: string;

  constructor(code?: CodeDto) {
    this.id = code?.id ?? "";
    this.name = code?.name ?? "";
    this.type = code?.type ?? "";
  }
}

export { CodeDto };
