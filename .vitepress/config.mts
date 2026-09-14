import { defineConfig } from 'vitepress'

// 让 VitePress 把 kml 视为已知资源扩展名，避免链接被追加 .html 后缀
process.env.VITE_EXTRA_EXTENSIONS = 'kml'

const repository = 'https://github.com/zhangqian-silk/life-note'

export default defineConfig({
  title: 'Life Note',
  description: '旅行、生活、开发环境与兴趣学习的个人知识库',
  lang: 'zh-CN',
  base: '/life-note/',
  lastUpdated: true,
  ignoreDeadLinks: [/guizhou-2026/],
  srcExclude: [
    'README.md',
    'agent.md',
    'travel/_prompt.md',
    'docs/**/*.md'
  ],
  head: [
    ['meta', { name: 'theme-color', content: '#3451b2' }],
    ['meta', { name: 'author', content: 'zhangqian-silk' }]
  ],
  markdown: {
    image: {
      lazyLoading: true
    }
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '旅行攻略', link: '/travel/青岛' },
      { text: '开发环境', link: '/launch/Zsh' },
      { text: '日常生活', link: '/daily/营养元素' },
      { text: '麻将牌效', link: '/麻将/牌效/牌效率' },
      { text: '实用网站', link: '/web' }
    ],
    sidebar: {
      '/travel/': [
        {
          text: '旅行攻略',
          items: [
            { text: '青岛', link: '/travel/青岛' },
            { text: '洛阳', link: '/travel/洛阳' },
            { text: '银川', link: '/travel/银川' },
            { text: '江西', link: '/travel/江西' },
            { text: '山西（上）', link: '/travel/山西（上）' },
            { text: '山西（下）', link: '/travel/山西（下）' },
            { text: '万宁', link: '/travel/万宁' },
            { text: '义乌与横店', link: '/travel/义乌&横店' },
            { text: '长江游轮', link: '/travel/长江' },
            { text: '贵州', link: '/travel/贵州' }
          ]
        }
      ],
      '/launch/': [
        {
          text: '环境配置',
          items: [
            { text: 'Zsh', link: '/launch/Zsh' },
            { text: 'OpenCloudOS', link: '/launch/OpenCloudOS' },
            { text: 'Go', link: '/launch/Go' },
            { text: 'Windows', link: '/launch/Basic/Windows' }
          ]
        },
        {
          text: '软件配置',
          items: [
            { text: 'PotPlayer', link: '/launch/program/PotPlayer' }
          ]
        }
      ],
      '/daily/': [
        {
          text: '日常生活',
          items: [
            { text: '营养元素与补剂', link: '/daily/营养元素' }
          ]
        }
      ],
      '/麻将/': [
        {
          text: '牌效',
          items: [
            { text: '牌效率', link: '/麻将/牌效/牌效率' },
            { text: '实战策略', link: '/麻将/牌效/实战策略' }
          ]
        },
        {
          text: '星野 Poteto 牌效课',
          collapsed: false,
          items: [
            { text: '01 面子、搭子、数牌', link: '/麻将/牌效/星野Poteto/01-面子、搭子、数牌' },
            { text: '02 字牌、序盘处理', link: '/麻将/牌效/星野Poteto/02-字牌、序盘处理' },
            { text: '03 对子处理', link: '/麻将/牌效/星野Poteto/03-对子处理' },
            { text: '04 向听数与听牌型', link: '/麻将/牌效/星野Poteto/04-向听数、有效牌、五种听牌型' },
            { text: '05 对子复合型', link: '/麻将/牌效/星野Poteto/05-对子複合型、补强牌' },
            { text: '06 两嵌与四连型', link: '/麻将/牌效/星野Poteto/06-两崁(135)、四连型(3456)' },
            { text: '07 中膨型与亚两面', link: '/麻将/牌效/星野Poteto/07-中膨型(3445)、亚两面(3345)' },
            { text: '08 螺丝型', link: '/麻将/牌效/星野Poteto/08-螺丝型(3444)' },
            { text: '09 跳张型', link: '/麻将/牌效/星野Poteto/09-跳张型(1345)' },
            { text: '10 五组理论', link: '/麻将/牌效/星野Poteto/10-五组理论、一向听集中理论' },
            { text: '11 有效牌重复', link: '/麻将/牌效/星野Poteto/11-有效牌重複' }
          ]
        }
      ]
    },
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          options: {
            tokenize: (text) => text
              .toLowerCase()
              .match(/[\p{Script=Han}]|[\p{Letter}\p{Number}]+/gu) ?? []
          },
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { title: 4, text: 2, titles: 1 }
          }
        },
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '清除查询条件',
            backButtonTitle: '关闭搜索',
            noResultsText: '无法找到相关结果',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '回车',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '向上',
              navigateDownKeyAriaLabel: '向下',
              closeText: '关闭',
              closeKeyAriaLabel: 'Esc'
            }
          }
        }
      }
    },
    socialLinks: [
      { icon: 'github', link: repository }
    ],
    editLink: {
      pattern: `${repository}/edit/master/:path`,
      text: '在 GitHub 上编辑此页'
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'medium'
      }
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    outline: {
      level: [2, 4],
      label: '本页目录'
    },
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    notFound: {
      title: '页面未找到',
      quote: '这里没有你要找的内容。',
      linkLabel: '返回首页',
      linkText: '返回首页'
    },
    footer: {
      message: '内容采用 MIT License 发布',
      copyright: 'Copyright © 2022-present Zhang Qian'
    }
  }
})
