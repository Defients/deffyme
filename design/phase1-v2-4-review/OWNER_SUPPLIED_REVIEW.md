# Owner-supplied V2.3 review

Received October 11, 2026. The following review is preserved as supplied. Its checkout observations describe the reviewer's session, not the later V2.4 task-start checkout.

---

I'll check the repo state and confirm the V2.3 handoff package exists before I review the images.

Package is present and uncommitted. Looking at the evidence images directly.

My verdict is **REFINE VISUALS AGAIN**. V2.3 fixes the digital look, and the gold signal now runs through the machine itself. But two problems block owner acceptance: the brighter violet now swallows Defdef, and in idle nothing visibly connects his paw or claw to the machine.

I looked at the images myself: the 1440 idle, inspection and both pose plates, the 390/320 before-and-after comparisons, the 390 pointing and 320 settled full pages, and the state board. I changed no files and didn't rerun `verify-v2-3.mjs`. The only uncommitted items are `design/phase1-v2-3-handoff/` and `docs/OPUS_5_5_VISUAL_DIRECTION_HANDOFF_V2_3.md`, on `main` at `8d04262`.

## What visibly improved

- **It reads as digital now.** The red break is square blocks built into the art, near the top of the right pillar. It reads as corrupted signal, not a lava crack, and nothing is pasted over it.
- **The gold signal is inside the machine.** On inspection, the actual pipe lights up and glows onto nearby surfaces. The old thin line drawn on top is gone.
- **Inspection is a real change.** The red blocks turn amber and the pipe lights, so the frame differs from idle in the art, not just the text.
- **Mobile works.** At 390 and 320, the crown, full body, platform, pipe and break all fit in one frame, and the text and links stay in normal page order below.
- **Defdef matches his surroundings better.** The environment's hard edges and violet reflections are closer to his drawing style than V2.2's painted stone.

## Smallest remaining fixes

**Look and materials**

1. **Defdef blends in.** His violet outline and mane sit against the brightest neon column, directly behind his head. V2.2 had him popping against dark stone; here he's camouflaged. Darken and desaturate the area right behind his outline (about 30–40% less brightness and colour there), and keep the neon on the distant channels. This is now a bigger problem than the fantasy look.
2. **Some castle vocabulary is left.** The arched bridge spans in the mid-left background still read as an aqueduct; swap them for flat beams or trusses. The jagged black shards on the left are acceptable but busy, so cut them back.
3. **The crown competes with the gold pipe.** In the lit states, his gold crown sits in front of the lit gold column. Move that vertical run, or darken behind the crown, so the crown stays his own mark.

**The idle input**

4. **The input is on the wrong side.** The pipe comes down to the platform on the viewer's right, past him. The canonical claw is on the viewer's left. Nothing in idle shows him touching or holding anything.
   - **Option A:** put a dim socket by the claw on the left side.
   - **Option B:** route the pipe to wherever a limb already sits in the default pose.

   Either way, it must be one continuous run from the red break to that point, without redrawing his anatomy.

**Layout and page structure**

5. **Header changes from V2.2:**
   - The **Connect ↗** link was dropped from the header.
   - **"Still & complete"** is now plain text that looks like a button.

   Confirm both are intended.
6. **The art panel grows when inspection opens**, pushing the route row down by roughly 16 px at 1440. That's acceptable because the visitor caused it, but the build should either reserve that height or accept the shift on purpose.
7. **Copy (yours to decide):** "One operating point. One contained interruption." reads like design-brief wording, not site copy.

## Smug versus pointing

**Pointing**, for now. The handoff says smug is preferred only if idle control is solved on its own, and it isn't (fix 4).

- **Pointing** (`ack-pointing-1440.png`, `ack-pointing-390-full.png`) is the only frame where control looks causal: his hand aims at the lit pipe. At 390 the fingertip stops about a hand's width short of it, so place the socket at that bend to avoid a gesture into empty space.
- **Smug** (`ack-smug-1440.png`) has the stronger relaxed authority, with arms crossed and the stance unchanged, but it says nothing about what he controls.
- If fix 4 lands and viewer testing shows people read idle control unaided, revisit smug.

## Missing evidence for the visual gate

- No **1920 or 768** captures. The gate asks for 1920/1440/768/390/320, and the red break sits right at the frame edge at 1440, so wider and middle widths need checking.
- No recorded **pose height and floor-anchor measurement**. The ≤2 px requirement is untested; by eye the two poses match.
- No **viewer test** yet (the 4-of-5 criterion).

Nothing is implemented, committed, pushed or deployed, and Crown Observatory stays closed. Only the review text above is new; I can save it alongside the V2.3 handoff if you want it on file.

---

## V2.4 task-start reconciliation

The owner delegated the next-step choice; a separate V2.4 visual study was selected. At task start, the checkout was clean at `8a24117d4e06818a48a09840a70db3a7de74e0d1`, which commits the V2.3 handoff. Running its existing verifier before V2.4 additions returned PASS: 361 baseline files and 65 handoff files. Neither historical verifier nor V2.3 evidence was rewritten.

The existing V2.3 render report already records character height and bottom for every captured state: 1440 and 390 have zero spread; at 320 height spread is 0.015625 px and bottom spread is zero. This closes that measurement gap for those three widths, while 1920/768 and viewer testing were still missing.

Fresh read-only 1440 measurements confirm the **stage** grows from 650 to 666.1875 px and routes move down 16.1875 px on inspection; the art layer remains 810.421875 px tall. The next study reserves state height deliberately. V2.2 already used a plain-text `Still & complete` span; V2.3 omitted its adjacent Connect anchor. The next study restores Connect and keeps static-status text visually subordinate.
