const getmara7el = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/lookups/mara7l`
  );
  const data = await response.json();
  return data;
};

const getsneen = async (mar7alaId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/lookups/sanawat?mar7la=${mar7alaId}`
  );
  const data = await response.json();
  return data;
};

export { getmara7el, getsneen };
