export const CardRarity = {
  Common: "COMMON",
  Rare: "RARE",
  Epic: "EPIC",
  Legendary: "LEGENDARY",
} as const;

export type CardRarity = (typeof CardRarity)[keyof typeof CardRarity];

export const CardFoil = {
  Regular: "REGULAR",
  Gold: "GOLD",
} as const;

export type CardFoil = (typeof CardFoil)[keyof typeof CardFoil];

export const MarketListingType = {
  Sell: "SELL",
  Rent: "RENT",
} as const;

export type MarketListingType =
  (typeof MarketListingType)[keyof typeof MarketListingType];

export const MarketListingStatus = {
  Listed: "LISTED",
  Rented: "RENTED",
} as const;

export type MarketListingStatus =
  (typeof MarketListingStatus)[keyof typeof MarketListingStatus];
