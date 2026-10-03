export const profile = {
  name: 'Nithin Balamurugan',
  firstName: 'Nithin',
  headline: 'Data Engineer · ML Infrastructure',
  school: 'Computer Science @ Western University',
  graduation: 'April 2027',
  lookingFor: 'Full-time Data Engineering & ML Infrastructure roles, 2027',
  location: 'Ontario, Canada',
  headshot: '/media/photos/headshot.jpeg',
  portrait: '/media/photos/portrait.jpg',
  resume: '/media/resume.pdf',
  email: 'nithinbala08@gmail.com',
  github: 'https://github.com/nballin',
  linkedin: 'https://linkedin.com/in/nithinbala05',
} as const;

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Data & Cloud',
    items: ['Azure', 'Azure Databricks', 'Azure Data Lake Storage', 'Azure Data Factory', 'Azure SQL', 'Azure DevOps', 'Salesforce', 'Datadog'],
  },
  {
    group: 'Backend & Product',
    items: ['FastAPI', 'Node.js', 'Next.js', 'React', 'Docker', 'OpenAI API', 'Git/GitHub'],
  },
  { group: 'Languages', items: ['Python', 'SQL', 'TypeScript', 'JavaScript', 'Java'] },
  {
    group: 'Data / ML',
    items: ['Pandas', 'NumPy', 'PyTorch', 'Hugging Face', 'Vector Search', 'Embeddings'],
  },
];
