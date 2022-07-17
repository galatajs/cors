export const getFieldIsExists = <T, R>(
  obj: T | undefined,
  field: string,
  def: R
): R => {
  if (!!obj && obj[field]) return obj[field];
  return def;
};
