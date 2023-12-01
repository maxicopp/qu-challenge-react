export const getResidentNames = async (urls: string[]): Promise<string[]> => {
  const names = await Promise.all(
    urls.map(async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return data.name;
    })
  );
  return names;
};
