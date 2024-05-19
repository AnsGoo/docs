import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "OpenDataV",
  description: "OpenDataV文档",
  themeConfig: {
    logo: '../tutorial/img/logo.png',
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '项目介绍', link: '/tutorial/Home' },
      { text: '快速开始', link: '/tutorial/Home' }
    ],

    sidebar: [
      {
        text: '快速开始',
        items: [
          { text: '快速开始', link: '/tutorial/QuickStart' },
          { text: '开发', link: '/tutorial/Development' },
          { text: '数据', link: '/tutorial/Data' },
          { text: '问题', link: '/tutorial/CommonIssues' },
          { text: '许可证', link: '/tutorial/License' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/AnsGoo/openDataV' }
    ]
  }
})
