import { images, p } from './blocks';
import type { BlogPost } from './types';

export const paper = {
  title: 'Tiny Recursive Models on ARC-AGI-1',
  subtitle: 'Inductive Biases, Identity Conditioning, and Test-Time Compute',
  authors: 'Roye-Azar, Vargas-Naranjo, Ghai, Balamurugan, Amir',
  venue: 'arXiv · Dec 2025',
  arxiv: 'https://arxiv.org/abs/2512.11847v1',
  pdf: '/media/trm-arc-agi-paper.pdf',
  cover: '/media/projects/trm-paper-card.png',
  citations: 3,
  stats: [
    { value: '+10.75 pts', label: 'Pass@1 from a 1,000-sample augmentation pipeline' },
    { value: '40% → 0%', label: 'accuracy when puzzle IDs are blanked or randomized' },
    { value: '94.4%', label: 'of final accuracy already reached at recursion step 1' },
    { value: '130×', label: 'throughput vs. Llama 3 8B QLoRA on H100 (31.3 vs 0.24 samples/s)' },
  ],
  bullets: [
    'Built reproducible data pipelines for ARC-AGI-1 experiments, processing and evaluating 400+ tasks at scale.',
    'Engineered a 1,000-sample data augmentation pipeline, improving Pass@1 accuracy by 10.75 percentage points.',
    'Ran data analysis and model ablation experiments, identifying puzzle-ID embeddings as a critical performance dependency.',
    'Showed strict puzzle-ID dependence: accuracy dropped from 40.00% to 0.00% when IDs were blanked or randomized under the verification protocol.',
    'Found shallow effective recursion: step-1 already reached 38.25% Pass@1 (94.4% of final), with accuracy saturating by step 4 and unchanged at step 6.',
    'Benchmarked efficiency on H100: TRM (7M) used 2.4 GB VRAM at 31.3 samples/s vs Llama 3 8B QLoRA at 6.1 GB and 0.24 samples/s.',
  ],
};

const b = (file: string) => `/media/blog/${file}`;
const ARXIV = 'https://arxiv.org/abs/2512.11847v1';

export const blogPosts: BlogPost[] = [
  {
    n: 1,
    date: 'March 24, 2026',
    title: 'Why do you care about TRMs?',
    video: { src: b('blog1.mp4'), poster: b('blog1-poster.jpg') },
    blocks: [
      p('Cheaper, faster, and more accurate. Got your attention?'),
      p(`Here's the research paper link: ${ARXIV}`),
      p('Tiny recursive models are small models (millions, not billions, of parameters) that refine their internal state recursively instead of generating token-by-token like LLMs.'),
      p("Why should it matter to you? I see a plethora of possibilities and potential that this model and concept can bring to both your projects and even corporate workflows for my fellow recruiters (I hope you've made it this far)."),
      p('But before we get into that, I do want to walk through the research, so I highly recommend you read just the abstract of the paper (first paragraph) and get a little more familiar with it to follow along with the next video.'),
      p("Page 12 has the open-sourced GitHub repository if you're impatient and want to see the code and tests for yourself."),
    ],
  },
  {
    n: 2,
    date: 'March 25, 2026',
    title: 'What and why the research? + Abstract',
    video: { src: b('blog2.mp4'), poster: b('blog2-poster.jpg') },
    blocks: [
      p("We know what it does, we don't know how."),
      p('The model outputting an amazing Pass@1 (meaning the best one) result is enough to prove the potential exists and the dreams can live.'),
      p('How was it tested? In a nutshell, we eliminated certain aspects of the puzzle (puzzle ID) and saw how the algorithm behaved.'),
      p('Failed: the puzzle ID mattered, therefore important.'),
      p("Succeeded: worked without puzzle ID, therefore doesn't matter. Test beyond: how much more did it struggle to succeed."),
      p('As we narrow down what matters to it, we narrow down to understanding the behavior of the algorithm.'),
      p(`Paper link: ${ARXIV}`),
    ],
  },
  {
    n: 3,
    date: 'March 26, 2026',
    title: 'Model Walkthrough: Base vs Annotated',
    video: { src: b('blog3.mp4'), poster: b('blog3-poster.jpg') },
    blocks: [
      images(
        { src: b('model-base.jpg'), alt: 'Base model diagram' },
        { src: b('model-annotated.jpg'), alt: 'Annotated model diagram' },
      ),
      p('1. x (question) enters the model; y (answer) and z (reasoning) are output from the recursion.'),
      p('2. The near-completed answer is obtained after the first recursion (see the visual below).'),
      p('→ In recursion, context and info building are solved: outputs y and z.'),
      p('→ y and z ferment in the block and the final output is released.'),
      p('→ Converted from vector to wording.'),
      images({ src: b('blog3-walkthrough.png'), alt: 'Blog 3 test walkthrough table' }),
    ],
  },
  {
    n: 4,
    date: 'March 28, 2026',
    title: 'TRM Implementation Scenario',
    video: { src: b('blog4.mp4'), poster: b('blog4-poster.jpg') },
    blocks: [
      p('Key term: Tokenization'),
      p('→ LLM tokenization is the process of breaking text into smaller units called tokens, such as words, subwords, or characters, so a language model can convert them into numbers and process them.'),
      p('THIS is what makes LLMs expensive. THIS is the issue I want to tackle.'),
      p("The average engineer will use about $250k worth of tokens in a year, so let's go over a scenario of a QA system, and how we can visually picture this model being used to reduce tokenization."),
      p('All in all: TRM eliminates irrelevant garbage → reduces unnecessary tokenization → corporations save money → everyone happy.'),
    ],
  },
  {
    n: 5,
    date: 'March 29, 2026',
    title: "Our 4 Big Why's (Introduction) (1)",
    video: { src: b('blog5.mp4'), poster: b('blog5-poster.jpg') },
    blocks: [
      p('Here are the 4 key factors we researched.'),
      p('1. Role of test-time compute'),
      p('2. Dependence on puzzle ID'),
      p('3. Effective depth of recursion'),
      p('4. Impact of augmentation on the solution distribution'),
      images({ src: b('intro-notes.jpg'), alt: 'Blog 5 intro notes' }),
      p('We go over the questions raised from each of these factors, acknowledging what we need to eventually know to understand the behavior of the model down to the pin.'),
    ],
  },
  {
    n: 6,
    date: 'March 30, 2026',
    title: 'What Did We Do? (Contributions) (1.1)',
    video: { src: b('blog6.mp4'), poster: b('blog6-poster.jpg') },
    blocks: [
      p('Following the 4 factors we needed to understand, here are the points we tackled:'),
      p('1. Ensemble contribution'),
      p('2. Puzzle-ID dependence'),
      p('3. Recursion trajectory analysis'),
      p('4. Training dynamics under augmentation'),
      images({ src: b('contributions-notes.jpg'), alt: 'Blog 6 contribution notes' }),
      p('Using a "did - found - conclusion" model, I go over how we approached each why to find its how and what.'),
    ],
  },
  {
    n: 7,
    date: 'April 2, 2026',
    title: 'Related papers (step into the past) (2 – 2.3)',
    video: { src: b('blog7.mp4'), poster: b('blog7-poster.jpg') },
    blocks: [
      p('The TRM was an "update" from the HRM (hierarchical recursive model), which was a model with smaller models and more parameters within.'),
      p('We go over:'),
      p("1. Why the HRM wasn't the method"),
      p("2. What the TRM fixes and why it's better"),
      p('3. The difference in both thought-chains'),
      images(
        { src: b('related-papers.jpg'), alt: 'Related papers overview (2) and sections 2.1–2.2' },
        { src: b('related-papers-annotated.jpg'), alt: 'Annotated related-papers diagram' },
      ),
    ],
  },
  {
    n: 8,
    date: 'April 5, 2026',
    title: 'Updated TRM implementation + first problem',
    video: { src: b('blog8.mp4'), poster: b('blog8-poster.jpg') },
    blocks: [
      p('Long story short: TRM does NOT take raw text as input.'),
      p('After going through a better detailed implementation flowchart, we see where the TRM is used and dig into our new roadblock.'),
      p('Question: How can we update the TRM to comprehend text input and not just pixel-to-pixel play?'),
      images({ src: b('trm-flowchart.jpg'), alt: 'TRM implementation flowchart' }),
    ],
  },
  {
    n: 9,
    date: 'April 8, 2026',
    title: 'Project - Phase A',
    video: { src: b('blog9.mp4'), poster: b('blog9-poster.jpg') },
    blocks: [
      p('Our approach to a "no text-value" TRM is to speak in its language. Turning our words into a byte grid will be our first trial at this (probably will not be our last).'),
      p('Updated flowchart and notes:'),
      images(
        { src: b('phase-a.jpeg'), alt: 'Phase A updated flowchart' },
        { src: b('phase-a-notes.jpeg'), alt: 'Phase A notes' },
      ),
    ],
  },
];
