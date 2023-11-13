export class CreateProjectDto {
  readonly data: {
    readonly email: string;
    readonly projectName: string;
    readonly codeIn: string;
  };
}
