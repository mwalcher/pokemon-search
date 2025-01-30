export type IsName = string;
export type IsUrl = string;

export type IsApiItemReference = {
  name: IsName;
  url: IsUrl;
};

export type IsNamesData = {
  language: IsApiItemReference;
  name: IsName;
}[];
