# Quality dimensions

A quality dimension is an analytical lens that can be used to evaluate a product. 

A good breakdown into quality dimensions widens the understanding of what matters to whom, and helps formulate specific questions that broad labels may hide.

The goal is to comprehensively cover all the important quality dimensions for each stakeholder of the project, so that the project's quality needs and gaps can be correctly prioritised.

What a kind of quality is, and when to split a question or join two, are in [the quality
model](quality-model.md#what-is-judged-and-for-whom).

## Look for what might be missing

Start from the user's and stakeholders' named concerns. Use the candidate list as a reference;
there is no need to go through every row and no default set. Bring candidates grounded in
the project, because a catalogue recited is a worksheet, not thinking. 

| Kind of quality | Questions to consider |
|---|---|
| Correctness | What must it get right, and under which conditions? |
| Performance and scale | How long does work take, how responsive does it feel, how predictable is the timing, what resources does it use, and what happens as demand or input grows? |
| Reliability and continuity | How often does it fail, when must it be available, how does it cope with disruption, what degrades, and how do people recover their work? |
| Security, privacy and data | Who could act or learn something they shouldn't, how is personal information handled, and what keeps entrusted data intact? |
| Use and access | Which people or agents need to use it, and what do they need, including different access needs, languages, locales and conventions? |
| Operation | How do operators notice a problem, find and fix its cause, keep the service usable and restore it? |
| Change and understanding | How easily can people or agents change and extend it, understand why it was built this way, and become effective without much help? |
| Investigation and reproduction | How can the behaviour that matters be tried and judged, and a result or failure reproduced under the conditions that matter? |
| Delivery and integration | How is it installed or deployed, where must it run, and which systems or outputs must it work with? |
| Obligations and accountability | Which obligations apply, and how can important actions or decisions be traced and explained? |
| Cost and predictability | What does it cost to use, what keeps spending in check, and how well can the team forecast its resources and delivery? |
| Documentation | What accurate background and guidance do its readers need to use, support, change or investigate it? |

Adapt the groups to the project and add its own, including what agents need, such as how much
context an agent needs or how much of a person's attention the work takes.

For each candidate:

- **Trace it to value:** whose goal or bar makes this kind of quality matter, for this product or
  part and in this situation?
- **Look at the links between kinds.** An operator has to see a failure to find its cause, and find
  the cause to restore the service; naming recovery alone hides the earlier needs.
  
Consider, based on the project context, what dimensions might be unusual or missing. 

Also consider what dimensions might be ["obligations"](quality-model.md#obligations-that-come-with-the-facts) given the facts of the project, such as legality, security and privacy, even if nobody mentions them.

<a id="unpack-where-the-answers-differ"></a>

## Sub-dimensions: unpack where the answers differ

Before rating a kind of quality, ask what it actually covers here:

- A long-running tool can tolerate slow completion while needing immediate acknowledgement and
  clear progress. One "performance" rating hides two expectations.
- Occasional crashes may be acceptable if trying again works and keeps the data, while losing work
  is a Dealbreaker. How often it crashes, how it recovers, whether trying again works and whether
  data is lost need separate answers.
- A system can be easy to change but hard to diagnose. One "maintainability" judgment may hide the
  work that is actually slowing the team down.
- There may be many different aspects to functionality and correctness that matter differently.

Keep a broad dimension whole when one answer covers its parts. Split it when one answer would hide a
difference that matters to the decision.

### Worked example: Performance

"Performance" unpacks into at least:

| Sub-dimension | What it means |
|---|---|
| **Scalability** | Can it handle large inputs without degrading? |
| **Resource consumption** | How much RAM, disk, CPU does it need? |
| **Elapsed time** | How long does a full operation take end-to-end? |
| **UX responsiveness** | Does the interface feel alive during long operations? |
| **Jitter / timing predictability** | Is performance consistent or spiky? |

### Worked example: Maintainability

"Maintainability" unpacks into at least:

| Sub-dimension | What it means |
|---|---|
| **Diagnosability** | When something goes wrong, can you tell what and where? |
| **Fixability** | Once diagnosed, how hard is the fix? |
| **Enhanceability** | Can you add new capabilities without breaking existing ones? |
| **Readability** | Can someone (or some agent) new follow the code? |
| **Understandability** | Do you know *why* the code is the way it is? |

### Worked example: Reliability

"Reliability" unpacks into at least:

| Sub-dimension | What it means |
|---|---|
| **Crash frequency** | How often does it fail completely? |
| **Recoverability** | When it fails, can you get back to where you were? |
| **Retry success** | If you try again, does it work? |
| **Failure mode** | What does failure look like? Graceful degradation or data loss? |
| **Shape of downtime** | Down for one second allowing retry vs down for hours? |

When there is disagreement or confusion about the rating of a dimension, consider whether further breaking down resolves it. If they mean the same thing,
the disagreement is real and stays; splitting or merging does not quietly change the user's rating.

## Check human and agent assumptions

Where both humans and agents perform the same role (e.g. user or maintainer), assumptions that apply to one may not apply to the other.
The same dimensions may be relevant for both of them but with different needs within that dimension, and this is worth breaking down 
(e.g. human-readability vs agent-readability, human-onboard-a-bility vs agent onboard-a-bility)

<a id="separate-performance-from-belief-where-it-matters"></a>

## Separate actual quality from what people believe

How good something is and how good people believe it is can be separate dimensions that matter for different reasons. 
Where the difference matters, treat them as separate quality dimensions with
their own bars and observations (e.g. investor perception of usability vs actual usability may matter for different reasons). 

Perceived quality is also not our confidence in the assessment: we can have strong evidence that
people distrust a tool while knowing little about whether it is correct. Better communication does
not stand in for meeting the bar underneath.
