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

const getRotab = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/lookups/rotab-shmasya`
  );
  const data = await response.json();
  return data;
};

const getAsakfaNames = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/lookups/asakfa`
  );
  const data = await response.json();
  return data;
};

const getChurchNames = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/lookups/church`
  );
  const data = await response.json();
  return data;
};

const getAllCountries = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/lookups/country`
  );
  const data = await response.json();
  return data;
};

const getCitiesByCountryId = async (countryId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/lookups/mohafzat?countryId=${countryId}`
  );
  const data = await response.json();
  return data;
};

const getManateqByCityId = async (cityId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/lookups/mant2a?mohafza=${cityId}`
  );
  const data = await response.json();
  return data;
};

export {
  getmara7el,
  getsneen,
  getRotab,
  getAsakfaNames,
  getChurchNames,
  getAllCountries,
  getCitiesByCountryId,
  getManateqByCityId,
};
