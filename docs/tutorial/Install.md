
## 依赖安装

```shell
pnpm install @open-data-v/designer 
pnpm install  @open-data-v/base 
pnpm install  @open-data-v/ui
pnpm install  @open-data-v/data
pnpm install  @open-data-v/scripts
```


## 组件包介绍

|npm包| 名称       | 用途                                             |
|--|----------|------------------------------------------------|
|@open-data-v/base| 基础公共包    | open-data-v 公共基础包                              |
|@open-data-v/designer| 页面设计器组件包 | 给open-data-v 提供页面编辑和预览能力                       |
|@open-data-v/scripts| 数据处理基础包  | 给open-data-v 提供多样化的数据预处理方式，例如自定义脚本和远程脚本        |
|@open-data-v/data| 数据加载基础包  | 给open-data-v提供多样化的数据加载方式。例如HTTP、Websocket、MQTT |
|@open-data-v/ui| 默认UI库    | 用于提供open-data-v基本的UI组件                         |

## 配置Tailwindcss

因本项目样式采用tailwindcss实现，为了便于用户自定义样式，需要将组件包的样式内容配置进tailwindcss 配置中

```typescript

/** @type {import('tailwindcss').Config} */
module.exports = {
  performance: true,
  darkMode: 'class',
  mode: 'jit',
  content: [
      // content 必须包含组件包样式
    './node_modules/@open-data-v/data/src/**/*.{vue,ts,tsx}',
    './node_modules/@open-data-v/designer/src/**/*.{vue,ts,tsx}',
    './node_modules/@open-data-v/scripts/src/**/*.{vue,ts,tsx}',
    './node_modules/@open-data-v/ui/src/**/*.{vue,ts,tsx}',
      ... 其他配置
  ],
  variants: {
    extend: {
      textOpacity: ['dark'],
      backgroundColor: ['dark']
    }
  }
}


```

## 注册全局指令和插件
```typescript

// 注册全局指令和插件
import '@open-data-v/ui/style'
import '@open-data-v/designer/style'
import '@open-data-v/data/style'
import '@open-data-v/scripts/style'

import { Directive, useComponentPlugin } from '@open-data-v/designer'
const componentPlugin = useComponentPlugin()

app.use(Directive)
app.use(AsyncComponent)
```

## 加载编辑器组件列表

```typescript

// 组件加载器
import type { BaseComponent } from '@open-data-v/base'
import { useCanvasState } from '@open-data-v/designer'
import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'
// 项目的资源组件
import components from '/components'


const canvasState = useCanvasState()
const useAsyncLoadComponent = () => {
   return {
      install: (app: App) => {
         const keys = Object.keys(components)
         keys.forEach((el) => {
            const pkg = components[el]
            const { manifest, panel, component } = pkg
            const asyncComp = defineAsyncComponent({
               loader: component,
               delay: 200,
               timeout: 3000
            })
            canvasState.loadComponents(manifest.name, manifest, panel)
            app.component(manifest.name, asyncComp)
         })
      }
   }
}


export { useAsyncLoadComponent }


// 全局注册
// main.ts

const AsyncComponent = useAsyncLoadComponent()
app.use(useAsyncLoadComponent)
```

## 使用页面设计器


```vue
<template>
  <Designer ref="designer" />
</template>

<script setup lang="ts">
import { StaticKey, useEventBus } from '@open-data-v/base'
import { Designer, useCanvasState, useDataState, useScriptState } from '@open-data-v/designer'
import { CustomScriptPlugin, SystemScriptPlugin } from '@open-data-v/scripts'
import { useRoute, useRouter } from 'vue-router'
import {
  RestDataPlugin,
  StaticDataPlugin,
  SubDataPlugin,
  WebsocketDataPlugin
} from '@open-data-v/data'

const scriptState = useScriptState()
const canvasState = useCanvasState()

const dataState = useDataState()
// 加载脚本插件
scriptState.loadPlugins([CustomScriptPlugin, SystemScriptPlugin])

useEventBus(StaticKey.STDOUT, (event) => {
  const stdout = event as { type: string; name: string; message: any }
  console.log(stdout)
})

// 加载数据插件
dataState.loadPlugins([
  RestDataPlugin,
  StaticDataPlugin,
  SubDataPlugin,
  WebsocketDataPlugin
])
  
</script>

```


## 使用页面预览器

```vue

<template>
  <Previewer ref="designer" />
</template>

<script setup lang="ts">
import { StaticKey, useEventBus } from '@open-data-v/base'
import { Previewer, useCanvasState, useDataState, useScriptState } from '@open-data-v/designer'
import { CustomScriptPlugin, SystemScriptPlugin } from '@open-data-v/scripts'
import { useRoute, useRouter } from 'vue-router'
import {
  RestDataPlugin,
  StaticDataPlugin,
  SubDataPlugin,
  WebsocketDataPlugin
} from '@open-data-v/data'

const scriptState = useScriptState()
const canvasState = useCanvasState()

const dataState = useDataState()
// 加载脚本插件
scriptState.loadPlugins([CustomScriptPlugin, SystemScriptPlugin])

useEventBus(StaticKey.STDOUT, (event) => {
  const stdout = event as { type: string; name: string; message: any }
  console.log(stdout)
})

// 加载数据插件
dataState.loadPlugins([
  RestDataPlugin,
  StaticDataPlugin,
  SubDataPlugin,
  WebsocketDataPlugin
])
```
