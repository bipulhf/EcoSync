export default function isInstanceOfCustomError(error: any): boolean {
  return (
    error instanceof InvalidAccess ||
    error instanceof ResourceNotFound ||
    error instanceof InvalidType ||
    error instanceof InvalidCredentials
  );
}
