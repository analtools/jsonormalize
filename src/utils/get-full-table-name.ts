export function getFullTableName({
  tableName,
  schemaName,
}: {
  tableName: string;
  schemaName?: string | undefined;
}): string {
  if (schemaName !== undefined) {
    return `${schemaName}.${tableName}`;
  }
  return tableName;
}
