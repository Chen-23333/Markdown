import { readdir, readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const ignoredDirectories = new Set(['.git', '.vitepress', 'node_modules'])
const markdownImagePattern = /!\[[^\]]*\]\(([^)]+)\)/g
const htmlImagePattern = /<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi

const navigationTargets = [
  'travel/青岛.md',
  'travel/洛阳.md',
  'travel/银川.md',
  'travel/江西.md',
  'travel/山西（上）.md',
  'travel/山西（下）.md',
  'travel/万宁.md',
  'travel/义乌&横店.md',
  'travel/长江.md',
  'travel/贵州.md',
  'launch/Zsh.md',
  'launch/OpenCloudOS.md',
  'launch/Go.md',
  'launch/Basic/Windows.md',
  'launch/program/PotPlayer.md',
  'daily/营养元素.md',
  'web.md',
  '麻将/牌效/牌效率.md',
  '麻将/牌效/实战策略.md',
  '麻将/牌效/星野Poteto/01-面子、搭子、数牌.md',
  '麻将/牌效/星野Poteto/02-字牌、序盘处理.md',
  '麻将/牌效/星野Poteto/03-对子处理.md',
  '麻将/牌效/星野Poteto/04-向听数、有效牌、五种听牌型.md',
  '麻将/牌效/星野Poteto/05-对子複合型、补强牌.md',
  '麻将/牌效/星野Poteto/06-两崁(135)、四连型(3456).md',
  '麻将/牌效/星野Poteto/07-中膨型(3445)、亚两面(3345).md',
  '麻将/牌效/星野Poteto/08-螺丝型(3444).md',
  '麻将/牌效/星野Poteto/09-跳张型(1345).md',
  '麻将/牌效/星野Poteto/10-五组理论、一向听集中理论.md',
  '麻将/牌效/星野Poteto/11-有效牌重複.md'
]

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (ignoredDirectories.has(entry.name)) continue

    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...await walk(fullPath))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }

  return files
}

function isRemoteReference(reference) {
  return /^(?:[a-z]+:)?\/\//i.test(reference) || reference.startsWith('data:')
}

function normalizeReference(rawReference) {
  let reference = rawReference.trim()

  if (reference.startsWith('<') && reference.endsWith('>')) {
    reference = reference.slice(1, -1)
  }

  const titleMatch = reference.match(/^(.*?)(?:\s+["'][^"']*["'])$/)
  if (titleMatch) reference = titleMatch[1]

  reference = reference.split('#', 1)[0].split('?', 1)[0]

  try {
    return decodeURIComponent(reference)
  } catch {
    return reference
  }
}

async function exists(filePath) {
  try {
    return (await stat(filePath)).isFile()
  } catch {
    return false
  }
}

const errors = []
const markdownFiles = await walk(root)
let checkedImages = 0

for (const markdownFile of markdownFiles) {
  const content = await readFile(markdownFile, 'utf8')
  const references = [
    ...content.matchAll(markdownImagePattern),
    ...content.matchAll(htmlImagePattern)
  ].map((match) => match[1])

  for (const rawReference of references) {
    const reference = normalizeReference(rawReference)
    if (!reference || isRemoteReference(reference)) continue

    checkedImages += 1
    const resolvedPath = reference.startsWith('/')
      ? path.join(root, reference)
      : path.resolve(path.dirname(markdownFile), reference)

    if (!await exists(resolvedPath)) {
      errors.push(`${path.relative(root, markdownFile)}: missing image ${rawReference}`)
    }
  }
}

for (const target of navigationTargets) {
  if (!await exists(path.join(root, target))) {
    errors.push(`navigation target does not exist: ${target}`)
  }
}

if (errors.length > 0) {
  console.error('Content validation failed:')
  for (const error of errors) console.error(`- ${error}`)
  process.exitCode = 1
} else {
  console.log(`Content validation passed: ${markdownFiles.length} Markdown files, ${checkedImages} local image references, ${navigationTargets.length} navigation targets.`)
}
