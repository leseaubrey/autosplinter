# Pricing Listing Strategy

Listing Frequency: Every 6 hours. This allows enough time for cards to be rented at their current price, preventing over-saturation of listings at lower price points.

Ladder width: Currently testing with 6 steps on the ladder, this should give a reasonable amount of steps to cater to fluctuations in price and give the strategy room to move up and down the pricing ladder.

## 1. No Cards Listed

- **Objective**: Begin price discovery by listing a card.
- **Action**: When the bot is first activated, it will list one card at the lowest current market rental price.
- **Challenge**: Occasionally, a card may be listed by another player at a significantly lower price, which could skew the initial pricing. A more robust system may be needed to determine the best starting price for new card listings.

## 2. Cards Listed, None Rented Scenario

- **Objective**: Address situations where cards are listed but not rented. This can indicate that the card is priced too high or cannot be rented at the current minimum (e.g., 1 DEC).
- **Action**: The bot will list a card at the next unlisted step down on the pricing ladder.
- **Future Considerations**: Although price reductions will initially be limited by the lower starting prices, future updates will include a de-listing function to better manage listings and allow for more flexible pricing adjustments.
- **Rationale**: By de-listing and re-pricing cards over time, the system will eventually align with market demand, providing more opportunities for rentals at optimal prices.

## 3. Cards Listed, All Rented Scenario

- **Objective**: Maximize rental income by increasing prices incrementally.
- **Action**: The bot will identify the highest-priced rented card in the inventory and list a new card at the next higher price point on the ladder.
- **Condition**: This step will only occur if no other cards are listed at the new price point and are unrented.
- **Rationale**: This strategy promotes price discovery by testing higher price points without risking oversaturation at any specific price tier.

## 4. Cards Listed, Some Rented Scenario

- **Objective**: Determine if the market has identified the top rental price for cards, and then fill in the pricing ladder efficiently
- **Action**: If some cards are rented, the bot will aim to maximize rental income by moving to the next price point on the ladder. Given that rentals are typically for 2-day periods, it's important to verify that no card is stuck in the middle of the pricing ladder (i.e., unrented). There may be a need to adjust prices downward by listing cards at fully rented steps.
- **Condition**: The bot will move to the next available price point in the ladder only if no cards are listed and unrented at that price.
- **Rationale**: This approach helps continue price discovery by testing higher price points while preventing oversaturation at any one price tier. Additionally, it ensures cards are efficiently listed at the optimal price for maximum rental potential.
