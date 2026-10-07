import { h3, list, p, phoneImage, phoneRow, phoneVideo, video } from './blocks';
import type { Project, ProjectCategory } from './types';

const m = (file: string) => `/media/projects/${file}`;

export const categoryLabels: Record<ProjectCategory, string> = {
  data: 'Data',
  ai: 'AI / ML',
  fullstack: 'Full-stack',
  mobile: 'Mobile',
  research: 'Research',
  hardware: 'Hardware',
};

// Order = order on the board. Strongest recruiter signal first.
export const projects: Project[] = [
  {
    slug: 'graphmind',
    title: 'GraphMind',
    tagline: 'Turns unstructured docs into queryable knowledge graphs.',
    intro:
      'GraphMind is a full-stack knowledge graph project that converts unstructured content such as documents, notes, articles, and URLs into connected, queryable intelligence. Instead of only keyword matching, it extracts entities and relationships so users can explore connections like who appears across documents and which organizations they are linked to.',
    categories: ['data', 'ai', 'fullstack'],
    tags: ['Next.js', 'TypeScript', 'FastAPI', 'Celery', 'RabbitMQ', 'Redis', 'Neo4j', 'OpenAI', 'AuraDB', 'Upstash'],
    accent: ['#0ea5e9', '#1d4ed8'],
    links: [{ label: 'GitHub', href: 'https://github.com/nballin/GraphMind' }],
    sections: [
      {
        heading: 'Problem it solves',
        blocks: [
          p('Manual research across scattered files does not scale and usually forces repeated reading of the same material. GraphMind automates structured extraction and gives teams relationship-first queries, making research synthesis, due diligence, and competitive intelligence faster and more reliable.'),
        ],
      },
      {
        heading: 'Current status',
        blocks: [
          p('GraphMind was originally built as a VM-hosted Docker Compose backend (FastAPI, Celery workers, RabbitMQ, Redis, Neo4j) with a Next.js frontend. While Oracle, AWS, and GCP all have free tiers, each still requires a card on file at signup for abuse prevention. Since I wanted a path that avoids entering payment details entirely while still showcasing the product, I rebuilt the deployment shape into a no-card demo architecture.'),
        ],
      },
      {
        heading: 'System architecture',
        blocks: [
          h3('Original build (VM + Docker Compose)'),
          list(
            'Frontend: Next.js + TypeScript web app for ingesting content and exploring graph results.',
            'API layer: FastAPI service for ingest endpoints, graph reads, and job status responses.',
            'Async processing: Celery workers run long extraction jobs off-request.',
            'Queue + state: RabbitMQ handled task dispatch and Redis stored task/job status.',
            'Graph storage: Neo4j persisted entities and relationships for traversal queries.',
            'Infra: Single cloud VM running Docker Compose services for API, workers, queue, cache, and graph DB.',
          ),
          h3('No-card demo build (current showcase)'),
          list(
            'Frontend hosting: Vercel hosts the Next.js app.',
            'Graph database: Neo4j AuraDB Free provides managed graph storage without requiring a card.',
            'Cache/state: Upstash Redis Free stores short-lived state for async demo flows.',
            'Background flow: Workflow-style orchestration replaces always-on RabbitMQ/Celery daemons for demo execution.',
            'LLM extraction: OpenAI still performs entity/relationship extraction from chunked unstructured input.',
            'Goal: Preserve the product narrative and technical depth while avoiding paid infrastructure wiring.',
          ),
        ],
      },
      {
        heading: 'Technology & service breakdown',
        blocks: [
          list(
            'Next.js, React, TypeScript, Tailwind CSS: UI, routing, ingestion forms, and graph exploration screens.',
            'react-force-graph-2d: Interactive force-directed knowledge graph users can explore visually.',
            'FastAPI + Uvicorn (Python): Ingest requests, status polling, and graph query endpoints.',
            'OpenAI (function calling): Converts raw text chunks into structured entities and relationship triples.',
            'Neo4j + APOC: Primary graph database for storing and querying linked entities.',
            'Celery, RabbitMQ, Redis, Docker Compose (original): Async workers, queue, job-state cache, one-stack deploy.',
            'Vercel, Neo4j AuraDB Free, Upstash Redis Free (current demo): Stateless frontend + managed data services.',
          ),
        ],
      },
      {
        heading: 'Why a graph over basic RAG/search',
        blocks: [
          p('RAG and search tools are excellent for retrieving relevant chunks, but they still treat documents as mostly isolated units. GraphMind models the relationships between entities and facts, so insights come from the connections across sources, not only similarity scores within individual chunks.'),
        ],
      },
    ],
  },
  {
    slug: 'tiny-recursive-models',
    title: 'Tiny Recursive Models — arXiv Paper',
    tagline: 'Co-authored study of TRMs on ARC-AGI-1. 3 citations.',
    intro:
      'Co-authored "Tiny Recursive Models on ARC-AGI-1: Inductive Biases, Identity Conditioning, and Test-Time Compute", analyzing the behavior of Tiny Recursive Models (TRMs) on the ARC-AGI-1 benchmark. Performed empirical ablations and efficiency analyses to isolate the impact of test-time compute, puzzle-identity conditioning, and recursion depth on model performance. Benchmarked TRMs against a QLoRA-fine-tuned LLaMA 3 8B baseline.',
    categories: ['research', 'ai', 'data'],
    tags: ['Research', 'PyTorch', 'Python', 'QLoRA', 'ARC-AGI-1'],
    accent: ['#8b5cf6', '#22d3ee'],
    cover: { src: m('trm-paper-card.png'), alt: 'Tiny Recursive Models paper title page' },
    links: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2512.11847v1' },
      { label: 'PDF', href: '/media/trm-arc-agi-paper.pdf' },
      { label: 'Research blog', href: '/research' },
    ],
    sections: [
      {
        heading: 'Overview',
        blocks: [
          p('This paper presents an analysis of Tiny Recursive Models (TRMs) and their performance on the ARC-AGI-1 benchmark, a challenging dataset designed to test abstract reasoning. The study investigates how architectural choices and training strategies impact performance, with a focus on test-time compute, identity conditioning, and recursion depth.'),
        ],
      },
      {
        heading: 'Key findings',
        blocks: [
          h3('Test-time compute'),
          p('Increasing test-time compute significantly improves performance on ARC-AGI-1, suggesting recursive models benefit from additional computation during inference.'),
          h3('Identity conditioning'),
          p('Puzzle-identity conditioning is a crucial factor: accuracy dropped from 40.00% to 0.00% when puzzle IDs were blanked or randomized under the verification protocol.'),
          h3('Recursion depth'),
          p('Effective recursion is shallow: step 1 already reached 38.25% Pass@1 (94.4% of final), with accuracy saturating by step 4 and unchanged at step 6.'),
        ],
      },
      {
        heading: 'My contributions',
        blocks: [
          list(
            'Built reproducible data pipelines for ARC-AGI-1 experiments, processing and evaluating 400+ tasks at scale.',
            'Engineered a 1,000-sample data augmentation pipeline, improving Pass@1 accuracy by 10.75 percentage points.',
            'Ran data analysis and model ablation experiments, identifying puzzle-ID embeddings as a critical performance dependency.',
            'Benchmarked efficiency on H100: TRM (7M) used 2.4 GB VRAM at 31.3 samples/s vs Llama 3 8B QLoRA at 6.1 GB and 0.24 samples/s.',
          ),
        ],
      },
      {
        heading: 'Methodology & stack',
        blocks: [
          list(
            'Empirical ablations to isolate individual factors',
            'Efficiency analyses comparing computational requirements',
            'Systematic evaluation across multiple model configurations',
            'Python, PyTorch, ARC-AGI-1 benchmark, QLoRA',
          ),
        ],
      },
    ],
  },
  {
    slug: 'quickqa',
    title: 'QuickQA',
    tagline: 'RAG QA pipeline with an experimental Tiny Recursive Model encoder path.',
    intro:
      'QuickQA is a retrieval-augmented question-answering pipeline: it ingests a local document corpus, indexes it for hybrid dense + keyword search, and answers questions with an extractive reader. Alongside the stable MiniLM baseline, it wires in an experimental Tiny Recursive Model (TRM) encoder, researching whether TRM-based representations can reduce dependence on standard tokenization and improve efficiency.',
    categories: ['ai', 'research', 'data'],
    tags: ['Python', 'RAG', 'FAISS', 'BM25', 'RoBERTa', 'TRM', 'PyTorch', 'SQuAD'],
    accent: ['#0891b2', '#312e81'],
    links: [{ label: 'GitHub', href: 'https://github.com/nballin/Quick-QA' }],
    sections: [
      {
        heading: 'Pipeline overview',
        blocks: [
          h3('Ingest & index'),
          list(
            'Loads documents from a local corpus (.txt, .pdf, .docx), falling back to SQuAD validation passages when empty.',
            'Splits text into sentence-aware chunks (300 words, 50-word overlap).',
            'Encodes chunks into dense vectors and builds a FAISS inner-product index plus a BM25 keyword index.',
            'Persists a JSONL passage store alongside both indexes.',
          ),
          h3('Query & answer'),
          list(
            'Encodes the question to a dense vector and retrieves candidates from FAISS and BM25 in parallel.',
            'Fuses the two candidate sets with weighted Reciprocal Rank Fusion, then re-ranks by cosine similarity.',
            'Extracts the final answer span with a RoBERTa (deepset/roberta-base-squad2) reader, returning the answer, score, and source chunk.',
            'A SQuAD evaluation command reports Exact Match, F1, and Recall@k.',
          ),
        ],
      },
      {
        heading: 'TRM encoder path (experimental)',
        blocks: [
          p('The pipeline supports swappable encoder backends behind a config flag. MiniLM is the default and the only backend that is fully stable end to end. The TRM backend is wired into the same ingest/query interface: text is converted from UTF-8 bytes into a fixed grid representation, bridged into ARC vocabulary IDs, and run through a Tiny Recursive Model whose hidden states are pooled, L2-normalized, and used for retrieval just like the MiniLM embeddings.'),
          p('Query conditioning on the TRM path currently uses a CRC32 hash-bucket placeholder rather than learned semantics, so answer quality still trails the MiniLM baseline — the point right now is validating that TRM representations can sit in the same retrieval pipeline at all.'),
        ],
      },
      {
        heading: 'Status & roadmap',
        blocks: [
          p('MiniLM remains the best end-to-end quality today. The TRM path needs a valid checkpoint and matching dataset metadata, and its byte-to-vocabulary bridge is still deterministic rather than learned.'),
          list(
            'Replace CRC32 query conditioning with learned, query-aware conditioning.',
            'Train the byte-to-vocabulary bridge with supervised/contrastive objectives instead of a fixed mapping.',
            'Fine-tune retrieval quality directly on QA triplets.',
            'Benchmark TRM against MiniLM on quality and runtime, then package a reproducible demo.',
          ),
        ],
      },
    ],
  },
  {
    slug: 'storyos',
    title: 'StoryOS',
    tagline: 'Deterministic AI video via 3D point-cloud scene proxies.',
    intro:
      'StoryOS is a demo project being developed for a media company to address inconsistency issues in AI video regeneration. The goal is a deterministic system where video generation produces consistent, repeatable results rather than random variations.',
    categories: ['ai'],
    tags: ['3D Rendering', 'Point Clouds', 'Video Generation', 'Python', 'AI/ML'],
    accent: ['#667eea', '#764ba2'],
    status: 'In progress',
    links: [{ label: 'GitHub', href: 'https://github.com/AntonioRoye/story_os' }],
    sections: [
      {
        heading: 'The problem',
        blocks: [
          p('Current AI video generation tools suffer from inconsistency in video regeneration. When you regenerate a video or make small changes, the output often varies unpredictably: characters change appearance, scenes shift, and details morph. That makes continuity and control in production workflows impossible.'),
        ],
      },
      {
        heading: 'My role',
        blocks: [
          p("I'm working on 3D rendering and point cloud technology to solve this. By creating 3D representations of characters and scenes using point clouds, we keep geometry and appearance consistent across regenerations, so when a video is regenerated or modified, the core 3D structure remains stable."),
        ],
      },
      {
        heading: 'Technical approach',
        blocks: [
          p('The solution builds 3D representations of characters and scenes using point clouds. Maintaining consistent 3D geometry across regenerations means characters and objects retain their appearance and structure.'),
          p('My work focuses on the 3D rendering pipeline and point cloud generation, the foundation for preserving character identity and scene structure even when videos are regenerated or modified.'),
        ],
      },
    ],
  },
  {
    slug: 'ai-finance-tracker',
    title: 'AI Finance Tracker',
    tagline: 'Full-stack budgeting app with a Pandas + GPT insights engine.',
    intro:
      'A full-stack AI finance application built with React, Node.js, and PostgreSQL to track expenses, budgets, and spending, with secure auth via Supabase. A Python/FastAPI AI backend uses Pandas for analysis (category breakdowns, monthly trends, budget comparisons) and OpenAI GPT-3.5-turbo to generate conversational, context-aware insights from real-time user data.',
    categories: ['fullstack', 'ai', 'data'],
    tags: ['React', 'Node.js', 'PostgreSQL', 'Python', 'FastAPI', 'OpenAI', 'Supabase', 'Docker'],
    accent: ['#10b981', '#0e7490'],
    cover: { src: m('finance-tracker-card.png'), alt: 'AI Finance Tracker dashboard' },
    links: [
      { label: 'Live demo', href: 'https://ai-finance-tracker-orcin-phi.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/nballin/AI-Finance-Tracker' },
    ],
    sections: [
      {
        heading: 'Overview',
        blocks: [
          p('Combines modern web technologies with AI so users can track expenses, manage budgets, and get personalized financial insights through natural-language interactions.'),
          video(m('finance-tracker.mp4')),
        ],
      },
      {
        heading: 'Key features',
        blocks: [
          list(
            'Secure auth and account management via Supabase: protected routes, sessions, per-user data isolation',
            'Natural-language expense tracking and queries',
            'Automated budget management and alerts',
            'Interactive spending visualizations',
            'Hybrid AI: Pandas data processing + OpenAI GPT-3.5-turbo responses',
            'Category breakdowns, monthly trends, and budget comparisons',
          ),
        ],
      },
      {
        heading: 'Architecture',
        blocks: [
          p('A React frontend talks to a Node.js API server, which interfaces with a Python AI service. The AI backend processes natural-language queries with the OpenAI API and runs analysis with Pandas to generate personalized insights.'),
          p('All components are containerized with Docker for consistent deployment. PostgreSQL stores user financial data with proper authentication and authorization.'),
        ],
      },
    ],
  },
  {
    slug: 'lediq',
    title: 'LedIq',
    tagline: 'Mainframe banking replica on IBM z/OS with real-time ML risk scoring.',
    intro:
      'LedIq is a functional replica of a top-5 banking system built on an IBM z/OS mainframe using zCX. It implements core mainframe components with COBOL, JCL, SQL, and REXX, and integrates a Node.js frontend with a FastAPI backend for real-time credit risk evaluation.',
    categories: ['data', 'ai', 'fullstack'],
    tags: ['COBOL', 'IBM z/OS', 'JCL', 'REXX', 'Node.js', 'FastAPI', 'XGBoost', 'ONNX', 'SHAP', 'Db2'],
    accent: ['#1e40af', '#3b82f6'],
    links: [],
    sections: [
      {
        heading: 'Key features',
        blocks: [
          list(
            'Built on IBM z/OS mainframe using zCX with COBOL, JCL, SQL, and REXX',
            'Node.js frontend with FastAPI backend for real-time operations',
            'ONNX-hosted XGBoost model for real-time credit risk scoring',
            'SHAP explainability for model interpretability',
            'IBM Db2 stores predictions and feature-level explanations for auditability',
          ),
        ],
      },
      {
        heading: 'Context',
        blocks: [
          p('Developed with the Western Cyber Society at Western University, demonstrating the integration of legacy mainframe technologies with modern web development and AI/ML.'),
        ],
      },
    ],
  },
  {
    slug: 'fixmyresume',
    title: 'FixMyResume',
    tagline: 'PDF résumé → structured entries → AI-polished LaTeX for Overleaf.',
    intro:
      'FixMyResume is a full-stack AI LaTeX résumé builder that converts résumé PDFs into editable structured entries, improves bullet points with AI, and exports clean LaTeX for Overleaf.',
    categories: ['ai', 'fullstack'],
    tags: ['FastAPI', 'Python', 'Groq API', 'Docling', 'PyMuPDF', 'LaTeX'],
    accent: ['#0f766e', '#14b8a6'],
    links: [
      { label: 'Live demo', href: 'https://fix-my-resume-ebon.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/nballin/FixMyResume' },
    ],
    sections: [
      {
        heading: 'What it solves',
        blocks: [
          list(
            'Converts unstructured PDF résumés into editable sections and entries',
            'Improves bullet quality for ATS readability using AI',
            'Generates LaTeX quickly for polished formatting',
            'Supports both upload-based and manual building workflows',
          ),
        ],
      },
      {
        heading: 'Core workflow',
        blocks: [
          list(
            'Upload PDF → extract text/tables (Docling / PyMuPDF)',
            'Parse into structured JSON using a Groq LLM',
            'Edit entries and enhance bullets with AI',
            'Generate LaTeX and paste into Overleaf for the final PDF',
          ),
        ],
      },
      {
        heading: 'Key features',
        blocks: [
          list(
            'PDF → LaTeX pipeline with optional preview-before-generate',
            'AI bullet enhancement with stronger verbs, metrics, and keywords',
            'Automatic technical-skill merging from enhanced bullets',
            'AI helpbot for wording, layout, and section suggestions',
            'Manual build mode with section-based entry creation',
          ),
        ],
      },
      {
        heading: 'Stack',
        blocks: [
          list(
            'Backend: Python, FastAPI, Uvicorn, Pydantic, Groq API',
            'PDF processing: Docling, PyMuPDF, Pandas (via PDF2CSV integration)',
            'Frontend: HTML, CSS, vanilla JavaScript',
            'Output: Overleaf-compatible LaTeX',
          ),
        ],
      },
    ],
  },
  {
    slug: 'csv-converter',
    title: 'PDF → CSV Converter',
    tagline: 'High-accuracy table extraction with a 3-layer OCR stack.',
    intro:
      'A high-accuracy PDF-to-CSV conversion pipeline in Python that extracts every table into separate CSV files, generates a full-document text file, and outputs structural metadata (table outlines, dimensions, formatting), robust across document layouts. Built with Docling, PyMuPDF, Pandas, and a 3-layer OCR stack.',
    categories: ['data'],
    tags: ['Python', 'Pandas', 'PyMuPDF', 'Docling', 'OCR'],
    accent: ['#f97316', '#be123c'],
    cover: { src: m('csv-converter-card.jpg'), alt: 'Extracted ANOVA table next to its CSV output' },
    links: [{ label: 'GitHub', href: 'https://github.com/nballin/PDF2CSV-Converter' }],
    sections: [
      {
        heading: 'How it works',
        blocks: [
          video(m('csv-converter.mp4')),
          p('Documents flow through structure analysis, table detection, OCR with fallback layers, and finally CSV generation with metadata preservation.'),
          p('The 3-layer OCR stack (Tesseract → RapidOCR → a custom layer for edge cases) tries progressively more specialized engines, so the system handles varying quality, fonts, and layouts.'),
        ],
      },
      {
        heading: 'Key features',
        blocks: [
          list(
            'Multi-table extraction from a single PDF',
            'Automatic table detection and boundary recognition',
            'Structural metadata generation (dimensions, formatting)',
            'Full-document text extraction',
          ),
        ],
      },
      {
        heading: 'Use cases',
        blocks: [list('Financial document processing', 'Research paper data extraction', 'Report automation and data migration', 'Document digitization workflows')],
      },
    ],
  },
  {
    slug: 'onlyus',
    title: 'OnlyUs',
    tagline: 'Cross-platform app for long-distance couples. Expo + Supabase.',
    intro:
      'OnlyUs is a cross-platform relationship app focused on bridging long-distance connection through shared memories, private letters, and daily journaling. Built with Expo and React Native, it ships across iOS, Android, and web from a single TypeScript codebase.',
    categories: ['mobile', 'fullstack'],
    tags: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'Expo Router', 'Nativewind', 'Reanimated'],
    accent: ['#8b5cf6', '#ec4899'],
    links: [{ label: 'GitHub', href: 'https://github.com/nballin/SN_BLOG' }],
    sections: [
      {
        heading: 'Key features',
        blocks: [
          list(
            'Expo + React Native with Expo Router for iOS, Android, and web navigation',
            'Supabase Postgres, auth, storage, and realtime powering core flows',
            'Camera and image-picker media capture for shared memories',
            'Push notifications for posts, letters, and journaling reminders',
            'AsyncStorage offline persistence',
            'Nativewind styling with Reanimated interactions',
          ),
        ],
      },
      {
        heading: 'Implementation highlights',
        blocks: [
          p('The architecture balances real-time engagement with reliability under unstable connectivity. Supabase realtime channels provide live updates while AsyncStorage caches locally, keeping the app responsive and preserving user actions across sessions.'),
        ],
      },
      {
        heading: 'Feature walkthrough',
        blocks: [
          p('Feed posts carry an author, caption, and reactions; Calendar places every post on its date with day-by-day swiping; Mailbox holds longer private letters separate from the quick photo feed.'),
          phoneRow(
            phoneVideo(m('onlyus-feed.mp4'), 'Feed', m('onlyus-feed-poster.jpg')),
            phoneVideo(m('onlyus-calendar.mp4'), 'Calendar', m('onlyus-calendar-poster.jpg')),
            phoneImage(m('onlyus-mailbox.png'), 'Mailbox'),
          ),
        ],
      },
    ],
  },
  {
    slug: 'bookbuds',
    title: 'BookBuds',
    tagline: 'Social reading log with offline-first notes and an AI summarizer.',
    intro:
      'BookBuds is a full-stack mobile reading log built with React Native and Expo. It enables chapter-level note-taking with offline-first persistence via AsyncStorage, social features on Firebase, and an AI chatbot that summarizes and clarifies notes.',
    categories: ['mobile', 'fullstack', 'ai'],
    tags: ['React Native', 'Expo', 'Firebase', 'Firestore', 'AsyncStorage', 'AI'],
    accent: ['#f59e0b', '#d97706'],
    links: [],
    sections: [
      {
        heading: 'Key features',
        blocks: [
          list(
            'Chapter-level note-taking',
            'Offline-first with AsyncStorage and automatic sync when back online',
            'Native iOS and Android via React Native + Expo',
            'Accounts, friend connections, and real-time comments on shared notes (Firebase Auth + Firestore)',
            'AI chatbot to summarize and clarify notes',
            'Auto-save debouncing, lazy-loaded Firestore queries, modular service layer',
          ),
        ],
      },
    ],
  },
  {
    slug: 'portfolio-website',
    title: 'This Portfolio',
    tagline: 'Next.js bento board built for fast recruiter scanning. You’re looking at it.',
    intro:
      'This site: a Next.js App Router + TypeScript + Tailwind portfolio designed as a single-screen bento board, so recruiters can scan everything at a glance. Project pages open as intercepted-route modals and there’s a ⌘K command palette.',
    categories: ['fullstack'],
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Motion'],
    accent: ['#4f46e5', '#7c3aed'],
    links: [{ label: 'GitHub', href: 'https://github.com/nballin/Personal-Website' }],
    sections: [
      {
        heading: 'Highlights',
        blocks: [
          list(
            'Bento-grid layout that fits on one screen at desktop sizes',
            'Parallel + intercepting routes: projects open as modals but are deep-linkable pages',
            'All content in typed data files, so there’s one source of truth for 11 projects',
            '⌘K command palette for jumping straight to any project, role, or link',
            '100 Lighthouse performance score on desktop',
          ),
        ],
      },
    ],
  },
  {
    slug: 'self-watering-flower-pot',
    title: 'Self-Watering Flower Pot',
    tagline: 'Arduino IoT system that waters plants below a moisture threshold.',
    intro:
      'An automated self-watering plant system using Arduino that monitors soil moisture and triggers watering below a set threshold. Integrates an LCD, moisture sensor, LED, buzzer, and water pump, with Java and MATLAB to display moisture data and signal watering events.',
    categories: ['hardware'],
    tags: ['Java', 'MATLAB', 'Arduino', 'IoT', 'Hardware'],
    accent: ['#22c55e', '#15803d'],
    cover: { src: m('flower-pot-card.png'), alt: 'Self-watering flower pot hardware' },
    links: [{ label: 'GitHub', href: 'https://github.com/nballin/Self-Watering-flower-pot' }],
    sections: [
      {
        heading: 'How it works',
        blocks: [
          video(m('flower-pot.mp4')),
          p('A soil sensor continuously monitors moisture. When it drops below a threshold, the Arduino triggers the pump; the LCD shows live readings while an LED and buzzer signal watering events.'),
          p('Java handles control logic; MATLAB is used for data analysis to track moisture trends and tune watering schedules.'),
        ],
      },
      {
        heading: 'Hardware',
        blocks: [list('Arduino microcontroller', 'Soil moisture sensor', 'LCD display', 'LED indicators + buzzer', 'Water pump')],
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
