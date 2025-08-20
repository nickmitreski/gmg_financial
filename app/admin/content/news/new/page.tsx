export default function NewArticlePage() {
  return (
    <div className="space-y-4 max-w-3xl">
      <h1 className="text-2xl font-semibold text-gray-900">New Article</h1>
      <div className="bg-white rounded-lg shadow p-4">
        <form action="/api/admin/content/news/generate" method="post" className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Generate with AI (topic)</label>
            <input name="topic" className="w-full border rounded px-3 py-2" placeholder="e.g., Offset accounts explained" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Style</label>
            <input name="style" className="w-full border rounded px-3 py-2" placeholder="clear, helpful, AU context" />
          </div>
          <button className="px-3 py-2 rounded bg-teal-600 text-white text-sm">Generate Draft</button>
        </form>
      </div>
      <form action="/api/admin/content/news/create" method="post" className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Title</label>
          <input name="title" className="w-full border rounded px-3 py-2" placeholder="Article title" required />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Slug</label>
          <input name="slug" className="w-full border rounded px-3 py-2" placeholder="article-slug" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">MDX</label>
          <textarea name="mdx" className="w-full border rounded px-3 py-2 min-h-[240px] font-mono text-sm" placeholder="Write MDX content here..." />
        </div>
        <button className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700">Create</button>
      </form>
    </div>
  )
}


