import { config, collection, fields } from '@keystatic/core';

// Keystatic 后台配置：把 src/content/blog 的 Markdown/MDX 映射为可视化表单。
// 字段与 src/content.config.ts 的 schema 保持一致（漏填会在构建时报错）。
export default config({
	storage: {
		kind: 'local',
	},
	collections: {
		posts: collection({
			label: '文章',
			// Keystatic 要求路径带 glob（/*）；slug 由文件名（不含扩展名）推导，与路由 /blog/<文件名>/ 一致
			path: 'src/content/blog/*',
			format: { contentField: 'content' },
			// 不设 slugField：使用文件名（不含扩展名）作为 slug，与路由 /blog/<文件名>/ 一致
			columns: ['title', 'pubDate', 'category', 'draft'],
			schema: {
				title: fields.text({ label: '标题', validation: { isRequired: true } }),
				description: fields.text({
					label: '摘要',
					description: '列表页摘要与 SEO description',
					multiline: true,
				}),
				pubDate: fields.date({ label: '发布日期', validation: { isRequired: true } }),
				updatedDate: fields.date({ label: '更新日期' }),
				category: fields.text({ label: '分类', defaultValue: '随笔' }),
				tags: fields.array(fields.text({ label: '标签' }), {
					label: '标签',
					itemLabel: (props) => props.value || '标签',
				}),
				draft: fields.checkbox({ label: '草稿', description: '勾选后不发布', defaultValue: false }),
				content: fields.mdx({
					label: '正文',
					options: {
						heading: { levels: [2, 3, 4] },
					},
				}),
			},
		}),
	},
});
