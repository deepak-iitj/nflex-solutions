/**
 * Client logos for the "Our Clients" section on the home page.
 */
export interface Client {
  name: string;
  logoUrl?: string;
}

export const clients: Client[] = [
  { name: "Tata Motors", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Tata_Motors_Logo.svg/250px-Tata_Motors_Logo.svg.png" },
  { name: "Reliance Industries", logoUrl: "https://rilstaticasset.akamaized.net/sites/default/files/2022-09/reliance-industries-logo-blk.png" },
  { name: "Mahindra", logoUrl: "https://www.mahindra.com//sites/default/files/2025-07/mahindra-red-logo.webp" },
  { name: "L&T", logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Larsen%26Toubro_logo.svg/120px-Larsen%26Toubro_logo.svg.png" },
  { name: "Adani Group", logoUrl: "https://www.adani.com/-/media/project/adaniv1/logo/adani-logo.svg" },
  { name: "JSW Steel", logoUrl: "https://www.jsw.in/wp-content/themes/JSWGroup/images/JSW_Group_Logo.png" },
  { name: "Bharat Forge", logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/4/48/Bharat_Forge_Logo.svg/250px-Bharat_Forge_Logo.svg.png" },
  { name: "Maruti Suzuki", logoUrl: "https://www.marutisuzuki.com/adobe/assets/urn:aaid:aem:791b5601-4cfa-4b0f-a77b-ec588eba84ad/as/Maruti-suzuki_logo_v1.svg" },
];
