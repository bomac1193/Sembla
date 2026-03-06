# What To Build

Date: 2026-03-06

## Core Recommendation

Do not build the entire monitoring, takedown, and detection stack first.

The easiest and strongest path is:

- build Sembla's governance and control layer in-house
- partner for web-scale monitoring, takedowns, and detection at the start
- only internalize the enforcement infrastructure later if volume justifies it

## What Sembla Should Build First

These are the pieces that are closest to the moat.

- `Likeness Passport`
- approval workflow
- usage scope and renewal logic
- restrictions and guardrails
- provenance / proof package
- violation case management
- internal rights ledger
- internal approval graph

Why these matter:

- this is where the proprietary value sits
- this is what is hardest to copy once the talent, contracts, and workflows exist
- this is the layer that turns Sembla from a site into actual commercial likeness infrastructure

## What Sembla Should Not Build First

Do not start by building:

- a generic web crawler
- a generic takedown engine
- a generic deepfake classifier
- broad internet-scale scanning

Why not:

- those are expensive
- they are technically nontrivial
- they are already being sold by specialized companies
- they are not the part of the stack that gives Sembla its strongest differentiation

## What To Partner For First

Use external vendors or partners for:

- web-scale scanning
- detection of synthetic or manipulated media
- takedown workflows
- external violation alerts

This is the fastest way to get coverage without overbuilding too early.

## What The Real Moat Is

The moat is not:

- crawling the internet
- fingerprinting images in the abstract
- generic synthetic-media detection

The moat is:

- who is represented
- what is approved
- what is restricted
- where use is permitted
- how long the rights last
- what happens when use goes out of scope

That means Sembla should own the `permission graph`, not just the monitoring surface.

## Product Sequence

### Phase 1

Build the control plane:

- passport records
- rights graph
- approval graph
- renewal triggers
- evidence packs
- talent and brand restrictions

### Phase 2

Partner for enforcement:

- scanning
- takedowns
- detection
- alerting

### Phase 3

Build the orchestration layer:

- violation case queue
- severity scoring
- takedown status tracking
- legal / ops notes
- renewal and breach workflows

### Phase 4

Only later, consider internalizing:

- proprietary scanning
- fingerprinting at scale
- owned monitoring infrastructure

Do this only if:

- represented talent volume is high enough
- vendor cost becomes inefficient
- vendor coverage becomes a bottleneck
- faster internal enforcement becomes strategically important

## Best Near-Term Product Framing

Sembla should think of itself as building:

`the control plane for governed commercial use of likeness`

Not:

- an AI detection company
- a takedown company
- a generic creator-protection tool

## Practical Build Decision

If forced to choose right now:

- build the governance layer
- rent the detection layer
- orchestrate the response layer

That is the fastest path to a real moat.
