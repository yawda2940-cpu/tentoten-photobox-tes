export type PageId = 'home' | 'product' | 'service' | 'location' | 'contact';

export type BranchId = 'madiun' | 'jombang' | 'ponorogo' | 'kertosono';

export interface BranchInfo {
  id: BranchId;
  name: string;
  cafeName: string;
  tagline: string;
  tag: string;
  code: string;
  regency: string;
  address: string;
  addressDirections: string;
  hours: string;
  hoursDetailed: string;
  status: string;
  googleMapsUrl: string;
  mapImage: string;
  indoorCornerText: string;
  images: {
    title: string;
    description: string;
    url: string;
    alt: string;
  }[];
  priceStandard: string;
  priceCustom: string;
}
