const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const zlib = require('zlib');

const ROOT_DIR = __dirname;
const GIT_DIR = path.join(ROOT_DIR, '.git');

function sha1(buf) {
  return crypto.createHash('sha1').update(buf).digest('hex');
}

function writeObject(type, content) {
  const header = Buffer.from(`${type} ${content.length}\0`);
  const store = Buffer.concat([header, content]);
  const hash = sha1(store);
  const dir = path.join(GIT_DIR, 'objects', hash.slice(0, 2));
  const file = path.join(dir, hash.slice(2));

  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(file)) {
    const compressed = zlib.deflateSync(store);
    fs.writeFileSync(file, compressed);
  }
  return hash;
}

const IGNORE_DIRS = new Set(['.git', 'node_modules', '.turbo', '.next', 'dist']);

function buildTree(currentDir) {
  const entries = fs.readdirSync(currentDir, { withFileTypes: true });
  const treeEntries = [];

  for (const entry of entries) {
    if (IGNORE_DIRS.has(entry.name)) continue;

    const fullPath = path.join(currentDir, entry.name);

    if (entry.isDirectory()) {
      const subtreeHash = buildTree(fullPath);
      if (subtreeHash) {
        treeEntries.push({
          mode: '40000',
          name: entry.name,
          hash: subtreeHash
        });
      }
    } else if (entry.isFile()) {
      const content = fs.readFileSync(fullPath);
      const blobHash = writeObject('blob', content);
      treeEntries.push({
        mode: '100644',
        name: entry.name,
        hash: blobHash
      });
    }
  }

  // Sort entries according to Git tree rules
  treeEntries.sort((a, b) => {
    const aName = a.mode === '40000' ? a.name + '/' : a.name;
    const bName = b.mode === '40000' ? b.name + '/' : b.name;
    return aName.localeCompare(bName);
  });

  const treeBuffers = [];
  for (const entry of treeEntries) {
    const header = Buffer.from(`${entry.mode} ${entry.name}\0`);
    const hashBuf = Buffer.from(entry.hash, 'hex');
    treeBuffers.push(header, hashBuf);
  }

  const treeContent = Buffer.concat(treeBuffers);
  return writeObject('tree', treeContent);
}

function initGitRepo() {
  console.log('[Git Init] تهيئة المستودع محلياً...');
  if (!fs.existsSync(GIT_DIR)) {
    fs.mkdirSync(path.join(GIT_DIR, 'objects', 'info'), { recursive: true });
    fs.mkdirSync(path.join(GIT_DIR, 'objects', 'pack'), { recursive: true });
    fs.mkdirSync(path.join(GIT_DIR, 'refs', 'heads'), { recursive: true });
    fs.mkdirSync(path.join(GIT_DIR, 'refs', 'tags'), { recursive: true });

    fs.writeFileSync(path.join(GIT_DIR, 'HEAD'), 'ref: refs/heads/main\n');
    fs.writeFileSync(path.join(GIT_DIR, 'description'), 'Personalized Children Educational Magazine & Booklet Platform\n');
    fs.writeFileSync(path.join(GIT_DIR, 'config'), `[core]
\trepositoryformatversion = 0
\tfilemode = false
\tbare = false
\tlogallrefupdates = true
\tsymlinks = false
\tignorecase = true
[user]
\tname = Maktaba Stories
\temail = maktaba@al-shulah.local
`);
  }

  console.log('[Git Commit] بناء شجرة الملفات وحفظ كائنات Git...');
  const rootTreeHash = buildTree(ROOT_DIR);
  console.log('[Git Tree] Root Tree SHA:', rootTreeHash);

  const timestamp = Math.floor(Date.now() / 1000);
  const author = `Maktaba Stories <maktaba@al-shulah.local> ${timestamp} +0300`;
  let parent = '';
  const headRefPath = path.join(GIT_DIR, 'refs', 'heads', 'main');
  if (fs.existsSync(headRefPath)) {
    const parentHash = fs.readFileSync(headRefPath, 'utf8').trim();
    if (parentHash && parentHash.length === 40) {
      parent = `parent ${parentHash}\n`;
    }
  }

  const commitMsg = process.argv[2] || `feat: real API integration with ComfyUI / Google Flow, multi-subject FaceID, and placeholder removal\n\n- Removed all SVG placeholder circles and fake icon boxes\n- Added real fetch POST calls to /api/generate-image with FaceID subjects\n- Integrated ComfyUI workflow dispatcher with configurable endpoint\n- Rendered full-bleed real images in A5 print booklet with object-fit: cover\n- Enforced pure Arabic text without tashkeel and 4-6 lines per scene\n`;

  const commitContent = Buffer.from(`tree ${rootTreeHash}\n${parent}author ${author}\ncommitter ${author}\n\n${commitMsg}`);
  const commitHash = writeObject('commit', commitContent);
  console.log('[Git Commit] Commit SHA:', commitHash);

  fs.writeFileSync(headRefPath, commitHash + '\n');
  console.log('[Git Success] تم حفظ التعديلات وتسجيل الالتزام الجديد بنجاح!');
}

initGitRepo();
