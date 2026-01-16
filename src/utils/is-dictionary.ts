const simpleTypes = ["string", "number", "boolean"];

export function isDictionary(data: any) {
  return (
    Object(data) === data ||
    Object.values(data).every(
      (value) => value === null || simpleTypes.includes(typeof value),
    )
  );
}
