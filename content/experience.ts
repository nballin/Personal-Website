import type { Role } from './types';

export const experience: Role[] = [
  {
    company: 'TD',
    role: 'Data Engineer',
    start: 'Sep 2026',
    end: 'Dec 2026',
    current: true,
    logo: { src: '/media/logos/td.png', fit: 'cover' },
    bullets: [
      'Engineered and maintained Azure ETL pipelines processing 2,500-3,000 documents per ingestion cycle across Databricks, Azure SQL, and Data Lake.',
      'Optimized AI data pipelines and embedding infrastructure, improving retrieval accuracy from 95% to 98% while reducing provisioned compute by 47%.',
      'Built cloud infrastructure, CI/CD, and Datadog monitoring across DEV/TEST/PROD, enabling more reliable deployments and faster incident triage.',
    ],
    stack: ['Azure', 'Azure Databricks', 'Azure SQL', 'Azure Data Lake Storage', 'CI/CD', 'Datadog'],
  },
  {
    company: 'CIBC',
    role: 'Data Engineer',
    start: 'May 2026',
    end: 'Aug 2026',
    logo: { src: '/media/logos/cibc.png', fit: 'contain' },
    bullets: [
      'Resolved 100+ production incidents via root-cause analysis, maintaining 98%+ uptime across 4+ systems spanning Azure, Databricks, and SQL.',
      'Managed and improved Databricks queries and Azure Data Factory pipeline reliability to strengthen workflow stability in production.',
      'Supported deployments and release management through Azure DevOps and Salesforce, improving production workflows and deployment reliability.',
    ],
    stack: ['Azure', 'Azure Databricks', 'Azure Data Factory', 'Azure DevOps', 'Salesforce', 'SQL'],
  },
  {
    company: 'Varonova Tech Inc.',
    role: 'AI Software Developer Intern',
    start: 'Jan 2026',
    end: 'Apr 2026',
    bullets: [
      'Refactored an AI video generation pipeline into modular object-oriented Python architecture, separating scene proxy operations, depth processing, and rendering for maintainability and consistent workflows.',
      'Implemented a 3D point cloud reconstruction pipeline using NumPy, with depth backprojection, 4x4 camera pose transformations, and voxel-based downsampling to generate optimized scene proxies.',
      'Developed a novel-view rendering pipeline with z-buffer occlusion, point splatting, OpenCV inpainting, and FFmpeg H.264 export for downstream AI video generation workflows.',
    ],
    stack: ['Python', 'NumPy', 'OpenCV', 'FFmpeg', '3D Rendering', 'Point Clouds'],
  },
  {
    company: 'Western Cyber Society',
    role: 'Software Developer',
    start: 'Sep 2025',
    end: 'May 2026',
    logo: { src: '/media/logos/western-cyber-society.jpg', fit: 'contain' },
    bullets: [
      'Designed and developed LedIq, a functional replica of a top-5 banking system on IBM z/OS using COBOL, JCL, SQL, and REXX, integrated with a Node.js frontend and FastAPI backend for low-latency risk evaluation.',
      'Deployed an ONNX-hosted XGBoost model for real-time risk scoring and added SHAP explainability, persisting predictions and feature-level explanations in IBM Db2 for auditability.',
    ],
    stack: ['IBM z/OS', 'COBOL', 'JCL', 'Node.js', 'FastAPI', 'XGBoost', 'SHAP', 'Db2'],
  },
  {
    company: 'CognitomeAI',
    role: 'Software Engineer',
    start: 'Sep 2025',
    end: 'Dec 2025',
    bullets: [
      'Built a Python/FastAPI pipeline to ingest, clean, index, and retrieve PhD and peer-reviewed papers using NLP, embeddings, vector search, and semantic similarity.',
      'Developed an interactive data visualization that clusters and ranks papers by relevance using statistical analysis and similarity scoring to support faster data-driven decisions.',
      'Built and deployed a GPT-3.5 RAG chatbot using Python, Docker, AWS, and Next.js for citation-backed research workflows.',
    ],
    stack: ['Python', 'FastAPI', 'NLP', 'Embeddings', 'Vector Search', 'GPT-3.5', 'Docker', 'AWS', 'Next.js'],
  },
];
