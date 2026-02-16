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

export interface MarketListing {
  cardId: string;
  cardDetailId: number;
  gold: boolean;
  bcx: number;
  marketListingPrice: number;
  marketListingType: MarketListingType;
}

export interface CardInstance {
  player: string;
  cardId: string;
  cardDetailId: number;
  gold: boolean;
  edition: number;
  bcx: number;
  marketListingPrice: number | null;
  marketListingType: MarketListingType | null;
  marketListingStatus: MarketListingStatus | null;
}

export interface CardVariant {
  cardDetailId: number;
  bcx: number;
  // TODO: Update to account for new foil types
  gold: boolean;
  edition: number;
  rarity: CardRarity;
}

export interface CardVariantGroup {
  variant: CardVariant;
  cards: CardInstance[];
}
