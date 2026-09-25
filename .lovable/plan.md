# Four-module Visual Guide

## Build
- Make the **Visual Guide** card open a dedicated in-app guide.
- Add four modules matching the supplied references:
  1. **What are the tiles?** — Bamboo, Characters, Dots, Winds, Dragons, and Flowers/Seasons.
  2. **Melds & pairs** — selectable examples for Pung, Chow, Kong, Mixed Chow, Crotchet, Standard Pair, and Knit Pair.
  3. **Claim priority** — selectable Mahjong, Kong/Pung, and Chow rules with claim eligibility.
  4. **The Charleston** — three selectable passing stages with seating direction and sample tiles.
- Use Mahjong Circle’s red, white/ivory, ink, and hairline-border design, optimized for the existing phone view.
- Keep the second **Your first tile move** card unchanged for now.

## Technical details
- Add one nested guide screen under the existing Learn Mahjong flow.
- Reuse the app’s illustrated mahjong tile component and add only the tile variants needed by the guide.
- Include Back/Exit navigation and unique page metadata.
- Verify module switching and phone-size rendering in the live preview.
