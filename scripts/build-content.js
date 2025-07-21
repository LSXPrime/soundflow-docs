import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';
import { Document } from 'flexsearch';

const contentDir = path.join(process.cwd(), 'content');
const publicDir = path.join(process.cwd(), 'public');
const contentMetaFile = path.join(publicDir, 'content-meta.json');
const contentFullFile = path.join(publicDir, 'content-full.json');
const searchIndexFile = path.join(publicDir, 'search-index.json');

fs.ensureDirSync(publicDir);

async function buildContent() {
  const files = await glob('**/*.mdx', { cwd: contentDir });
  const pagesMeta = [];
  const pagesFull = [];

  const searchIndex = new Document({
    document: {
      id: 'id',
      index: ['title', 'description', 'content'],
      store: ['id', 'title', 'description', 'version', 'slug'],
    },
    tokenize: 'forward',
  });

  let idCounter = 0;
  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);

    const [version] = file.split(path.sep);
    const slug = path.basename(file, '.mdx');

    const metaData = {
      id: idCounter,
      slug,
      version,
      ...frontmatter,
    };

    const fullData = {
      ...metaData,
      content: fileContent, // Include raw MDX content
    };

    // Add metadata for navigation and lookups
    pagesMeta.push(metaData);
    pagesFull.push(fullData);

    // Add full document to search index
    searchIndex.add({ ...metaData, content });

    idCounter++;
  }

  const exportedIndexes = {};
  searchIndex.export((key, data) => {
    exportedIndexes[key] = data;
  });

  await fs.writeJson(contentMetaFile, pagesMeta, { spaces: 2 });
  await fs.writeJson(contentFullFile, pagesFull, { spaces: 2 });
  await fs.writeJson(searchIndexFile, exportedIndexes, { spaces: 2 });

  console.log(`✅ Built metadata for ${pagesMeta.length} pages and search index.`);
}

buildContent().catch((err) => {
  console.error('❌ Error building content:', err);
  process.exit(1);
});