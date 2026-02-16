import type { PriceLadder } from "../price-ladder";

/**
 * Returns the index of the ladder step on or below the target price. Otherwise returns 0.
 */
export const findStepIndexAtOrBelow = (
  targetPrice: number,
  ladder: PriceLadder,
): number => {
  if (ladder.length === 0) {
    return 0;
  }

  const filteredLadder = ladder.filter((step) => step.price <= targetPrice);

  return filteredLadder.length > 0 ? filteredLadder.length - 1 : 0;
};
